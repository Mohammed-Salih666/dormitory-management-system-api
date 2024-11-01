import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { ApartmentsModule } from './apartments/apartments.module';
import { ReservationsModule } from './reservations/reservations.module';
import { InspectionsModule } from './inspections/inspections.module';
import { AuthModule } from './auth/auth.module';
import { NotificationsModule } from './notifications/notifications.module';
import databaseConfig from './config/database.config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      cache: true,
      envFilePath: '.env',
    }),
    MailerModule.forRoot({
      transport: {
        host: String(process.env.MAIL_HOST),
        port: Number(process.env.Mail_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USERNAME,
          pass: process.env.MAIL_PASSWORD,
        }
      },
    }),
    DatabaseModule,
    UsersModule,
    ApartmentsModule,
    ReservationsModule,
    InspectionsModule,
    AuthModule,
    NotificationsModule,
  ],
})
export class AppModule {}
