import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { DockingStation } from '../../models';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { DockingDialog } from 'src/app/dialogs/docking-dialog';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from '../../dialogs';
import { DockingService } from 'src/app/services/docking.service';

@Component({
  selector: 'app-docking-stations',
  templateUrl: './docking-stations.component.html',
  styleUrls: ['./docking-stations.component.scss'],
  providers: [NgbTypeaheadConfig],
})
export class DockingStationsComponent {
  // ADD [iconUrl]="ds.active ? green : red" to agm-marker
  public red = '../../../assets/red.png';
  public blue = '../../../assets/blue.png';
  public green = '../../../assets/green.png';
  public model: DockingStation;
  public dockingStations: DockingStation[];
  public sortedData: DockingStation[];
  public loading: boolean;
  public connected: boolean;

  public address: string;
  public lat: number = 51.441262;
  public lng: number = 5.477672;
  // google maps zoom level
  public zoom: number;
  public selectedDs: DockingStation;
  public newDocking: DockingStation = {
    dockingId: 0,
    name: '',
    bikes: 0,
    capacity: 0,
    lat: 0,
    lng: 0,
    active: true,
  };

  constructor(
    private dialog: MatDialog,
    private dockingService: DockingService
  ) {
    this.connected = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this.getDockingStations();
    this.setLocation(51.44083, 5.47778);
    this.zoom = 12;
  }

  public getDockingStations(): void {
    this.loading = true;
    this.dockingStations = [];
    this.dockingService.getDockingStations().subscribe(
      (ds) => {
        this.dockingStations = ds;
        this.sortedData = this.dockingStations.sort((a, b) => {
          return compare(a.dockingId, b.dockingId, true);
        });
        this.connected = true;
        this.loading = false;
      },
      (err) => {
        this.connected = false;
        this.loading = false;
        console.log(err);
      }
    );
    this.selectedDs = new DockingStation();
  }

  public search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map((term) =>
        term === ''
          ? []
          : this.dockingStations
              .filter(
                (v) => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  public formatter = (ds: DockingStation) => ds.name;

  public selectedItem(location) {
    this.setLocation(location.item.lat, location.item.lng);
  }

  // Get Current Location Coordinates
  public setLocation(lat: number, lng: number) {
    this.lat = lat;
    this.lng = lng;
    this.zoom = 12;
  }

  checkMag(ds) {
    if (ds.name.contains('Magazijn')) {
      return true;
    } else {
      return false;
    }
  }

  public setActive(ds: DockingStation) {
    this.newDocking.dockingId = ds.dockingId;
    this.newDocking.name = ds.name;
    this.newDocking.bikes = ds.bikes;
    this.newDocking.capacity = ds.capacity;
    this.newDocking.lat = ds.lat;
    this.newDocking.lng = ds.lng;
    if (ds.active) {
      this.newDocking.active = true;
    } else {
      this.newDocking.active = false;
    }
    this.dockingService.updateDockingStation(this.newDocking).subscribe(
      () => {
        this.getDockingStations();
        this.connected = true;
      },
      (error) => {
        console.error(error);
        this.connected = false;
      },
      () => {
        this.newDocking = new DockingStation();
      }
    );
    this.newDocking = new DockingStation();
  }

  public onDelete(ds): void {
    const deleteRef = this.dialog.open(DeleteDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '200px',
      data: ds,
    });
    deleteRef.afterClosed().subscribe(() => {
      this.getDockingStations();
    });
  }

  public onEdit(ds) {
    const dialogRef = this.dialog.open(DockingDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '500px',
      data: ds,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getDockingStations();
    });
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(DockingDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getDockingStations();
    });
  }

  public onSelect(ds) {
    if (this.selectedDs === ds) {
      this.selectedDs = new DockingStation();
      return;
    } else {
      this.selectedDs = ds;
      this.setLocation(ds.lat, ds.lng);
    }
  }

  public sortData(sort: Sort) {
    const data = this.sortedData;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return compare(a.dockingId, b.dockingId, isAsc);
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'act':
          return compare(a.active.toString(), b.active.toString(), isAsc);
        case 'bikes':
          return compare(a.bikes, b.bikes, isAsc);
        case 'space':
          return compare(a.capacity - a.bikes, b.capacity - b.bikes, isAsc);
        case 'capacity':
          return compare(a.capacity, b.capacity, isAsc);
        case 'lat':
          return compare(a.lat, b.lat, isAsc);
        case 'lng':
          return compare(a.lng, b.lng, isAsc);
        default:
          return compare(a.name.toString(), b.name.toString(), isAsc);
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
