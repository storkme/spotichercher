import { Body, Controller, Get, Post, Redirect } from '@nestjs/common';
import * as config from 'config';
import { resolve } from 'url';
import { SpotifyService } from '../spotify/spotify.service';
import { LoginDto } from './interfaces';

@Controller('auth')
export class AuthController {
  private readonly spotifyAuthorizeUrl: string;
  private readonly redirectUrl: string;

  constructor(private spotifyService: SpotifyService) {
    this.redirectUrl = resolve(config.get('frontendUrl'), '/callback');
    const authorizeUrl = config.get('spotify.authorizeUrl');
    const scope = config.get('spotify.scope') as string;

    this.spotifyAuthorizeUrl = `${authorizeUrl}?response_type=code&client_id=${config.get(
      'spotify.clientId',
    )}&redirect_uri=${encodeURIComponent(
      this.redirectUrl,
    )}&scope=${encodeURIComponent(scope)}`;
  }

  @Get('redirect')
  @Redirect('https://not.gd', 302)
  redirect() {
    return {
      url: this.spotifyAuthorizeUrl,
    };
  }

  @Post('login')
  async login(@Body() body: LoginDto) {
    return this.spotifyService.auth(body.code, this.redirectUrl);
  }
}
