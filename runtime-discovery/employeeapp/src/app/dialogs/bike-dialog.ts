import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Bike, BikeType, BikeDriver } from '../models';
import { DatePipe } from '@angular/common';
import { BikeService } from '../services';

@Component({
  selector: 'bike-dialog',
  templateUrl: './bikeDialog.component.html',
})
export class BikeDialog implements OnInit {
  types = BikeType;
  drivers = BikeDriver;
  keys = Object.keys;
  bikeForm: FormGroup;
  returnUrl: string;
  newBike: Bike = {
    name: '',
    type: BikeType.ELECTRIC,
    driver: BikeDriver.CHILD,
    size: 0,
    created: new Date(),
  };
  submitted = false;
  intro = '';
  error = '';

  constructor(
    private dialogRef: MatDialogRef<BikeDialog>,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private bikeService: BikeService,
    @Inject(MAT_DIALOG_DATA) public data: Bike
  ) {}

  ngOnInit() {
    this.bikeForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: [BikeType, Validators.required],
      driver: [BikeDriver, Validators.required],
      size: [null, Validators.required],
      created: ['', Validators.required],
    });

    if (this.data?.bikeId) {
      this.intro = 'Change a Bike.';
      this.f['name'].setValue(this.data.name, {
        onlySelf: true,
      });
      this.f['type'].setValue(BikeType[this.data.type], {
        onlySelf: true,
      });
      this.f['driver'].setValue(BikeDriver[this.data.driver], {
        onlySelf: true,
      });
      this.f['size'].setValue(this.data.size, {
        onlySelf: true,
      });
      this.f['created'].setValue(
        this.datePipe.transform(this.data.created, 'yyyy-MM-dd'),
        {
          onlySelf: true,
        }
      );
    } else {
      this.intro = 'Add a Bike.';
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.bikeForm.controls;
  }

  async onConfirm() {
    this.submitted = true;
    this.error = '';

    if (
      this.bikeForm.invalid ||
      this.f.name.value == '' ||
      this.f.driver.value.toString() == '' ||
      this.f.size.value == '' ||
      this.f.type.value.toString() == '' ||
      this.f.created.value == ''
    ) {
      this.error = 'Form is not complete.';
      return;
    } else if (this.data) {
      this.newBike.bikeId = this.data.bikeId;
      this.newBike.name = this.f.name.value;
      this.newBike.driver = this.f.driver.value.toString().toUpperCase();
      this.newBike.size = this.f.size.value;
      this.newBike.type = this.f.type.value.toString().toUpperCase();
      this.newBike.created = this.f.created.value;
      this.bikeService.updateBike(this.newBike).subscribe(
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
      this.newBike.name = this.f.name.value;
      this.newBike.driver = this.f.driver.value.toString().toUpperCase();
      this.newBike.size = this.f.size.value;
      this.newBike.type = this.f.type.value.toString().toUpperCase();
      this.newBike.created = this.f.created.value;
      this.bikeService.createBike(this.newBike).subscribe(
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
  }
}
