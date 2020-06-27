package com.scg.docking;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class DockingRepositoryIntegrationTest {

	@Autowired
	private DockingRepository dockingRepository;

	@Test
	public void whenFindByName_thenReturnDocking() {
		// given
		if (dockingRepository.findByName("test1") != null) {
			dockingRepository.delete(dockingRepository.findByName("test1"));
		}
		DockingStation docking = new DockingStation();
		docking.setActive(true);
		docking.setBikes(12);
		docking.setCapacity(24);
		docking.setName("test1");
		dockingRepository.save(docking);

		// when
		DockingStation found = dockingRepository.findByName(docking.getName());

		// then
//		assertNotNull(found);
		assertThat(found.getName()).isEqualTo(docking.getName());
	}
}
