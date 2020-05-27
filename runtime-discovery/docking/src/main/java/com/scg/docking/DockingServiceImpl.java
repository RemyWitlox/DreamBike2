package com.scg.docking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service("dockingService")
public class DockingServiceImpl implements DockingService {

	private final DockingRepository dockingRepository;

	@Autowired
	public DockingServiceImpl(DockingRepository dockingRepository) {
		this.dockingRepository = dockingRepository;
	}

	@Override
	public DockingStation save(DockingStation dockingStation) {
		return dockingRepository.save(dockingStation);
	}

	@Override
	public List<DockingStation> getAll() {
		return dockingRepository.findAll();
	}

	@Override
	public DockingStation getOne(long id) {
		return dockingRepository.findById(id).get();
	}

}
