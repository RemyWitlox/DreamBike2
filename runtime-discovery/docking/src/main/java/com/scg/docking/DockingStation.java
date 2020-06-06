package com.scg.docking;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity(name = "DOCKINGSTATION")
public class DockingStation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long dockingId;

//	@NaturalId
	@Column(name = "NAME", unique = true)
//	@NotBlank(message = "DockingStationName cant be empty")
	private String name;

	private Double lng;
	private Double lat;
	private int capacity;
	private Boolean active;
	private int bikes;
	private Boolean deleted = false;
	private String city;

	public DockingStation() {

	}

	public long getDockingId() {
		return dockingId;
	}

	public void setDockingId(long dockingId) {
		this.dockingId = dockingId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Double getLng() {
		return lng;
	}

	public void setLng(Double lng) {
		this.lng = lng;
	}

	public Double getLat() {
		return lat;
	}

	public void setLat(Double lat) {
		this.lat = lat;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public int getBikes() {
		return bikes;
	}

	public void setBikes(int bikes) {
		this.bikes = bikes;
	}

	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

}
