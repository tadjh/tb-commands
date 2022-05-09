import {
  DEFAULT_TIME_OF_DAY,
  INVALID_HOURS,
  INVALID_MINUTES,
  INVALID_SECONDS,
} from "./config";
import { debugDATA, isEmpty } from "../../utils";
import { Args } from "./types";
import { formatTime, handleError } from "./utils";

/**
 * Sets the clock time
 * @param hours The hour (0 to 23)
 * @param minutes The number of minutes (0 to 59)
 * @param seconds The number of seconds (0 to 59)
 * @returns void
 */
function setTime(hours: number, minutes: number, seconds: number) {
  if (hours < 0 || hours > 23) return handleError(INVALID_HOURS);
  if (minutes < 0 || minutes > 59) return handleError(INVALID_MINUTES);
  if (seconds < 0 || seconds > 59) return handleError(INVALID_SECONDS);

  NetworkOverrideClockTime(hours, minutes, seconds);

  debugDATA(
    `Time set to ${hours} hours, ${minutes} minutes and ${seconds} seconds.`
  );
}

function setDefault() {
  setTime(...DEFAULT_TIME_OF_DAY);
}

/**
 * Change time of day to Daytime or input an specific hour of day
 * @param _source The source (unused)
 * @param args The args
 * @returns void
 */
export function time(_source: number, args: Args) {
  if (isEmpty(args)) return setDefault();
  const nextTime = formatTime(args);
  setTime(...nextTime);
}
