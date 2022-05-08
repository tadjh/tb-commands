import {
  COMMAND_CAR,
  COMMAND_COORDS,
  COMMAND_RESPAWN,
  COMMAND_TIME,
  COMMAND_TP,
import { car, coords, respawn, time, tp } from "./features";
} from "./config";

RegisterCommand(COMMAND_COORDS, coords, false);
RegisterCommand(COMMAND_CAR, car, false);
RegisterCommand(COMMAND_RESPAWN, respawn, false);
RegisterCommand(COMMAND_TIME, time, false);
RegisterCommand(COMMAND_TP, tp, false);

globalThis.exports("car", car);
globalThis.exports("time", time);
globalThis.exports("tp", tp);
