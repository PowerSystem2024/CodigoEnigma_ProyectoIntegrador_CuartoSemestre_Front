import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private event$ = new Subject<any>();

  emit(event: any) {
    this.event$.next(event);
  }

  onEvent() {
    return this.event$.asObservable();
  }
}