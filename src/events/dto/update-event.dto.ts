export class UpdateEventDto {
  readonly name: string;
  readonly date: string;
  readonly time: string;
  readonly tickets_number: number;
  readonly status: string;
  static tickets: number;
}
