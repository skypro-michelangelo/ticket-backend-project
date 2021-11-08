import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly date: string;
  @ApiProperty()
  readonly time: string;
  @ApiProperty()
  readonly tickets_number: number;
  @ApiProperty()
  readonly status: string;
}
