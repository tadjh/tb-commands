import {
  DEFAULT_TIME_OF_DAY,
  TIME_ERROR_HOURS_TEXT,
  TIME_ERROR_MINUTES_TEXT,
  TIME_ERROR_SECONDS_TEXT,
} from "../../constants";
import { debugDATA } from "../../utils";

/**
 * Change time of day to Daytime or input an specific hour of day
 * @param source The source
 * @param args The args
 * @param rawCommand The raw command entered
 * @returns void
 */
export const time = (
  source: number,
  [inputHours, inputMinutes, inputSeconds]: [string, string, string]
) => {
  const hours = inputHours ? parseInt(inputHours) : DEFAULT_TIME_OF_DAY;
  const minutes = inputMinutes ? parseInt(inputMinutes) : 0;
  const seconds = inputSeconds ? parseInt(inputSeconds) : 0;

  if (hours < 0 || hours > 23) return console.log(TIME_ERROR_HOURS_TEXT);
  if (minutes < 0 || minutes > 60) return console.log(TIME_ERROR_MINUTES_TEXT);
  if (seconds < 0 || seconds > 60) return console.log(TIME_ERROR_SECONDS_TEXT);

  NetworkOverrideClockTime(hours, minutes, seconds);

  debugDATA(
    `Time set to ${hours} hours, ${minutes} minutes and ${seconds} seconds.`
  );
};
