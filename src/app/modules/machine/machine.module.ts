import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MachineListComponent } from './machine-list/machine-list.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MachineDetailComponent } from './machine-detail/machine-detail.component';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingComponent } from './components/loading/loading.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    MachineListComponent,
    MachineDetailComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatListModule,
    MatTableModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule
  ]
})
export class MachineModule { }
