export type SeatType = "walk" | "none" | "instant";

export interface Options {
  SEAT_INTO_CAR: SeatType;
  preset: string | number;
}
