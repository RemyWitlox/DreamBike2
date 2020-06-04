package com.scg.bikeService;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
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
		bike.setBroken(updatedBike.getBroken());
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

	@GetMapping("fillDB")
	public void fillDB() {
		Bike bike = new Bike();
		bike.setName("Polygon Heist 2.0");
		bike.setCreated(LocalDate.now());
		bike.setDriver(BikeDriver.FEMALE);
		bike.setType(BikeType.ELECTRIC);
		bike.setSize(24);
		bikeService.save(bike);
		bike = new Bike();
		bike.setName("2020 Path E5 Shimano E5000");
		bike.setCreated(LocalDate.now());
		bike.setDriver(BikeDriver.FEMALE);
		bike.setType(BikeType.ELECTRIC);
		bike.setSize(22);
		bikeService.save(bike);
		bike = new Bike();
		bike.setName("Polygon Sierra AX");
		bike.setCreated(LocalDate.now());
		bike.setDriver(BikeDriver.MALE);
		bike.setType(BikeType.ROAD);
		bike.setSize(26);
		bikeService.save(bike);
		bike = new Bike();
		bike.setName("2020 Path E5 Shimano E5000");
		bike.setCreated(LocalDate.now());
		bike.setDriver(BikeDriver.MALE);
		bike.setType(BikeType.ELECTRIC);
		bike.setSize(26);
		bikeService.save(bike);
		bike = new Bike();
		bike.setCreated(LocalDate.now());
		bike.setDriver(BikeDriver.CHILD);
		bike.setType(BikeType.MOUNTAIN);
		bike.setSize(14);
		bikeService.save(bike);
	}

}