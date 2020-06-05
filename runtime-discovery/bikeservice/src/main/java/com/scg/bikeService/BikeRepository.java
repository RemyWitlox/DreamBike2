package com.scg.bikeService;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRepository extends JpaRepository<Bike, Long> {
	Set<Bike> findByName(String name);

	Set<Bike> findByType(BikeType type);

	Set<Bike> findByDriver(BikeDriver driver);

	Bike findByBikeId(Long bikeId);

	Set<Bike> findByDeletedFalse();
}