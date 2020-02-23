import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('spotify')
export class SpotifyController {
  constructor(private spotifyService: SpotifyService) {}

  @Get('playlists')
  @UseGuards(AuthGuard())
  async getPlaylists(@Request() req) {
    return this.spotifyService.getPlaylists(req.user.access_token);
  }
}
