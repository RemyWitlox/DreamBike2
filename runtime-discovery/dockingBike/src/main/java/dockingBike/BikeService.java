package dockingBike;

public interface BikeService {

	int getDockingId(int bikeId);

	BikeDTO convertToDto(Bike bike);

	Bike getByBikeId(int bikeId);

	Bike save(Bike bike);

}
