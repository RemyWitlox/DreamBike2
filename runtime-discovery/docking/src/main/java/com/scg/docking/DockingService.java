package com.scg.docking;

import java.util.List;

public interface DockingService {

	DockingStation save(DockingStation dockingStation);

	List<DockingStation> getAll();

	DockingStation getOne(long id);
//
//	List<DockingStation> getNotDeleted();
}
