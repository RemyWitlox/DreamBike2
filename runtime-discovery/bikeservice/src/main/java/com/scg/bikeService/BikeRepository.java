package com.scg.bikeService;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRepository extends JpaRepository<Bike, Long> {
	Set<Bike> findByBikeName(String bikeName);

	Set<Bike> findByBikeType(BikeType bikeType);
}