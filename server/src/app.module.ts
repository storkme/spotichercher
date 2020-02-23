import { Module } from '@nestjs/common';
import { SpotifyService } from './spotify/spotify.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth/auth.controller';
import { SpotifyController } from './spotify/spotify.controller';
import * as config from 'config';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: config.get('jwtSecret'),
      signOptions: { expiresIn: '72h' },
    }),
  ],
  controllers: [AuthController, SpotifyController],
  providers: [SpotifyService, JwtStrategy],
})
export class AppModule {}
