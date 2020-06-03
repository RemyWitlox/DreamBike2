package org.bikeDocking.classes;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "BD_Bike")
public class Bike {
	@Id
	private Long bikeId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "dockingId")
	private Docking docking;

	public Bike() {

	}

	public Long getBikeId() {
		return bikeId;
	}

	public void setBikeId(Long bikeId) {
		this.bikeId = bikeId;
	}

	public Docking getDocking() {
		return docking;
	}

	public void setDocking(Docking docking) {
		this.docking = docking;
	}

}
