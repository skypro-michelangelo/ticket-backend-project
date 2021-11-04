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
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { ArchiveEventDto } from './dto/archive-event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';
import { Event } from './schemas/events.schema';
import { Ticket } from './schemas/tickets.schema';

@Api Tags('events')
@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Post('create')
  @ApiBody({ type: CreateEventDto })
  @ApiResponse({ status: 200, description: 'create event', type: Event })
  @UseInterceptors(FileFieldsInterceptor([{ name: 'picture', maxCount: 1 }]))
  create(@UploadedFiles() files, @Body() dto: CreateEventDto): Promise<Event> {
    const { picture } = files;
    return this.eventsService.create(dto, picture[0]);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'get all events', type: [Event] })
  getAll(
    @Query('count') count: number,
    @Query('offset') offset: number,
  ): Promise<Event[]> {
    return this.eventsService.getAll(count, offset);
  }

  @Get(':id')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'get event by id', type: Event })
  @ApiResponse({ status: 404, description: 'event not found' })
  getOne(@Param('id') id: ObjectId): Promise<Event> {
    return this.eventsService.getOne(id);
  }

  @Put(':id/update')
  @ApiParam({ name: 'id', required: true })
  @ApiBody({ type: UpdateEventDto })
  @ApiResponse({
    status: 200,
    description: 'update event',
    type: Event,
  })
  update(
    @Body() dto: UpdateEventDto,
    @Param('id') id: ObjectId,
  ): Promise<Event> {
    return this.eventsService.update(id, dto);
  }

  @Delete(':id/delete')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: 'delete event',
  })
  delete(@Param('id') id: ObjectId): Promise<Event> {
    return this.eventsService.delete(id);
  }

  @Put(':id/in_archive')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'archive event', type: Event })
  archive(
    @Body() dto: ArchiveEventDto,
    @Param('id') id: ObjectId,
  ): Promise<Event> {
    return this.eventsService.archive(id, dto);
  }

  @Get(':id/ticket')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({
    status: 200,
    description: 'get tickets by event id',
    type: Number,
  })
  @ApiResponse({
    status: 404,
    description: 'tickets are out',
  })
  getTickets(@Param('id') id: ObjectId): Promise<object> {
    return this.eventsService.getNumberTickets(id);
  }

  @Post(':id/ticket/buy')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'create ticket', type: Ticket })
  addTicket(@Param('id') id: ObjectId): Promise<Ticket> {
    return this.eventsService.addTicket(id);
  }

  @Get('ticket/:id/validate')
  @ApiParam({ name: 'id', required: true })
  @ApiResponse({ status: 200, description: 'get ticket by id', type: Ticket })
  @ApiResponse({ status: 404, description: 'ticket not found' })
  getTicket(@Param('id') id: ObjectId): Promise<object> {
    return this.eventsService.getTicketById(id);
  }
}
