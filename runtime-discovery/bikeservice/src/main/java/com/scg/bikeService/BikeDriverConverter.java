package com.scg.bikeService;

import java.util.stream.Stream;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter(autoApply = true)
public class BikeDriverConverter implements AttributeConverter<BikeDriver, String> {

	@Override
	public String convertToDatabaseColumn(BikeDriver bikeDriver) {
		if (bikeDriver == null) {
			return null;
		}
		return bikeDriver.getCode();
	}

	@Override
	public BikeDriver convertToEntityAttribute(String code) {
		if (code == null) {
			return null;
		}
		return Stream.of(BikeDriver.values()).filter(c -> c.getCode().equals(code)).findFirst()
				.orElseThrow(IllegalArgumentException::new);
	}
}
