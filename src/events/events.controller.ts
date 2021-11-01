import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';
import { Events } from './schemas/events.schema';

@Controller('events')
export class EventsController {
  constructor(private eventsService: EventsService) {}

  @Get()
  getAll(): Promise<Events[]> {
    return this.eventsService.getAllEvents();
  }

  @Get(':id')
  get(@Param('id') id: string): Promise<Events> {
    return this.eventsService.getEvent(id);
  }

  @Post('create')
  create(@Body() eventDto: CreateEventDto): Promise<Events> {
    return this.eventsService.createEvent(eventDto);
  }

  @Put('update/:id')
  update(
    @Body() updateDto: UpdateEventDto,
    @Param('id') id: string,
  ): Promise<Events> {
    return this.eventsService.update(id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Events> {
    return this.eventsService.remove(id);
  }
}
