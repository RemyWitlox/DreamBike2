import { BikeType } from './bikeType';
import { BikeDriver } from './bikeDriver';
import { DockingStation } from './dockingStation';

export class Bike {
  bikeId?: number;
  name: string;
  type: BikeType;
  driver: BikeDriver;
  size: number;
  created: Date;
  broken?: boolean;
  docking?: DockingStation;
}
