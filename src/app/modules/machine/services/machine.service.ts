import { Injectable } from '@angular/core';
import { MachineHttpService } from './machine-http.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Machine } from '../interfaces/machine.interface';
import { MachineEventsService } from './machine-events.service';
import { FeedEvent } from '../interfaces/feed-event.interface';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

// merge event data into machine
function updateDetail(detail: Machine, {timestamp, status}: FeedEvent): Machine {
  return {
    ...detail,
    status,
    events: [
      {
        timestamp,
        status,
        // added for UI visibility of new events
        is_highlighted: true,
      },
      ...detail.events,
    ]
  };
}

@Injectable({
  providedIn: 'root'
})
export class MachineService {
  machines$: BehaviorSubject<Machine[]> = new BehaviorSubject<Machine[]>(null);
  detail$: BehaviorSubject<Machine> = new BehaviorSubject<Machine>(null);
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  private destroy$: Subject<void> = new Subject<void>();

  // @Todo(debug): disable 'machine_id' filter to see some action -> simply adds all events coming, regardless of machine id
  private debugDisableMachineIdFilter = false;

  constructor(
    private machineHttpService: MachineHttpService,
    private machineEventsService: MachineEventsService,
  ) {}

  // @Todo: add error case
  loadList(): void {
    this.loading$.next(true);

    this.machineHttpService.getList()
      .subscribe((machines: Machine[]) => {
        this.loading$.next(false);
        this.machines$.next(machines);
      });
  }

  loadDetail(id: string): void {
    this.loading$.next(true);

    this.machineHttpService.getDetail(id).pipe(
      switchMap((data: Machine) => {
        // set Machine data
        this.loading$.next(false);
        this.detail$.next(data);

        // switch to  events
        return this.machineEventsService.getEvents().pipe(
          filter((e: FeedEvent) => this.debugDisableMachineIdFilter || e.machine_id === data.id),
          takeUntil(this.destroy$)
        );
      }),
    ).subscribe((event: FeedEvent) => {
        // @Todo: debugging
        console.log('update event', event);
        const detail = this.detail$.getValue();
        this.detail$.next(updateDetail(detail, event));
      });
  }


  reset(): void {
    this.machines$.next(null);
    this.loading$.next(false);

    this.destroy$.next();
  }
}
