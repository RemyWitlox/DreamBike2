package com.scg.bikeService;

import java.util.List;
import java.util.Set;

public interface BikeService {
	Set<Bike> findByName(String name);

	Set<Bike> findByType(BikeType type);

	List<Bike> findAll();

	Bike findByBikeId(Long bikeId);

	Bike save(Bike bike);
}