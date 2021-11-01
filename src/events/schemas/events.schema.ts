import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventsDocument = Events & Document;

@Schema()
export class Events {
  @Prop()
  name: string;

  @Prop()
  date: string;

  @Prop()
  time: string;

  @Prop()
  tickets: number;

  @Prop()
  status: string;

  @Prop()
  in_archive: boolean;
}

export const EventsSchema = SchemaFactory.createForClass(Events);
