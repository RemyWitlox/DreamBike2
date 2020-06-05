package com.scg.docking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface DockingRepository extends JpaRepository<DockingStation, Long> {
	@Query("select d from DockingStation d where d.deleted = false")
	List<DockingStation> FindByDeletedFalse();
}
