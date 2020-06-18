package com.scg.docking;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class HttpRequestTest {

	@InjectMocks
	DockingController dockingController;

	@Mock
	DockingService dockingRepository;

	@Test
	public void testFindAll() {
		// given
		DockingStation ds1 = new DockingStation();
		ds1.setCapacity(260);
		ds1.setActive(true);
		ds1.setName("Centrum Eindhoven");
		ds1.setLat(51.441262);
		ds1.setLng(5.447672);
		DockingStation ds2 = new DockingStation();
		ds2.setCapacity(215);
		ds2.setActive(true);
		ds2.setName("Stadion Eindhoven");
		ds2.setLat(51.441851);
		ds2.setLng(5.468059);
		List<DockingStation> dockingstations = new ArrayList<DockingStation>();
		dockingstations.add(ds1);
		dockingstations.add(ds2);

		when(dockingRepository.getAll()).thenReturn(dockingstations);

		// when
		List<DockingStation> result = dockingController.getAllDockingStations();

		// then
		assertThat(result.size()).isEqualTo(2);
		assertThat(result.get(0).getName()).isEqualTo(ds1.getName());
		assertThat(result.get(1).getName()).isEqualTo(ds2.getName());
	}
}
