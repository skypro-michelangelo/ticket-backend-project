import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Ticket } from 'src/events/schemas/tickets.schema';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
export type EventsDocument = Event & Document;

@Schema()
export class Event {
  @Prop()
  @ApiProperty({ type: String })
  name: string;

  @Prop()
  @ApiProperty({ type: String })
  date_time: string;

  @Prop()
  @ApiProperty({ type: String })
  description: string;

  @Prop()
  @ApiProperty({ type: String })
  location: string;

  @Prop()
  @ApiProperty({ type: Number })
  tickets_number: number;

  @Prop()
  @ApiProperty({ type: String })
  type_event: string;

  @Prop()
  @ApiProperty({ type: String })
  price: string;

  @Prop()
  @ApiProperty({ type: String })
  picture: string;

  @Prop()
  @ApiProperty({ type: Boolean })
  in_archive: boolean;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tickets' }] })
  @ApiProperty({ type: () => [Ticket] })
  tickets: Ticket[];
}

export const EventsSchema = SchemaFactory.createForClass(Event);
