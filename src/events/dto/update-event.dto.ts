import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto {
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
  @ApiProperty()
  static tickets: number;
}
