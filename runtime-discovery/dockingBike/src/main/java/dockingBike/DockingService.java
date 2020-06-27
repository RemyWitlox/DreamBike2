package dockingBike;

public interface DockingService {

	Docking getByDockingId(int dockingId);

	void save(Docking docking);

}
