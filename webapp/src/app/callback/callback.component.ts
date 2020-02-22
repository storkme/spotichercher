import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent implements OnInit {
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    // private router: Router,
  ) {}

  ngOnInit(): void {
    const t = Date.now();
    this.activatedRoute.queryParams
      .pipe(
        tap(() => (this.loading = true)),
        switchMap(params => this.apiService.auth(params.code)),
        tap(() => (this.loading = false)),
        tap(next => console.log(`+${Date.now() - t} → next: `, next)),
      )
      .subscribe(next => {

        console.log('auth done:', next);
      });

    // this error means we can try again: "error":"invalid_grant","error_description":"Authorization code expired"
  }
}
