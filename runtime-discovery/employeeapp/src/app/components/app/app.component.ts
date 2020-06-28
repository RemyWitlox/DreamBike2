import { Component, OnInit, NgZone } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialog } from '../../dialogs/login-dialog';
import { Role } from 'src/app/models';
import { Router } from '@angular/router';
import { AuthenticationService, LoginService } from 'src/app/services';
import { ReceiveUser } from 'src/app/models';
import { tick } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading: boolean;
  connected: boolean;
  title = 'Dreambike';
  currentApplicationVersion = environment.appVersion;
  subtitle = 'DreamBike Employee Application';
  currentBackendUser: ReceiveUser;
  now: Date;
  interval;
  dev: boolean;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
    private zone: NgZone
  ) { }

  setDevColor() {
    console.log('set color');

    if ((this.dev = true)) {
      console.log('true');

      return 'primary';
    } else {
      console.log('falseks');

      return 'rgb(124, 20, 20)';
    }
  }

  ngOnInit() {
    this.loading = true;
    this.dev = false;
    // this.interval = setInterval(() => {
    //   this.onConnect();
    // }, 5000);
    this.zone.run(() => this.getCurrentBackendUser());
    if (this.currentApplicationVersion.includes('dev')) {
      console.log('dev is true');
      this.dev = true;
    } else {
      console.log('dev is false');
      this.dev = false;
    }
  }

  getCurrentBackendUser() {
    this.authenticationService.currentBackendUser.subscribe(
      (x) => (this.currentBackendUser = x)
    );
  }

  get isAdmin() {
    return (
      this.currentBackendUser && this.currentBackendUser.role === Role.Admin
    );
  }

  get isManagement() {
    return (
      this.currentBackendUser &&
      this.currentBackendUser.role === Role.Management
    );
  }

  onConnect() {
    this.loginService.testConnection().subscribe(
      (succes) => {
        this.connected = succes;
        this.now = new Date();
      },
      (error) => {
        console.error(error);
        this.loading = false;
        this.connected = false;
        clearInterval(this.interval);
      },
      () => {
        this.loading = false;
      }
    );
  }

  onLogout(): void {
    this.authenticationService.logout();
    tick(2000);
    this.router.navigate(['home']);
  }

  onLogin(): void {
    const dialogRef = this.dialog.open(LoginDialog, {
      panelClass: 'dialog',
      width: '300px',
      height: '350px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['home']);
    });
  }
}
