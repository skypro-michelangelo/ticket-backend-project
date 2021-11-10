import { ApiProperty } from '@nestjs/swagger';

export class CreateTicketDto {
  @ApiProperty()
  readonly number: number;
  @ApiProperty()
  readonly first_name: string;
  @ApiProperty()
  readonly second_name: string;
}
