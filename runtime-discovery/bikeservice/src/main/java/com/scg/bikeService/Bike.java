package com.scg.bikeService;

import java.time.LocalDate;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Bike {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long bikeId;
	private String name;
	private BikeType type;
	private BikeDriver driver;
	private int size;
	private LocalDate created;
	private Boolean deleted = false;
	private Boolean broken = false;

	public Bike() {

	}

	public Long getBikeId() {
		return bikeId;
	}

	public void setBikeId(Long bikeId) {
		this.bikeId = bikeId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public BikeType getType() {
		return type;
	}

	public void setType(BikeType type) {
		this.type = type;
	}

	public BikeDriver getDriver() {
		return driver;
	}

	public void setDriver(BikeDriver driver) {
		this.driver = driver;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public LocalDate getCreated() {
		return created;
	}

	public void setCreated(LocalDate created) {
		this.created = created;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public Boolean getBroken() {
		return broken;
	}

	public void setBroken(Boolean broken) {
		this.broken = broken;
	}

}
