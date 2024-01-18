import {
  COMMAND_VEHICLE,
  COMMAND_COORDS,
  COMMAND_PED,
  COMMAND_RESPAWN,
  // COMMAND_TIME,
  COMMAND_TP,
} from "./config";
import { vehicle } from "./features/vehicle";
import { coords } from "./features/coords";
import { ped } from "./features/ped";
import { respawn } from "./features/respawn";
// import { time } from "./features/time";
import { tp } from "./features/tp";
import { SpawnVehicle } from "./features/vehicle/utils/natives";
import { SetPedModel } from "./features/ped/utils/natives";

RegisterCommand(COMMAND_COORDS, coords, false);
RegisterCommand(COMMAND_VEHICLE, vehicle, false);
RegisterCommand(COMMAND_PED, ped, false);
RegisterCommand(COMMAND_RESPAWN, respawn, false);
// RegisterCommand(COMMAND_TIME, time, false);
RegisterCommand(COMMAND_TP, tp, false);

globalThis.exports("SpawnVehicle", SpawnVehicle);
globalThis.exports("SetPedModel", SetPedModel);
