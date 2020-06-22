package dockingBike;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class DockingBikeController {
	private final BikeService bikeService;
	private final DockingService dockingService;

	@Autowired
	public DockingBikeController(BikeService bikeService, DockingService dockingService) {
		this.bikeService = bikeService;
		this.dockingService = dockingService;
	}

	@GetMapping("getDockingId/{bikeId}")
	public int getDockingId(@RequestParam int bikeId) {
		return this.bikeService.getByBikeId(bikeId).getDocking().getDockingId();
	}

	@GetMapping("getBikeIds/{dockingId}")
	public Set<BikeDTO> getBikeIds(@RequestParam int dockingId) {
		Set<Bike> bikes = this.dockingService.getByDockingId(dockingId).getBikes();
		return bikes.stream().map(bikeService::convertToDto).collect(Collectors.toSet());
	}

	@PostMapping("addDocking")
	public boolean createDocking(@RequestBody DockingDTO dockingDTO) {
		if (dockingService.getByDockingId(dockingDTO.getDockingId()) == null) {
			Docking docking = new Docking();
			docking.setCapacity(dockingDTO.getCapacity());
			docking.setDockingId(dockingDTO.getDockingId());
			this.dockingService.save(docking);
			return true;
		} else {
			return false;
		}
	}

	@PostMapping("addBikeToDocking")
	public boolean addBikeToDocking(@RequestBody DockingBikeDTO dockingBikeDTO) {
		if (bikeService.getByBikeId(dockingBikeDTO.getBikeId()) == null) {
			Bike bike = new Bike();
			bike.setBikeId(dockingBikeDTO.getBikeId());
			bikeService.save(bike);
			if (dockingService.getByDockingId(dockingBikeDTO.getDockingId()) == null) {
				// docking bestaat niet!
				return false;
			} else {
				Docking docking = dockingService.getByDockingId(dockingBikeDTO.getDockingId());
				if (docking.getAvailable() > 0) {
					docking.addBike(bike);
					dockingService.save(docking);
					return true;
				} else {
					return false;
				}
			}

		} else {
			Bike bike = bikeService.getByBikeId(dockingBikeDTO.getBikeId());
			Docking dockingOud = dockingService.getByDockingId(bike.getDocking().getDockingId());
			if (dockingService.getByDockingId(dockingBikeDTO.getDockingId()) == null) {
				// docking bestaat niet!
				return false;
			} else {
				Docking dockingNieuw = dockingService.getByDockingId(dockingBikeDTO.getDockingId());
				if (dockingNieuw.getAvailable() > 0) {
					dockingOud.removeBike(bike);
					dockingNieuw.addBike(bike);
					dockingService.save(dockingOud);
					dockingService.save(dockingNieuw);
					return true;
				} else {
					return false;
				}
			}
		}
	}
}
