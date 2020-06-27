package com.scg.bikeService;

public enum BikeDriver {
	MALE("MALE"), FEMALE("FEMALE"), UNISEX("UNISEX"), CHILD("CHILD");

	private String code;

	private BikeDriver(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}
}
