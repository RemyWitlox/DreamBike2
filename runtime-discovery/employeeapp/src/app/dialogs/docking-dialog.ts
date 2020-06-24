import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DockingStation } from '../models';
import { DockingService } from '../services';

@Component({
  selector: 'docking-dialog',
  templateUrl: './dockingDialog.component.html',
})
export class DockingDialog {
  dockingForm: FormGroup;
  returnUrl: string;
  submitted = false;
  newDocking: DockingStation = {
    name: '',
    bikes: 0,
    capacity: 0,
    lat: 0,
    lng: 0,
  };
  intro = '';
  error = '';

  constructor(
    private dialogRef: MatDialogRef<DockingDialog>,
    private formBuilder: FormBuilder,
    private dockingService: DockingService,
    @Inject(MAT_DIALOG_DATA) public data: DockingStation
  ) {}

  ngOnInit() {
    if (this.data) {
      this.intro = 'Change a Docking station.';
      this.dockingForm = this.formBuilder.group({
        name: [this.data.name, Validators.required],
        active: [this.data.active],
        bikes: [
          this.data.bikes,
          [Validators.required, Validators.min(0), Validators.max(999999)],
        ],
        capacity: [
          this.data.capacity,
          [Validators.required, Validators.min(1), Validators.max(999999)],
        ],
        lat: [
          this.data.lat,
          [
            Validators.required,
            Validators.maxLength(32),
            Validators.min(-90),
            Validators.max(90),
            Validators.pattern(/\-?\d*\.?\d{1,2}/),
          ],
        ],
        lng: [
          this.data.lng,
          [
            Validators.required,
            Validators.maxLength(32),
            Validators.min(-180),
            Validators.max(180),
            Validators.pattern(/\-?\d*\.?\d{1,2}/),
          ],
        ],
      });
    } else {
      this.intro = 'Add a Docking station.';
      this.dockingForm = this.formBuilder.group({
        name: ['', Validators.required],
        bikes: [
          null,
          [Validators.required, Validators.min(0), Validators.max(999999)],
        ],
        capacity: [
          null,
          [Validators.required, Validators.min(1), Validators.max(999999)],
        ],
        lat: [
          null,
          [
            Validators.required,
            Validators.maxLength(32),
            Validators.min(-90),
            Validators.max(90),
            Validators.pattern(/\-?\d*\.?\d{1,2}/),
          ],
        ],
        lng: [
          null,
          [
            Validators.required,
            Validators.maxLength(32),
            Validators.min(-180),
            Validators.max(180),
            Validators.pattern(/\-?\d*\.?\d{1,2}/),
          ],
        ],
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.dockingForm.controls;
  }

  async onConfirm() {
    this.submitted = true;
    this.error = '';
    if (
      this.dockingForm.invalid ||
      this.f.name.value == '' ||
      this.f.bikes.value == '' ||
      this.f.capacity.value == '' ||
      this.f.lat.value == '' ||
      this.f.lng.value == ''
    ) {
      this.error = 'Form is not complete.';
      return;
    } else {
      if (this.data) {
        this.newDocking.dockingId = this.data.dockingId;
        this.newDocking.name = this.f.name.value;
        this.newDocking.bikes = this.f.bikes.value;
        this.newDocking.capacity = this.f.capacity.value;
        this.newDocking.lat = this.f.lat.value;
        this.newDocking.active = this.data.active;
        this.newDocking.lng = this.f.lng.value;
        this.dockingService.updateDockingStation(this.newDocking).subscribe(
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
      } else {
        // new docking
        this.newDocking.name = this.f.name.value;
        this.newDocking.bikes = this.f.bikes.value;
        this.newDocking.capacity = this.f.capacity.value;
        this.newDocking.lat = this.f.lat.value;
        this.newDocking.lng = this.f.lng.value;
        this.dockingService.createDockingStation(this.newDocking).subscribe(
          (succes) => {
            console.log(succes);
            this.dockingService.createDsLink(this.newDocking).subscribe(
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
          },
          (error) => {
            console.error(error);
          },
          () => {
            this.dialogRef.close();
          }
        );
      }
    }
  }
}
