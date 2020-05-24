package com.scg.bikeService;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Bike {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public Long bikeId;

	public String bikeName;

	public BikeType bikeType;

	public Bike() {

	}

	public Long getBikeId() {
		return bikeId;
	}

	public void setBikeId(Long bikeId) {
		this.bikeId = bikeId;
	}

	public String getBikeName() {
		return bikeName;
	}

	public void setBikeName(String bikeName) {
		this.bikeName = bikeName;
	}

	public BikeType getBikeType() {
		return bikeType;
	}

	public void setBikeType(BikeType bikeType) {
		this.bikeType = bikeType;
	}

}
