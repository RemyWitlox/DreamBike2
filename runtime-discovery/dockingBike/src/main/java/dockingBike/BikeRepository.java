package dockingBike;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BikeRepository extends JpaRepository<Bike, Integer> {

	Set<Bike> findByDocking(Docking docking);

	Bike findByBikeId(int bikeId);
}
