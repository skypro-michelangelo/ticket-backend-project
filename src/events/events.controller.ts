/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFiles,
  UseInterceptors,
  Query,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongoose';
import { CreateTicketDto } from 'src/events/dto/create-ticket.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';
import { Events } from './schemas/events.schema';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post('create')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(@UploadedFiles() files, @Body() dto: CreateEventDto): Promise<Events> {
    const { picture } = files;
    return this.eventsService.create(dto, picture[0]);
  }

  @Get()
  getAll(@Query('count') count: number, @Query('offset') offset: number) {
    return this.eventsService.getAll(count, offset);
  }

  @Get(':id')
  getOne(@Param('id') id: ObjectId): Promise<Events> {
    return this.eventsService.getOne(id);
  }

  @Delete(':id/delete')
  delete(@Param('id') id: ObjectId): Promise<Events> {
    return this.eventsService.delete(id);
  }

  @Put(':id/update')
  update(
    @Body() dto: UpdateEventDto,
    @Param('id') id: ObjectId,
  ): Promise<Events> {
    return this.eventsService.update(id, dto);
  }

  @Get(':id/ticket')
  getTicket(@Param('id') id: ObjectId) {
    return this.eventsService.getTicket(id);
  }

  @Post(':id/ticket/buy')
  addTicket(@Param('id') id: ObjectId, @Body() dto: CreateTicketDto) {
    return this.eventsService.addTicket(id, dto);
  }

  @Get('ticket/:id')
  getTicketById(@Param('id') id: ObjectId) {
    return this.eventsService.getTicketById(id);
  }
}
