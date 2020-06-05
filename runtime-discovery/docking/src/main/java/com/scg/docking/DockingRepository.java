package com.scg.docking;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DockingRepository extends JpaRepository<DockingStation, Long> {
	Set<DockingStation> FindByDeletedFalse();
}
