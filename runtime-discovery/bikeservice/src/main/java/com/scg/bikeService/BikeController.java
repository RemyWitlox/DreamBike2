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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BikeController {

	private final BikeService bikeService;

	@Autowired
	public BikeController(BikeService bikeService) {
		this.bikeService = bikeService;
	}

	@CrossOrigin(origins = "*")
	@GetMapping("getAll")
	public List<Bike> getAllBikes() {
		return this.bikeService.findAll();
	}

	@CrossOrigin(origins = "*")
	@GetMapping("getByBikeType")
	public Set<Bike> getBikesByBikeType(BikeType bikeType) {
		return this.bikeService.findByType(bikeType);
	}

	@CrossOrigin(origins = "*")
	@GetMapping("getByBikeName")
	public Set<Bike> getBikeByBikeName(String bikeName) {
		return this.bikeService.findByName(bikeName);
	}

	@CrossOrigin(origins = "*")
	@PostMapping("newBike")
	public boolean newBike(@RequestBody BikeDTO bikeDTO) {
		Bike bike = new Bike();
		bike.setCreated(bikeDTO.getCreated());
		bike.setDriver(bikeDTO.getDriver());
		bike.setName(bikeDTO.getName());
		bike.setSize(bikeDTO.getSize());
		bike.setType(bikeDTO.getType());
		bikeService.save(bike);
		return true;

	}

	@CrossOrigin(origins = "*")
	@PutMapping("updateBike")
	public boolean updateBike(@RequestBody BikeWithoutDeletedDTO updatedBike) {
		if (bikeService.findByBikeId(updatedBike.getBikeId()) == null) {
			return false;
		} else {
			Bike bike = bikeService.findByBikeId(updatedBike.getBikeId());
			bike.setDriver(updatedBike.getDriver());
			bike.setBroken(updatedBike.getBroken());
			bike.setName(updatedBike.getName());
			bike.setSize(updatedBike.getSize());
			bike.setType(updatedBike.getType());
			bike.setCreated(updatedBike.getCreated());
			bikeService.save(bike);
			return true;
		}
	}

	@CrossOrigin(origins = "*")
	@DeleteMapping("deleteBike/{bikeId}")
	public boolean deleteBike(@RequestParam Long bikeId) {
		if (bikeService.findByBikeId(bikeId) == null) {
			return false;
		} else {
			Bike bike = bikeService.findByBikeId(bikeId);
			bike.setDeleted(true);
			bikeService.save(bike);
			return true;
		}
	}

	@CrossOrigin(origins = "*")
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
		bike.setName("Kids Mountain Bike");
		bike.setCreated(LocalDate.now());
		bike.setDriver(BikeDriver.CHILD);
		bike.setType(BikeType.MOUNTAIN);
		bike.setSize(14);
		bikeService.save(bike);
	}

}