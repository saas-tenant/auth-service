import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
  constructor(private readonly jwt: JwtService) {}

  generateAccessToken(payload: object) {
    return this.jwt.sign(payload, {
      expiresIn: '15m',
    });
  }

  generateRefreshToken(payload: object) {
    return this.jwt.sign(payload, {
      expiresIn: '30d',
    });
  }
}