package org.bikeDocking;

import org.bikeDocking.classes.Docking;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DockingRepository extends JpaRepository<Docking, Long> {

	Docking findByDockingId(Long dockingId);

}
