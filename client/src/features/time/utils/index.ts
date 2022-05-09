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

function formatHours(input?: string) {
  return input ? parseInt(input) : DEFAULT_HOUR_OF_DAY;
}

function formatMinutes(input?: string) {
  return input ? parseInt(input) : 0;
}

function formatSeconds(input?: string) {
  return input ? parseInt(input) : 0;
}

export function formatTime(args: (string | undefined)[]): Vector3Tuple {
  const [inputHours, inputMinutes, inputSeconds] = args;
  const hours = formatHours(inputHours);
  const minutes = formatMinutes(inputMinutes);
  const seconds = formatSeconds(inputSeconds);
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
