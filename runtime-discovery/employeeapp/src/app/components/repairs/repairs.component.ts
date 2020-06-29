import { Component, OnInit } from '@angular/core';
import { Bike, BikeType, BikeDriver } from 'src/app/models';
import { MatDialog } from '@angular/material/dialog';
import { BikeService } from 'src/app/services';
import { Sort } from '@angular/material/sort';
import { DeleteDialog } from 'src/app/dialogs';

@Component({
  selector: 'app-repairs',
  templateUrl: './repairs.component.html',
  styleUrls: ['./repairs.component.scss'],
})
export class RepairsComponent {
  public bikes: Bike[];
  public sortedData: Bike[];
  public selectedBike: Bike;
  public loading: boolean;
  public connected: boolean;

  constructor(public dialog: MatDialog, public bikeService: BikeService) {
    this.connected = false;
    this.loading = false;
  }

  ngOnInit(): void {
    this.getBikes();
  }

  public getType(type) {
    const t: String = BikeType[type];
    return t;
  }

  public getDriver(driver) {
    const d: String = BikeDriver[driver];
    return d;
  }

  public getBikes(): void {
    this.loading = true;
    this.bikeService.getBikes().subscribe(
      (bikes) => {
        this.bikes = bikes.filter((broken) => broken.broken == true);
        this.sortedData = bikes
          .filter((broken) => broken.broken == true)
          .sort((a, b) => {
            return compare(a.bikeId, b.bikeId, true);
          });
        this.connected = true;
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.connected = false;
        this.loading = false;
      }
    );
  }

  public onFixed(bike) {
    let fixedBike: Bike;
    fixedBike.bikeId = bike.bikeId;
    fixedBike.name = bike.name;
    fixedBike.type = bike.type;
    fixedBike.driver = bike.driver;
    fixedBike.created = bike.created;
    fixedBike.size = bike.size;
    fixedBike.docking = bike.docking;
    fixedBike.broken = false;
    this.bikeService.updateBike(fixedBike).subscribe(
      () => {
        this.getBikes();
        this.connected = true;
      },
      (error) => {
        console.error(error);
        this.connected = false;
      }
    );
  }

  public onDelete(bike) {
    const deleteRef = this.dialog.open(DeleteDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '200px',
      data: bike,
    });
    deleteRef.afterClosed().subscribe(() => {
      this.getBikes();
    });
  }

  public onSelect(bike) {
    if (this.selectedBike === bike) {
      this.selectedBike = new Bike();
      return;
    } else {
      this.selectedBike = bike;
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
