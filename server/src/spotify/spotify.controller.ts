import { Controller, Get, HttpStatus, Request, Res, UseGuards } from '@nestjs/common';
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

  @Get('playback')
  @UseGuards(AuthGuard())
  async getPlayback(@Request() req, @Res() res) {
    const result = await this.spotifyService.getPlaybackInfo(req.user.access_token);

    if (!result) {
      res.status(HttpStatus.NO_CONTENT).send();
    }
    res.status(HttpStatus.OK).json(result);
  }
}
