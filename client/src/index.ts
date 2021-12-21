import {
  COMMAND_CAR,
  COMMAND_COORDS,
  COMMAND_PED,
  COMMAND_TIME,
  COMMAND_TP,
} from "./constants";
import { car } from "./features/car";
import { coords } from "./features/coords";
import { ped } from "./features/ped";
import { teleport } from "./features/teleport";
import { time } from "./features/time";

RegisterCommand(COMMAND_CAR, car, false);
RegisterCommand(COMMAND_COORDS, coords, false);
RegisterCommand(COMMAND_PED, ped, false);
RegisterCommand(COMMAND_TP, teleport, false);
RegisterCommand(COMMAND_TIME, time, false);
