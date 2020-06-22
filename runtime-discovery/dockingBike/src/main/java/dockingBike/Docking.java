package dockingBike;

import java.util.Collection;
import java.util.Iterator;
import java.util.Set;

import javax.persistence.Entity;
import javax.persistence.EntityExistsException;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.PostLoad;
import javax.persistence.Table;
import javax.persistence.Transient;

@Entity
@Table(name = "BD_DOCKING")
public class Docking {
	@Id
	private int dockingId;

	@OneToMany(mappedBy = "docking", fetch = FetchType.EAGER)
	private Set<Bike> bikes;

	private int capacity;

	@Transient
	private int available;

	@PostLoad
	private void onLoad() {
		this.available = this.capacity - this.bikes.size();
	}

	public Docking() {

	}

	public int getDockingId() {
		return dockingId;
	}

	public void setDockingId(int dockingId) {
		this.dockingId = dockingId;
	}

	public Set<Bike> getBikes() {
		return bikes;
	}

	public void setBikes(Set<Bike> bikes) {
		this.bikes = bikes;
	}

	public int getCapacity() {
		return capacity;
	}

	public void setCapacity(int capacity) {
		this.capacity = capacity;
	}

	public int getAvailable() {
		return available;
	}

	public void addBike(Bike bike) {
		if (this.bikes == null) {
			this.bikes = new Set<Bike>() {

				@Override
				public int size() {
					// TODO Auto-generated method stub
					return 0;
				}

				@Override
				public boolean isEmpty() {
					// TODO Auto-generated method stub
					return false;
				}

				@Override
				public boolean contains(Object o) {
					// TODO Auto-generated method stub
					return false;
				}

				@Override
				public Iterator<Bike> iterator() {
					// TODO Auto-generated method stub
					return null;
				}

				@Override
				public Object[] toArray() {
					// TODO Auto-generated method stub
					return null;
				}

				@Override
				public <T> T[] toArray(T[] a) {
					// TODO Auto-generated method stub
					return null;
				}

				@Override
				public boolean add(Bike e) {
					// TODO Auto-generated method stub
					return false;
				}

				@Override
				public boolean remove(Object o) {
					// TODO Auto-generated method stub
					return false;
				}

				@Override
				public boolean containsAll(Collection<?> c) {
					// TODO Auto-generated method stub
					return false;
				}

				@Override
				public boolean addAll(Collection<? extends Bike> c) {
					// TODO Auto-generated method stub
					return false;
				}

				@Override
				public boolean retainAll(Collection<?> c) {
					// TODO Auto-generated method stub
					return false;
				}

				@Override
				public boolean removeAll(Collection<?> c) {
					// TODO Auto-generated method stub
					return false;
				}

				@Override
				public void clear() {
					// TODO Auto-generated method stub

				}
			};
		}
		if (!bikes.contains(bike)) {
			bikes.add(bike);
		} else {
			throw new EntityExistsException();
		}
	}

	public void removeBike(Bike bike) {
		this.bikes.remove(bike);
	}

}
