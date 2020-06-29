package dockingBike;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class DockingServiceImpl implements DockingService {

	private final DockingRepository dockingRepository;

	@Autowired
	public DockingServiceImpl(DockingRepository dockingRepository) {
		this.dockingRepository = dockingRepository;
	}

	@Override
	public Docking getByDockingId(int dockingId) {
		return dockingRepository.findByDockingId(dockingId);
	}

	@Override
	public void save(Docking docking) {
		dockingRepository.save(docking);
	}
	
	@Override
	public List<Docking> getAll() {
		return dockingRepository.findAll();
	}

}
