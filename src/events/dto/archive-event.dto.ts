import { ApiProperty } from '@nestjs/swagger';

export class ArchiveEventDto {
  @ApiProperty()
  in_archive: boolean;
}
