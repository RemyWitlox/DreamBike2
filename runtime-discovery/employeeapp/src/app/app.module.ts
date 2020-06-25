import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material-module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

// Services;
import { CustomHttpInterceptorService } from './services';

// Components:
import { AppComponent } from './components/app';
import { AppRoutingModule } from './router/app-routing.module';
import { HomeComponent } from './components/home';
import { JwtInterceptor, ErrorInterceptor, NoopComponent } from './_helpers';
import { SettingsComponent } from './components/settings';
import { AnalyticsComponent } from './components/analytics';
import { RepairsComponent } from './components/repairs';
import { BikesComponent } from './components/bikes';
import { DockingStationsComponent } from './components/docking-stations';

// Dialogs:
import { LoginDialog } from './dialogs';
import { DockingDialog } from './dialogs';
import { DeleteDialog } from './dialogs';
import { BikeDialog } from './dialogs';
import { BikeDockDialog } from './dialogs';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginDialog,
    DeleteDialog,
    DockingDialog,
    BikeDialog,
    BikeDockDialog,
    SettingsComponent,
    NoopComponent,
    AnalyticsComponent,
    RepairsComponent,
    BikesComponent,
    DockingStationsComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    MaterialModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule,
    ReactiveFormsModule,
    MatMenuModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatListModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCU6a9rxjrf7jWAP1Vjg39fAF3SRi4XuSk',
    }),
  ],
  exports: [FormsModule, ReactiveFormsModule],
  entryComponents: [
    LoginDialog,
    DockingDialog,
    DeleteDialog,
    BikeDialog,
    BikeDockDialog,
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptorService,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
