import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Events, EventsSchema } from './schemas/events.schema';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { Tickets, TicketsSchema } from 'src/events/schemas/tickets.schema';
import { FileService } from 'src/file/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Events.name, schema: EventsSchema }]),
    MongooseModule.forFeature([{ name: Tickets.name, schema: TicketsSchema }]),
  ],
  controllers: [EventsController],
  providers: [EventsService, FileService],
})
export class EventsModule {}
