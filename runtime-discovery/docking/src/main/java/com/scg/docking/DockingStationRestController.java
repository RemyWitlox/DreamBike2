package com.scg.docking;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/")
public class DockingStationRestController {
	private final DockingService dockingService;

	@Autowired
	public DockingStationRestController(DockingService dockingService) {
		this.dockingService = dockingService;
	}

	@GetMapping("test")
	public String getTest() {
		return "test";
	}

	@GetMapping("getAll")
	public List<DockingStation> getAllDockingStations() {
		return this.dockingService.getAll();
	}

	@GetMapping("getOne")
	public DockingStation getOneDockingStation() {
		long id = 1;
		DockingStation dock = this.dockingService.getOne(id);
		System.out.println(dock.getName());
		return dock;
	}

	@GetMapping("fillDB")
	public void fillDB() {
		DockingStation dockingStation = new DockingStation();
		dockingStation.setCapacity(260);
		dockingStation.setActive(true);
		dockingStation.setName("Centrum Eindhoven");
		dockingStation.setLat(51.441262);
		dockingStation.setLng(5.447672);
		dockingService.save(dockingStation);
		dockingStation = new DockingStation();
		dockingStation.setCapacity(215);
		dockingStation.setActive(true);
		dockingStation.setName("Stadion Eindhoven");
		dockingStation.setLat(51.441851);
		dockingStation.setLng(5.468059);
		dockingService.save(dockingStation);
		dockingStation = new DockingStation();
		dockingStation.setCapacity(297);
		dockingStation.setActive(true);
		dockingStation.setName("Strijp-S Eindhoven");
		dockingStation.setLat(51.448966);
		dockingStation.setLng(5.45733);
		dockingService.save(dockingStation);
		dockingStation = new DockingStation();
		dockingStation.setCapacity(105);
		dockingStation.setActive(true);
		dockingStation.setName("Tongelre Eindhoven");
		dockingStation.setLat(51.440791);
		dockingStation.setLng(5.500513);
		dockingService.save(dockingStation);
		dockingStation = new DockingStation();
		dockingStation.setCapacity(184);
		dockingStation.setActive(true);
		dockingStation.setName("Gestel Eindhoven");
		dockingStation.setLat(51.417809);
		dockingStation.setLng(5.450364);
		dockingService.save(dockingStation);
		dockingStation = new DockingStation();
		dockingStation.setCapacity(394);
		dockingStation.setActive(true);
		dockingStation.setName("Stratum Eindhoven");
		dockingStation.setLat(51.420344);
		dockingStation.setLng(5.496238);
		dockingService.save(dockingStation);
		dockingStation = new DockingStation();
		dockingStation.setCapacity(143);
		dockingStation.setActive(true);
		dockingStation.setName("Woensel Zuid Eindhoven");
		dockingStation.setLat(51.420344);
		dockingStation.setLng(5.496238);
		dockingService.save(dockingStation);
		dockingStation = new DockingStation();
		dockingStation.setCapacity(104);
		dockingStation.setActive(true);
		dockingStation.setName("Woensel Noord Eindhoven");
		dockingStation.setLat(51.482542);
		dockingStation.setLng(5.481652);
		dockingService.save(dockingStation);
	}

}
