import {
  COMMAND_CAR,
  COMMAND_COORDS,
  COMMAND_PED,
  COMMAND_RESPAWN,
  COMMAND_TIME,
  COMMAND_TP,
} from "./config";
import { vehicle, SpawnPlayerInVehicle } from "./features/vehicle";
import { coords } from "./features/coords";
import { ped, SetPedModel } from "./features/ped";
import { respawn } from "./features/respawn";
import { time } from "./features/time";
import { tp } from "./features/tp";

RegisterCommand(COMMAND_COORDS, coords, false);
RegisterCommand(COMMAND_CAR, vehicle, false);
RegisterCommand(COMMAND_PED, ped, false);
RegisterCommand(COMMAND_RESPAWN, respawn, false);
RegisterCommand(COMMAND_TIME, time, false);
RegisterCommand(COMMAND_TP, tp, false);

globalThis.exports("SpawnPlayerInCar", SpawnPlayerInVehicle);
globalThis.exports("SetPedModel", SetPedModel);
