import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DockingStation } from '../models';

@Injectable({
  providedIn: 'root',
})
export class DockingService {
  url: string = 'http://localhost:8181/docking/';
  urlBd: string = 'http://localhost:8181/bikedocking/';

  constructor(private http: HttpClient) {}

  getDockingStations(): Observable<DockingStation[]> {
    const url = this.url + 'getAll';
    return this.http.get<DockingStation[]>(url);
  }

  createDockingStation(ds: DockingStation): Observable<DockingStation> {
    const url = this.url + 'newDocking';
    return this.http.post<DockingStation>(url, ds);
  }

  createDsLink(ds: DockingStation): Observable<any> {
    const sendDs = { dockingId: ds.dockingId, capacity: ds.capacity };
    const url = this.urlBd + 'addDocking';
    return this.http.post<any>(url, sendDs);
  }

  updateDockingStation(ds: DockingStation): Observable<DockingStation> {
    const url = this.url + 'updateDocking';
    return this.http.put<DockingStation>(url, ds);
  }

  deleteDockingStation(id): Observable<any> {
    const url = this.url + 'deleteDocking/' + id;
    return this.http.delete<any>(url, {
      params: {
        dockingId: id,
      },
    });
  }
}
