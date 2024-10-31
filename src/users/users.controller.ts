import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService,
  ) {}

  @Get() 
  async getAll() {
    return this.userService.findAll();
  }

  @Get('id/:id')
  async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Get('uni_id/:uniId')
  async findByUniId(@Param('uniId') id: string) {
    return this.userService.findByUniId(id);
  }

  @Post('create')
  async create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }
  
  @Patch(':id/update')
  async update(@Param('id') id: string,@Body() dto: UpdateUserDto) {
    return this.userService.update(+id, dto);
  }

  @Delete(':id/delete')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
