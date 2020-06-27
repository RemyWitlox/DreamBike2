package org.bikeDocking;

import org.bikeDocking.classes.Bike;
import org.bikeDocking.classes.Docking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BikeRepository extends JpaRepository<Bike, Long> {

	Bike findByDocking(Docking docking);

	Bike findByBikeId(Long bikeId);
}
