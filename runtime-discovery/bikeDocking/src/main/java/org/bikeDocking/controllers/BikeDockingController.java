package org.bikeDocking.controllers;

import java.util.Set;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.bikeDocking.BikeService;
import org.bikeDocking.DockingService;
import org.bikeDocking.classes.Bike;
import org.bikeDocking.classes.BikeDTO;
import org.bikeDocking.classes.Docking;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BikeDockingController {
	private final BikeService bikeService;
	private final DockingService dockingService;

	@Autowired
	public BikeDockingController(BikeService bikeService, DockingService dockingService) {
		this.bikeService = bikeService;
		this.dockingService = dockingService;
	}

	@GetMapping("getDockingId")
	public Long getDockingId(@RequestParam Long bikeId) {
		return this.bikeService.getByBikeId(bikeId).getDocking().getDockingId();
	}

	@GetMapping("getBikeIds")
	public Set<BikeDTO> getBikeIds(@RequestParam Long dockingId) {
		Set<Bike> bikes = this.dockingService.getByDockingId(dockingId).getBikes();
		return bikes.stream().map(bikeService::convertToDto).collect(Collectors.toSet());
	}

	@PostMapping("addDocking")
	public boolean createDocking(@Valid @RequestParam int capacity, @Valid @RequestParam Long dockingId) {
		if (dockingService.getByDockingId(dockingId) == null) {
			Docking docking = new Docking();
			docking.setCapacity(capacity);
			docking.setDockingId(dockingId);
			this.dockingService.save(docking);
			return true;
		} else {
			return false;
		}
	}

	@PostMapping("addBikeToDocking")
	public boolean addBikeToDocking(@Valid @RequestParam Long bikeId, @Valid @RequestParam Long dockingId) {
		if (bikeService.getByBikeId(bikeId) == null) {
			Bike bike = new Bike();
			bike.setBikeId(bikeId);
			bikeService.save(bike);
		}
		Bike bike = bikeService.getByBikeId(bikeId);
		Docking dockingOud = dockingService.getByDockingId(bike.getDocking().getDockingId());
		Docking dockingNieuw = dockingService.getByDockingId(dockingId);
		if (dockingNieuw.getBikes().contains(bike) || (dockingNieuw.getAvailable() == 0)) {
			return false;
		} else {
			dockingOud.removeBike(bike);
			dockingNieuw.addBike(bike);
			dockingService.save(dockingOud);
			dockingService.save(dockingNieuw);
			return true;
		}
	}

}
