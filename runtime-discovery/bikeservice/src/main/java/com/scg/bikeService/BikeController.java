package com.scg.bikeService;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
		return this.bikeService.findByBikeType(bikeType);
	}

	@GetMapping("getByBikeName")
	public Set<Bike> getBikeByBikeName(String bikeName) {
		return this.bikeService.findByBikeName(bikeName);
	}

}