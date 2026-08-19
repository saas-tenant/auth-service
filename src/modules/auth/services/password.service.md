import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PasswordService {
  private readonly rounds = 12;

  hash(password: string) {
    return bcrypt.hash(password, this.rounds);
  }

  compare(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }
}