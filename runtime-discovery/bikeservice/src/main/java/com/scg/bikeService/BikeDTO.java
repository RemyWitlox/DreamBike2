package com.scg.bikeService;

import java.time.LocalDate;

public class BikeDTO {
	private Long bikeId;
	private String name;
	private BikeType type;
	private BikeDriver driver;
	private int size;
	private LocalDate created;
	private Boolean deleted;
	private Boolean active;

	public BikeDTO() {

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

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

}
