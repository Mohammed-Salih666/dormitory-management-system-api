import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { ApartmentsService } from './apartments.service';
import { CreateApartmentDto } from './dto/create-apartment.dto';

@Controller('apartments')
export class ApartmentsController {
  constructor(
    private readonly apartmentService: ApartmentsService,
  ) {}

  @Get()
  async findAll(@Query('gender') gender: string) { 
    const forMale = gender === 'M' ? true : false; 

    return this.apartmentService.findAll(forMale);
  }

  @Get('floor/:floor/number/:number')
  async findOne(@Param('floor') floor: string, @Param('number') number: string, @Query('gender') gender: string = 'M') {
    const forMale = gender === 'M' ? true : false; 
    return this.apartmentService.findOne(floor, +number, forMale)
  }

  @Get('floor/:floor/number/:number/rooms')
  async findRoomsByApartment(@Param('floor') floor: string, @Param('number') number: string) {
    return this.apartmentService.findRoomsByApartment(floor, +number);
  }

  @Get('available')
  async findAvailableRooms(@Query('gender') gender: string = 'M') {
    const forMale = gender === 'M' ? true : false;
    return this.apartmentService.findAvailableRooms(forMale);
  }

  @Post('create')
  async create(@Body() dto: CreateApartmentDto) {
    return this.apartmentService.create(dto);
  }

  @Patch(':floor/:number/update')
  async update(@Param('floor') floor: string, @Param('number') number: string, @Body() dto: Partial<CreateApartmentDto>){
    return this.apartmentService.update(floor, +number, dto);
  }

  @Delete(':floor/:number/remove')
  async remove(@Param('floor') floor: string, @Param('number') number: string) {
    return this.apartmentService.remove(floor, +number); 
  }
}
