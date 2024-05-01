import {
  COMMAND_COORDS,
  COMMAND_RESPAWN,
  // COMMAND_TIME,
  COMMAND_TP,
} from "./config";
import { coords } from "./features/coords";
import { respawn } from "./features/respawn";
// import { time } from "./features/time";
import { tp } from "./features/tp";

RegisterCommand(COMMAND_COORDS, coords, false);
RegisterCommand(COMMAND_RESPAWN, respawn, false);
// RegisterCommand(COMMAND_TIME, time, false);
RegisterCommand(COMMAND_TP, tp, false);
