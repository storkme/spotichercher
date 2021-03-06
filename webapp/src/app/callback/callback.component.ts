import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { AuthService } from '../auth.service';

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
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams
      .pipe(
        tap(() => (this.loading = true)),
        switchMap(params => this.apiService.auth(params.code)),
        tap(() => (this.loading = false)),
      )
      .subscribe(next => {
        this.authService.setToken(next.access_token, next.refresh_token);

        this.router.navigate(['/player']);
      });

    // this error means we can try again: "error":"invalid_grant","error_description":"Authorization code expired"
  }
}
