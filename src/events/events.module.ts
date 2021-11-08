import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Event, EventsSchema } from './schemas/events.schema';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Ticket, TicketsSchema } from 'src/events/schemas/tickets.schema';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Event.name, schema: EventsSchema },
      { name: Ticket.name, schema: TicketsSchema },
    ]),
  ],
  controllers: [EventsController],
  providers: [EventsService, FileService],
})
export class EventsModule {}
