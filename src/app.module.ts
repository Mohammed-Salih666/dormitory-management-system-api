import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ApartmentsModule } from './apartments/apartments.module';
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
  ],
})
export class AppModule {}
