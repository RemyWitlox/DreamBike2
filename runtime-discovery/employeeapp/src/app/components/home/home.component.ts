import { Component } from '@angular/core';
import { AuthenticationService } from '../../services';
import { ReceiveUser } from 'src/app/models';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  loading = false;
  currentBackendUser: ReceiveUser;
  userFromApi: ReceiveUser;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.currentBackendUser = this.authenticationService.currentBackendUserValue;
  }

  ngOnInit() {
    this.loading = true;
    if (!this.currentBackendUser) {
      return;
    } else {
      this.loading = false;
      this.userFromApi = this.currentBackendUser;
    }
  }

  getUrl() {
    return '../../../assets/bigcity.png';
  }

  goDocking() {
    this.router.navigate(['/dockingStations']);
  }

  goBikes() {
    this.router.navigate(['/bikes']);
  }

  goRepairs() {
    this.router.navigate(['/repairs']);
  }
}
