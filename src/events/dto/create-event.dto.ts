import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly date_time: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly location: string;
  @ApiProperty()
  readonly tickets_number: number;
  @ApiProperty()
  readonly type_event: string;
  @ApiProperty()
  readonly price: string;
}
