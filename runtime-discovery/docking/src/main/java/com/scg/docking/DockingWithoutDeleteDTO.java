package com.scg.docking;

public class DockingWithoutDeleteDTO {
	private long dockingId;
	private String name;
	private Double lng;
	private Double lat;
	private int capacity;
	private Boolean active;
	private int bikes;

	public DockingWithoutDeleteDTO() {

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

}
