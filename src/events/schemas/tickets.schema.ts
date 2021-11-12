import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Event } from 'src/events/schemas/events.schema';
import * as mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TicketsDocument = Ticket & Document;

@Schema()
export class Ticket {
  @ApiProperty({ type: () => Event })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Event' })
  event: Event;

  @Prop()
  @ApiProperty({ type: String })
  first_name: string;

  @Prop()
  @ApiProperty({ type: String })
  second_name: string;
}

export const TicketsSchema = SchemaFactory.createForClass(Ticket);
