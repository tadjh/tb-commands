import {
  COMMAND_CAR,
  COMMAND_COORDS,
  COMMAND_PED,
  COMMAND_RESPAWN,
  COMMAND_TIME,
  COMMAND_TP,
} from "./constants";
import { car, coords, ped, respawn, time, tp } from "./features";

// Commands
RegisterCommand(COMMAND_COORDS, coords, false);
RegisterCommand(COMMAND_CAR, car, false);
RegisterCommand(COMMAND_PED, ped, false);
RegisterCommand(COMMAND_RESPAWN, respawn, false);
RegisterCommand(COMMAND_TIME, time, false);
RegisterCommand(COMMAND_TP, tp, false);

// Exports
globalThis.exports("car", car);
globalThis.exports("ped", ped);
globalThis.exports("time", time);
globalThis.exports("tp", tp);
