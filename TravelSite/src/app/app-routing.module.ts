import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddJourneyComponent } from './pages/journey/add-journey/add-journey.component';
import { JourneyComponent } from './pages/journey/journey.component';
import { UpdateJourneyComponent } from './pages/journey/update-journey/update-journey.component';
import { LoginAdminComponent } from './pages/login-admin/login-admin.component';
import { ManagementComponent } from './pages/management/management.component';
import { UpdateDestinationComponent } from './pages/management/update-destination/update-destination.component';
import { AddPassengerComponent } from './pages/passenger/add-passenger/add-passenger.component';
import { PassengerComponent } from './pages/passenger/passenger.component';
import { UpdatePassengerComponent } from './pages/passenger/update-passenger/update-passenger.component';
import { AddTicketComponent } from './pages/ticket/add-ticket/add-ticket.component';
import { GenerateTicketComponent } from './pages/ticket/generate-ticket/generate-ticket.component';
import { TicketComponent } from './pages/ticket/ticket/ticket.component';
import { UpdateTicketComponent } from './pages/ticket/update-ticket/update-ticket.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'passenger', component: PassengerComponent},
  {path: 'login', component: LoginAdminComponent},
  {path: 'management', component: ManagementComponent},
  {path: 'updateDestination', component: UpdateDestinationComponent},
  {path: 'journey', component: JourneyComponent},
  {path: 'addJourney', component: AddJourneyComponent},
  {path: 'updateJourney', component: UpdateJourneyComponent},
  {path: 'addPassenger', component: AddPassengerComponent},
  {path: 'updatePassenger', component: UpdatePassengerComponent},
  {path: 'ticket', component: TicketComponent},
  {path: 'addTicket', component: AddTicketComponent},
  {path: 'updateTicket', component: UpdateTicketComponent},
  {path: 'generateTicket', component: GenerateTicketComponent},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
