import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Ticket, TicketsDocument } from 'src/events/schemas/tickets.schema';
import { FileService, FileType } from 'src/file/file.service';
import { ArchiveEventDto } from './dto/archive-event.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event, EventsDocument } from './schemas/events.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Event.name) private eventsModel: Model<EventsDocument>,
    @InjectModel(Ticket.name) private ticketsModel: Model<TicketsDocument>,
    private fileService: FileService,
  ) {}

  async create(createDto: CreateEventDto, picture): Promise<Event> {
    const picturePath = this.fileService.createFile(FileType.IMAGE, picture);
    const event = await this.eventsModel.create({
      ...createDto,
      picture: picturePath,
    });
    return event;
  }

  async getAll(count = 10, offset = 0): Promise<Event[]> {
    const events = await this.eventsModel
      .find()
      .skip(Number(offset))
      .limit(Number(count));
    return events;
  }

  async getOne(id: ObjectId): Promise<Event> {
    const event = await this.eventsModel.findById(id);
    if (!event) {
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }
    return event;
  }

  async archive(id: ObjectId, archiveDto: ArchiveEventDto): Promise<Event> {
    archiveDto.in_archive = true;
    await this.eventsModel.findByIdAndUpdate(id, archiveDto, {
      new: true,
    });

    const event = await this.eventsModel.findOne();
    return event;
  }

  async update(id: ObjectId, updateDto: UpdateEventDto): Promise<Event> {
    const event = this.eventsModel.findByIdAndUpdate(id, updateDto, {
      new: true,
    });
    return event;
  }

  async delete(id: ObjectId): Promise<Event> {
    const event = await this.eventsModel.findByIdAndDelete(id);
    return event._id;
  }

  async getNumberTickets(id: ObjectId): Promise<object> {
    const event = await this.eventsModel.findById(id);

    if (event.tickets_number <= 0) {
      throw new HttpException('Tickets are out', HttpStatus.NOT_FOUND);
    }
    return {
      statusCode: HttpStatus.OK,
      tickets_left: event.tickets_number,
    };
  }

  async addTicket(id: ObjectId): Promise<Ticket> {
    const event = await this.eventsModel.findById(id);

    const ticket = await this.ticketsModel.create({ event: event });
    event.tickets.push(ticket._id);
    event.tickets_number -= 1;

    await event.save();
    return ticket;
  }

  async getTicketById(id: ObjectId): Promise<object> {
    const ticket = await this.ticketsModel.findById(id);
    if (!ticket) {
      throw new HttpException('Ticket not found', HttpStatus.NOT_FOUND);
    }

    const event = await this.eventsModel.findById(ticket.event);
    console.log(ticket);

    return { ticket, event };
  }
}
