package com.scg.bikeService;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("bikeService")
public class BikeServiceImpl implements BikeService {

	private final BikeRepository bikeRepository;

	@Autowired
	public BikeServiceImpl(BikeRepository bikeRepository) {
		this.bikeRepository = bikeRepository;
	}

	@Override
	public Set<Bike> findByName(String name) {
		return bikeRepository.findByName(name);
	}

	@Override
	public Set<Bike> findByType(BikeType type) {
		return bikeRepository.findByType(type);
	}

	@Override
	public List<Bike> findAll() {
		return bikeRepository.findAll();
	}

	@Override
	public Bike findByBikeId(Long bikeId) {
		return bikeRepository.findByBikeId(bikeId);
	}

	@Override
	public Bike save(Bike bike) {
		return bikeRepository.save(bike);
	}

}