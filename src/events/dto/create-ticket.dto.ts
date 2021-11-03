import { ObjectId } from 'mongoose';

export class CreateTicketDto {
  readonly eventId: ObjectId;
}
