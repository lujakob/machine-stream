import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Machine } from '../interfaces/machine.interface';
import { MachineService } from '../services/machine.service';

// @Todo(info): keeping the component slim: connect with data and dispatch events

@Component({
  selector: 'app-machine-list',
  templateUrl: './machine-list.component.html',
  styleUrls: ['./machine-list.component.scss']
})
export class MachineListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'status', 'machine_type', 'longitude', 'latitude'];
  machines$: Observable<Machine[]>;
  loading$: Observable<boolean>;

  constructor(private machineService: MachineService) { }

  ngOnInit(): void {
    this.machines$ = this.machineService.machines$;
    this.loading$ = this.machineService.loading$;

    this.machineService.loadList();
  }

  ngOnDestroy(): void {
    this.machineService.reset();
  }
}
