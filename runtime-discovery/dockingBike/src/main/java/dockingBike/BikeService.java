package dockingBike;

public interface BikeService {

	Long getDockingId(Long bikeId);

	BikeDTO convertToDto(Bike bike);

	Bike getByBikeId(Long bikeId);

	Bike save(Bike bike);

}
