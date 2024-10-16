import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { ReservationsModule } from './reservations/reservations.module';
import databaseConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      cache: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    UsersModule,
    ApartmentsModule,
    ReservationsModule,
  ],
})
export class AppModule {}
