import {
  DEFAULT_HOUR_OF_DAY,
  INVALID_HOURS,
  INVALID_MINUTES,
  INVALID_SECONDS,
  TIME_ERROR_HOURS_TEXT,
  TIME_ERROR_MINUTES_TEXT,
  TIME_ERROR_SECONDS_TEXT,
} from "../config";
import { ErrorTypes, Vector3Tuple } from "../types";

function parseHours(input?: string) {
  return input ? parseInt(input) : DEFAULT_HOUR_OF_DAY;
}

function parseMinutes(input?: string) {
  return input ? parseInt(input) : 0;
}

function parseSeconds(input?: string) {
  return input ? parseInt(input) : 0;
}

export function parseArgs(args: (string | undefined)[]): Vector3Tuple {
  const [inputHours, inputMinutes, inputSeconds] = args;
  const hours = parseHours(inputHours);
  const minutes = parseMinutes(inputMinutes);
  const seconds = parseSeconds(inputSeconds);
  return [hours, minutes, seconds];
}

export function handleError(type: ErrorTypes) {
  switch (type) {
    case INVALID_HOURS:
      return console.log(TIME_ERROR_HOURS_TEXT);
    case INVALID_MINUTES:
      return console.log(TIME_ERROR_MINUTES_TEXT);
    case INVALID_SECONDS:
      return console.log(TIME_ERROR_SECONDS_TEXT);
    default:
      throw new Error("invalid error type in time");
  }
}
