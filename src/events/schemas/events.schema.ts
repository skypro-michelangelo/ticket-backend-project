import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Tickets } from 'src/events/schemas/tickets.schema';
import * as mongoose from 'mongoose';
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
  tickets_number: number;

  @Prop()
  status: string;

  @Prop()
  in_archive: boolean;

  @Prop()
  picture: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tickets' }] })
  tickets: Tickets[];
}

export const EventsSchema = SchemaFactory.createForClass(Events);
