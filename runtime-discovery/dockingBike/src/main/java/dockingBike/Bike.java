package dockingBike;

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
	private int bikeId;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "dockingId")
	private Docking docking;

	public Bike() {

	}

	public int getBikeId() {
		return bikeId;
	}

	public void setBikeId(int bikeId) {
		this.bikeId = bikeId;
	}

	public Docking getDocking() {
		return docking;
	}

	public void setDocking(Docking docking) {
		this.docking = docking;
	}

}
