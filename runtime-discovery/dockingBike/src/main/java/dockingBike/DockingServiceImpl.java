package dockingBike;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DockingServiceImpl implements DockingService {

	private final DockingRepository dockingRepository;

	@Autowired
	public DockingServiceImpl(DockingRepository dockingRepository) {
		this.dockingRepository = dockingRepository;
	}

	@Override
	public Docking getByDockingId(Long dockingId) {
		return dockingRepository.findByDockingId(dockingId);
	}

	@Override
	public void save(Docking docking) {
		dockingRepository.save(docking);
	}

}
