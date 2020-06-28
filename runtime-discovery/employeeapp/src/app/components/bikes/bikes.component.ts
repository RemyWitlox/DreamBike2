import { Component, OnInit } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Bike } from 'src/app/models/bike';
import { BikeType } from 'src/app/models/bikeType';
import { BikeDriver } from 'src/app/models/bikeDriver';
import { BikeDialog, DeleteDialog } from 'src/app/dialogs';
import { MatDialog } from '@angular/material/dialog';
import { BikeDockDialog } from 'src/app/dialogs/bikeDock-dialog';
import { BikeService } from 'src/app/services/bike.service';
import { DockingStation } from 'src/app/models';
import { DockingService } from 'src/app/services';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.scss'],
})
export class BikesComponent {
  public bikes: Bike[];
  public newBike: Bike;
  public sortedData: Bike[];
  public selectedBike: Bike;
  public loading: boolean;
  public connected: boolean;
  public dockingStations: DockingStation[];

  constructor(
    public dialog: MatDialog,
    public bikeService: BikeService,
    public dockingService: DockingService
  ) {
    this.connected = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this.getBikes();
  }

  public getDockingStations(): void {
    this.dockingService.getDockingStations().subscribe(
      (ds) => {
        this.dockingStations = ds;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public getType(type) {
    const t: String = BikeType[type];
    return t;
  }

  public getDriver(driver) {
    const d: String = BikeDriver[driver];
    return d;
  }

  public getDs(bike): string {
    console.log(bike);
    let dockingId: string = '';
    let dockString = '';
    let ds;
    this.bikeService.getDsOnBike(bike).subscribe(
      (result) => {
        console.log(result);
        dockingId = result;
        ds = this.dockingStations.find(
          (x) => (x.dockingId = Number(dockingId))
        );
        dockString = ds.name;
        console.log(result);
      },
      (error) => {
        dockString = 'No Docking Station';
      }
    );
    return dockString;
  }

  public getBikes(): void {
    this.loading = true;
    this.bikeService.getBikes().subscribe(
      (bikes) => {
        this.bikes = bikes;
        this.sortedData = bikes.sort((a, b) => {
          return compare(a.bikeId, b.bikeId, true);
        });
        this.loading = false;
        this.connected = true;
      },
      (err) => {
        console.log(err);
        this.loading = false;
        this.connected = false;
      }
    );
    this.selectedBike = new Bike();
  }

  public setBroken(bike: Bike) {
    this.newBike.bikeId = bike.bikeId;
    this.newBike.name = bike.name;
    this.newBike.type = bike.type;
    this.newBike.driver = bike.driver;
    this.newBike.created = bike.created;
    this.newBike.size = bike.size;
    this.newBike.docking = bike.docking;
    if (bike.broken) {
      this.newBike.broken = true;
    } else {
      this.newBike.broken = false;
    }
    this.bikeService.updateBike(this.newBike).subscribe(
      () => {
        this.getBikes();
        this.connected = true;
      },
      (error) => {
        console.error(error);
        this.connected = false;
      },
      () => {
        this.newBike = new Bike();
      }
    );
  }

  public onSelect(bike) {
    if (this.selectedBike === bike) {
      this.selectedBike = new Bike();
      return;
    } else {
      this.selectedBike = bike;
    }
  }

  public onEdit(bike) {
    const dialogRef = this.dialog.open(BikeDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '500px',
      data: bike,
    });
    dialogRef.afterClosed().subscribe(() => {
      this.selectedBike = new Bike();
      this.getBikes();
    });
  }

  public onDelete(bike) {
    const deleteRef = this.dialog.open(DeleteDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '200px',
      data: bike,
    });
    deleteRef.afterClosed().subscribe(() => {
      this.selectedBike = new Bike();
      this.getBikes();
    });
  }

  public onAdd(): void {
    const dialogRef = this.dialog.open(BikeDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.selectedBike = new Bike();
      this.getBikes();
    });
  }

  public onDocking(bike): void {
    const dialogRef = this.dialog.open(BikeDockDialog, {
      panelClass: 'dialog',
      width: '400px',
      height: '450px',
      data: bike,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.selectedBike = new Bike();
      this.getBikes();
    });
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
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'bikeId':
          return compare(a.bikeId, b.bikeId, isAsc);
        case 'type':
          return compare(a.type, b.type, isAsc);
        case 'driver':
          return compare(a.driver, b.driver, isAsc);
        case 'size':
          return compare(a.size, b.size, isAsc);
        case 'broken':
          return compare(a.broken.toString(), b.broken.toString(), isAsc);
        case 'created':
          return compare(a.created.toString(), b.created.toString(), isAsc);
        default:
          return compare(a.name.toString(), b.name.toString(), isAsc);
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
