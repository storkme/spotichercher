import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { delay, repeatWhen, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
})
export class PlayerComponent implements OnInit, OnDestroy {
  stop$ = new Subject();
  playbackInfo$;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.playbackInfo$ = this.apiService.playback().pipe(
      repeatWhen(completed => completed.pipe(delay(1000))),
      takeUntil(this.stop$),
    );
  }

  ngOnDestroy(): void {
    this.stop$.next();
  }

  formatMs(ms: number) {
    const s = Math.round(ms / 1000);
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  }
}
