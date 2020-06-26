package dockingBike;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DockingRepository extends JpaRepository<Docking, Integer> {

	Docking findByDockingId(int dockingId);

}
