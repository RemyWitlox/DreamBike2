package com.scg.bikeService;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*")
public class BikeController {

	private final BikeService bikeService;

	@Autowired
	public BikeController(BikeService bikeService) {
		this.bikeService = bikeService;
	}

	@GetMapping("getAll")
	public List<Bike> getAllBikes() {
		return this.bikeService.findAll();
	}

	@GetMapping("getByBikeType")
	public Set<Bike> getBikesByBikeType(BikeType bikeType) {
		return this.bikeService.findByType(bikeType);
	}

	@GetMapping("getByBikeName")
	public Set<Bike> getBikeByBikeName(String bikeName) {
		return this.bikeService.findByName(bikeName);
	}

	@PostMapping("newBike")
	public boolean newBike(@RequestBody BikeDTO bikeDTO) {
		Bike bike = new Bike();
		bike.setCreated(LocalDate.now());
		bike.setDriver(bikeDTO.getDriver());
		bike.setName(bikeDTO.getName());
		bike.setSize(bikeDTO.getSize());
		bike.setType(bikeDTO.getType());
		bikeService.save(bike);
		return true;

	}

	@PutMapping("updateBike")
	public boolean updateBike(@RequestBody Bike updatedBike) {
		Bike bike = bikeService.findByBikeId(updatedBike.getBikeId());
		bike.setDriver(updatedBike.getDriver());
		bike.setActive(updatedBike.getActive());
		bike.setName(updatedBike.getName());
		bike.setSize(updatedBike.getSize());
		bike.setType(updatedBike.getType());
		bikeService.save(bike);
		return true;
	}

	@DeleteMapping("deleteBike")
	public boolean deleteBike(@RequestBody Long bikeId) {
		Bike bike = bikeService.findByBikeId(bikeId);
		bike.setDeleted(true);
		bikeService.save(bike);
		return true;
	}

}