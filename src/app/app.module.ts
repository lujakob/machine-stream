import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MachineModule } from './modules/machine/machine.module';
import { Route, RouterModule } from '@angular/router';
import { MachineListComponent } from './modules/machine/machine-list/machine-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MachineDetailComponent } from './modules/machine/machine-detail/machine-detail.component';

const routes: Route[] = [
  {
    path: 'machines',
    component: MachineListComponent,
  },
  {
    path: 'machines/:id',
    component: MachineDetailComponent,
  },
  {
    path: '**',
    redirectTo: 'machines'
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    RouterModule.forRoot(routes),
    MachineModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
