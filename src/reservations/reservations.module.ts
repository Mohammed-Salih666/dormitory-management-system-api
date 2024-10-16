import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { ReservationsController } from './reservations.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [ReservationsService],
  controllers: [ReservationsController],
  imports: [DatabaseModule]
})
export class ReservationsModule {}
