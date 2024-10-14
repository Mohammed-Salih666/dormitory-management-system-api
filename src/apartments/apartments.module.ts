import { Module } from '@nestjs/common';
import { ApartmentsController } from './apartments.controller';
import { ApartmentsService } from './apartments.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [ApartmentsController],
  providers: [ApartmentsService],
  imports: [DatabaseModule]
})
export class ApartmentsModule {}
