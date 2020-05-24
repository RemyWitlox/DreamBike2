package com.scg.bikeService;

public enum BikeType {
	BICYCLE("BICYCLE"), EBIKE("EBIKE"), SCOOTER("SCOOTER");

	private String code;

	private BikeType(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}

}