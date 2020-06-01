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
		DockingStation ds = this.dockingService.getOne(id);
		System.out.println(ds.getName());
		return ds;
	}

	@GetMapping("fillDB")
	public void fillDB() {
		DockingStation ds = new DockingStation();
		ds.setCapacity(260);
		ds.setActive(true);
		ds.setName("Centrum Eindhoven");
		ds.setLat(51.441262);
		ds.setLng(5.447672);
		dockingService.save(ds);
		ds = new DockingStation();
		ds.setCapacity(215);
		ds.setActive(true);
		ds.setName("Stadion Eindhoven");
		ds.setLat(51.441851);
		ds.setLng(5.468059);
		dockingService.save(ds);
		ds = new DockingStation();
		ds.setCapacity(297);
		ds.setActive(true);
		ds.setName("Strijp-S Eindhoven");
		ds.setLat(51.448966);
		ds.setLng(5.45733);
		dockingService.save(ds);
		ds = new DockingStation();
		ds.setCapacity(105);
		ds.setActive(true);
		ds.setName("Tongelre Eindhoven");
		ds.setLat(51.440791);
		ds.setLng(5.500513);
		dockingService.save(ds);
		ds = new DockingStation();
		ds.setCapacity(184);
		ds.setActive(true);
		ds.setName("Gestel Eindhoven");
		ds.setLat(51.417809);
		ds.setLng(5.450364);
		dockingService.save(ds);
		ds = new DockingStation();
		ds.setCapacity(394);
		ds.setActive(true);
		ds.setName("Stratum Eindhoven");
		ds.setLat(51.420344);
		ds.setLng(5.496238);
		dockingService.save(ds);
		ds = new DockingStation();
		ds.setCapacity(143);
		ds.setActive(true);
		ds.setName("Woensel Zuid Eindhoven");
		ds.setLat(51.420344);
		ds.setLng(5.496238);
		dockingService.save(ds);
		ds = new DockingStation();
		ds.setCapacity(104);
		ds.setActive(true);
		ds.setName("Woensel Noord Eindhoven");
		ds.setLat(51.482542);
		ds.setLng(5.481652);
		dockingService.save(ds);
	}

}
