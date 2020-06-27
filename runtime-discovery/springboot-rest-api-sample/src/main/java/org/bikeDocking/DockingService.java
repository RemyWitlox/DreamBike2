package org.bikeDocking;

import org.bikeDocking.classes.Docking;

public interface DockingService {

	Docking getByDockingId(Long dockingId);

	void save(Docking docking);

}
