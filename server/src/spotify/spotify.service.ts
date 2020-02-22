import { Injectable, UnauthorizedException } from '@nestjs/common';
import fetch from 'node-fetch';
import * as config from 'config';
import { resolve } from 'url';
import { SpotifyAuthResponse } from '../../../shared/interfaces';

@Injectable()
export class SpotifyService {
  /**
   * Authenticate with the spotify API
   * @param code
   * @param redirectUri
   */
  async auth(code: string, redirectUri: string): Promise<SpotifyAuthResponse> {
    const clientId = config.get('spotify.clientId') as string;
    const clientSecret = config.get('spotify.clientSecret') as string;
    const url = resolve(config.get('spotify.accountsUrl'), '/api/token');

    const result = await fetch(url, {
      method: 'POST',
      body: new URLSearchParams([
        ['client_id', clientId],
        ['client_secret', clientSecret],
        ['grant_type', 'authorization_code'],
        ['code', code],
        ['redirect_uri', redirectUri],
      ]),
    });

    if (result.ok) {
      return result.json();
    }

    throw new UnauthorizedException({ spotify_error: await result.json() });
  }
}
