package com.scg.docking;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.scg.bikeService.CrossOrigin;

@RestController
//@CrossOrigin("*")
public class DockingController {

	private final DockingService dockingService;

	@Autowired
	public DockingController(DockingService dockingService) {
		this.dockingService = dockingService;
	}

	@CrossOrigin(origins = "http://localhost:9000/")
	@GetMapping("/")
	public String home() {
		return "hello world";
	}

	@CrossOrigin(origins = "http://localhost:9000/")
	@GetMapping("test")
	public String getTest() {
		return "test";
	}

	@CrossOrigin(origins = "http://localhost:9000/")
	@GetMapping("getAll")
	public List<DockingStation> getAllDockingStations() {
//		return this.dockingService.getAll();
		List<DockingStation> dockingstations = this.dockingService.getAll();
		List<DockingStation> notDeleted = new ArrayList<DockingStation>();
		dockingstations.forEach(ds -> {
			if (ds.getDeleted() == false) {
				notDeleted.add(ds);
			}
		});
		return notDeleted;

	}

//	@GetMapping("getNotDeleted")
//	public List<DockingStation> getNotDeleted() {
//		return this.dockingService.getNotDeleted();
//	}

	@CrossOrigin(origins = "http://localhost:9000/")
	@GetMapping("getOne")
	public DockingStation getOneDockingStation() {
		long id = 1;
		DockingStation dock = this.dockingService.getOne(id);
		System.out.println(dock.getName());
		return dock;
	}

	@CrossOrigin(origins = "http://localhost:9000/")
	@GetMapping("/fillDB")
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

	@CrossOrigin(origins = "http://localhost:9000/")
	@PostMapping("newDocking")
	public boolean newDocking(@RequestBody DockingDTO dockingDTO) {

		DockingStation dockingStation = new DockingStation();
		dockingStation.setActive(true);
		dockingStation.setBikes(dockingDTO.getBikes());
		dockingStation.setCapacity(dockingDTO.getCapacity());
		dockingStation.setLat(dockingDTO.getLat());
		dockingStation.setLng(dockingDTO.getLng());
		dockingStation.setName(dockingDTO.getName());
		dockingService.save(dockingStation);
		return true;
	}

	@CrossOrigin(origins = "http://localhost:9000/")
	@PutMapping("updateDocking")
	public boolean updateDocking(@RequestBody DockingWithoutDeleteDTO dockingStation) {
		DockingStation updDocking = dockingService.getOne(dockingStation.getDockingId());
		updDocking.setActive(dockingStation.getActive());
		updDocking.setBikes(dockingStation.getBikes());
		updDocking.setCapacity(dockingStation.getCapacity());
		updDocking.setLat(dockingStation.getLat());
		updDocking.setLng(dockingStation.getLng());
		updDocking.setName(dockingStation.getName());
		dockingService.save(updDocking);
		return true;
	}

	@CrossOrigin(origins = "http://localhost:9000/")
	@DeleteMapping("deleteDocking/{dockingId}")
	public boolean deleteDocking(@RequestParam Long dockingId) {
		DockingStation docking = dockingService.getOne(dockingId);
		docking.setDeleted(true);
		dockingService.save(docking);
		return true;
	}

}
