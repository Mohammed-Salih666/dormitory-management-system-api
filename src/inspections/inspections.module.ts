import { Module } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { InspectionsController } from './inspections.controller';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  providers: [InspectionsService],
  controllers: [InspectionsController],
  imports: [DatabaseModule]
})
export class InspectionsModule {}
