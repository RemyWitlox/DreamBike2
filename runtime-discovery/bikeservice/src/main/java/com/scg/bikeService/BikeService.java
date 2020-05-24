package com.scg.bikeService;

import java.util.List;
import java.util.Set;

public interface BikeService {
	Set<Bike> findByBikeName(String bikeName);

	Set<Bike> findByBikeType(BikeType bikeType);

	List<Bike> findAll();
}