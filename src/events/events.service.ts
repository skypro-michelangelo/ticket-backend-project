import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Events, EventsDocument } from './schemas/events.schema';

@Injectable()
export class EventsService {
  constructor(
    @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
  ) {}

  async getAllEvents(): Promise<Events[]> {
    return this.eventsModel.find();
  }

  async getEvent(id): Promise<Events> {
    return this.eventsModel.findById(id);
  }

  async createEvent(createDto: CreateEventDto): Promise<Events> {
    const newEvent = new this.eventsModel(createDto);
    return newEvent.save();
  }

  async update(id, updateDto: UpdateEventDto): Promise<Events> {
    return this.eventsModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async remove(id) {
    return this.eventsModel.findByIdAndRemove(id);
  }
}
