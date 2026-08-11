import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class AuthRepository {
  constructor(private readonly prisma: PrismaService) {}

  findUserByEmail(email: string) {
    // return this.prisma.user.findUnique({
    // where: { email },
    // });
  }

  // transaction<T>(fn: (tx: Prisma.TransactionClient) => Promise<T>): Promise<T> {
  //   // return this.prisma.$transaction(fn);
  // }
}
