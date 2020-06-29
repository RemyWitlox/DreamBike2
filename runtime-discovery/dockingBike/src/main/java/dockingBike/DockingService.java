package dockingBike;

import java.util.List;

public interface DockingService {

	Docking getByDockingId(int dockingId);
	
	List<Docking> getAll();

	void save(Docking docking);

}
