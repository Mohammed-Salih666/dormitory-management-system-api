import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { reservations } from 'src/database/schema';

@Controller('reservations')
export class ReservationsController {

  constructor(
    private readonly reservationService: ReservationsService
  ) {}

  @Get()
  findAll() {
    return this.reservationService.findAll();
  }

  @Get('user_id/:user_id')
  findOne(@Param('user_id') userId: string) {
    return this.reservationService.findOne(+userId);
  }

  @Post('create')
  create(@Body() dto: CreateReservationDto) {
    return this.reservationService.create(dto);
  }

  @Patch(':id/update')
  update(@Param('id') id: string, @Body() dto: Partial<typeof reservations.$inferSelect>) {
    return this.reservationService.update(+id, dto); 
  }

  @Delete(':id/remove')
  remove(@Param('id') id: string) {
    return this.reservationService.remove(+id);
  }
}
