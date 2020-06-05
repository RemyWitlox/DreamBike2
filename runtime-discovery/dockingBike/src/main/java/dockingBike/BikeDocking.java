package dockingBike;


import javax.persistence.Entity;

@Entity
public class BikeDocking {

	private Long dockingId;
	private Long bikeId;
	private int capacity;

	public Long getDockingId() {
		return dockingId;
	}

	public void setDockingId(Long dockingId) {
		this.dockingId = dockingId;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

}
