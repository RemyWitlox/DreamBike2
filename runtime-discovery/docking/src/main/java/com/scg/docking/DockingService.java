package com.scg.docking;

import java.util.List;
import java.util.Set;

public interface DockingService {

	DockingStation save(DockingStation dockingStation);

	List<DockingStation> getAll();

	DockingStation getOne(long id);

	Set<DockingStation> getNotDeleted();
}
