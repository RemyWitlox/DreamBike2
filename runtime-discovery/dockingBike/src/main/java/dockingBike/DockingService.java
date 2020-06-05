package dockingBike;

public interface DockingService {

	Docking getByDockingId(Long dockingId);

	void save(Docking docking);

}
