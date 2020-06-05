package dockingBike;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DockingRepository extends JpaRepository<Docking, Long> {

	Docking findByDockingId(Long dockingId);

}
