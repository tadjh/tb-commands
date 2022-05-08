import {
  DEFAULT_TIME_OF_DAY,
  TIME_ERROR_HOURS_TEXT,
  TIME_ERROR_MINUTES_TEXT,
  TIME_ERROR_SECONDS_TEXT,
} from "../../config";
import { debugDATA } from "../../utils";

/**
 * Sets the clock time
 * @param hours The hour (0 to 23)
 * @param minutes The number of minutes (0 to 59)
 * @param seconds The number of seconds (0 to 59)
 * @returns void
 */
const setTime = (hours: number, minutes: number, seconds: number) => {
  if (hours < 0 || hours > 23) return console.log(TIME_ERROR_HOURS_TEXT);
  if (minutes < 0 || minutes > 59) return console.log(TIME_ERROR_MINUTES_TEXT);
  if (seconds < 0 || seconds > 59) return console.log(TIME_ERROR_SECONDS_TEXT);

  NetworkOverrideClockTime(hours, minutes, seconds);

  debugDATA(
    `Time set to ${hours} hours, ${minutes} minutes and ${seconds} seconds.`
  );
};

/**
 * Change time of day to Daytime or input an specific hour of day
 * @param source The source
 * @param args The args
 * @returns void
 */
export const time = (source: number, args?: [string, string, string]) => {
  if (!args) return setTime(DEFAULT_TIME_OF_DAY, 0, 0);
  const [inputHours, inputMinutes, inputSeconds] = args;
  const hours = inputHours ? parseInt(inputHours) : DEFAULT_TIME_OF_DAY;
  const minutes = inputMinutes ? parseInt(inputMinutes) : 0;
  const seconds = inputSeconds ? parseInt(inputSeconds) : 0;
  setTime(hours, minutes, seconds);
};
