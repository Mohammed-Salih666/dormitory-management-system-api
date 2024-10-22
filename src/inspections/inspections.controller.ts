import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { InspectionsService } from './inspections.service';
import { CreateInspectionDto } from './dto/create-inspection.dto';

@Controller('inspections')
export class InspectionsController {
  constructor(
    private readonly inspectionsService: InspectionsService,
  ){}

  @Get()
  findAll() {
    return this.inspectionsService.findAll();
  }

  @Get('id/:id')
  findOne(@Param('id') id: string) {
    return this.inspectionsService.findOne(+id);
  }

  @Post('create')
  create(@Body() dto: CreateInspectionDto) {
    return this.inspectionsService.create(dto);
  }

  @Patch('update')
  update(@Param('id') id: string, @Body() dto: Partial<CreateInspectionDto>) {
    return this.inspectionsService.update(+id, dto);
  }

  @Delete('remove')

  remove(@Param('id') id: string) {
    return this.inspectionsService.remove(+id);
  }
}
