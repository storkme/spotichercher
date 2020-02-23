import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CallbackComponent } from './callback/callback.component';
import { PlayerComponent } from './player/player.component';
import { AuthGuard } from './auth.guard';
import { PlaylistComponent } from './playlist/playlist.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  { path: 'callback', component: CallbackComponent },
  {
    path: 'player',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: PlaylistComponent,
      },
      {
        path: ':playlistId',
        component: PlayerComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/player',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
