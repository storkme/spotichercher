import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
  playlists$: Observable<unknown>;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.playlists$ = this.apiService.playlists();
  }
}
