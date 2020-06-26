package org.bikeDocking;

import org.bikeDocking.classes.Bike;
import org.bikeDocking.classes.BikeDTO;

public interface BikeService {

	Long getDockingId(Long bikeId);

	BikeDTO convertToDto(Bike bike);

	Bike getByBikeId(Long bikeId);

	Bike save(Bike bike);

}
