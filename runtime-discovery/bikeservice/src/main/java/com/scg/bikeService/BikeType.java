package com.scg.bikeService;

public enum BikeType {
	ROAD("ROAD"), ELECTRIC("ELECTRIC"), MOUNTAIN("MOUNTAIN");

	private String code;

	private BikeType(String code) {
		this.code = code;
	}

	public String getCode() {
		return code;
	}

}