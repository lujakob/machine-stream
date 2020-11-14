import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MachineService } from '../services/machine.service';
import { Observable } from 'rxjs';
import { Machine } from '../interfaces/machine.interface';

// @Todo(info): keeping the component slim: connect with data and dispatch events

@Component({
  selector: 'app-machine-detail',
  templateUrl: './machine-detail.component.html',
  styleUrls: ['./machine-detail.component.scss']
})
export class MachineDetailComponent implements OnInit, OnDestroy {
  detail$: Observable<Machine>;
  loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService,
  ) { }

  ngOnInit(): void {
    this.detail$ = this.machineService.detail$;
    this.loading$ = this.machineService.loading$;

    this.route.params
      .subscribe((p: Params) => this.machineService.loadDetail(p.id));
  }

  ngOnDestroy(): void {
    this.machineService.reset();
  }
}
