/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Events } from 'src/events/schemas/events.schema';
import * as mongoose from 'mongoose';

export type TicketsDocument = Tickets & Document;

@Schema()
export class Tickets {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Events' })
  event: Events;
}

export const TicketsSchema = SchemaFactory.createForClass(Tickets);
