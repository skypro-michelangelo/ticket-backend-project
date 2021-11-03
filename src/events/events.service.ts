/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { CreateTicketDto } from 'src/events/dto/create-ticket.dto';
import { Tickets, TicketsDocument } from 'src/events/schemas/tickets.schema';
import { FileService, FileType } from 'src/file/file.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events, EventsDocument } from './schemas/events.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
    @InjectModel(Tickets.name) private ticketsModel: Model<TicketsDocument>,
    private fileService: FileService,
  ) {}

  async create(createDto: CreateEventDto, picture): Promise<Events> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const event = await this.eventsModel.create({
      ...createDto,
      picture: picturePath,
    });
    return event;
  }

  async getAll(count = 10, offset = 0): Promise<Events[]> {
    const events = await this.eventsModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return events;
  }

  async getOne(id: ObjectId): Promise<Events> {
    const event = await this.eventsModel.findById(id);
    return event;
  }

  async update(id: ObjectId, updateDto: UpdateEventDto): Promise<Events> {
    const event = this.eventsModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    return event;
  }

  async delete(id: ObjectId): Promise<Events> {
    const event = await this.eventsModel.findByIdAndDelete(id);
    return event._id;
  }

  async getTicket(id: ObjectId) {
    const event = await this.eventsModel.findById(id);
    if (event.tickets_number > 0) {
      return `Осталось билетов ${event.tickets_number}`;
    }
    return 'Билеты закончились';
  }

  async addTicket(dto: CreateTicketDto): Promise<Tickets> {
    const event = await this.eventsModel.findById(dto.eventId);
    console.log(event.tickets_number);
    event.tickets_number -= 1;
    await event.save();

    const ticket = await this.ticketsModel.create({ ...dto });
    event.tickets.push(ticket._id);
    await event.save();
    return ticket;
  }
}
