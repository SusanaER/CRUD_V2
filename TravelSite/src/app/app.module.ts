import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PassengerComponent } from './pages/passenger/passenger.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { ManagementComponent } from './pages/management/management.component';
import { HttpClientModule } from '@angular/common/http';
import { JourneyComponent } from './pages/journey/journey.component';
import { UpdateDestinationComponent } from './pages/management/update-destination/update-destination.component';
import { AddJourneyComponent } from './pages/journey/add-journey/add-journey.component';
import { UpdateJourneyComponent } from './pages/journey/update-journey/update-journey.component';
import { AddPassengerComponent } from './pages/passenger/add-passenger/add-passenger.component';
import { UpdatePassengerComponent } from './pages/passenger/update-passenger/update-passenger.component';
import { TicketComponent } from './pages/ticket/ticket/ticket.component';
import { AddTicketComponent } from './pages/ticket/add-ticket/add-ticket.component';
import { UpdateTicketComponent } from './pages/ticket/update-ticket/update-ticket.component';
import { GenerateTicketComponent } from './pages/ticket/generate-ticket/generate-ticket.component';
@NgModule({
  declarations: [
    AppComponent,
    PassengerComponent,
    LoginAdminComponent,
    ManagementComponent,
    JourneyComponent,
    UpdateDestinationComponent,
    AddJourneyComponent,
    UpdateJourneyComponent,
    AddPassengerComponent,
    UpdatePassengerComponent,
    TicketComponent,
    AddTicketComponent,
    UpdateTicketComponent,
    GenerateTicketComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
