import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DockingService } from '../services';
import { BikeService } from '../services';

@Component({
  selector: 'delete-dialog',
  templateUrl: './deleteDialog.component.html',
})
export class DeleteDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    public dockingService: DockingService,
    public bikeService: BikeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onConfirm(data) {
    if (data.name != '') {
      if (data.dockingId) {
        this.dockingService.deleteDockingStation(data.dockingId).subscribe(
          (succes) => {
            console.log(succes);
          },
          (error) => {
            console.error(error);
          },
          () => {
            this.dialogRef.close();
          }
        );
      } else if (data.bikeId) {
        this.bikeService.deleteBike(data.bikeId).subscribe(
          (succes) => {
            console.log(succes);
          },
          (error) => {
            console.error(error);
          },
          () => {
            this.dialogRef.close();
          }
        );
      }
      // TODO: send to backend.
    } else {
      console.log('ERROR');
      return;
    }
  }
}
