import { Vector3Tuple } from "../../types";
import { DEFAULT_SEAT, DEFAULT_VEHICLE } from "./config";
import { debugDATA, getArg, isEmpty, shouldRequestModel } from "./utils";

/**
 * Creates the vehicle and release it from memory
 * @param vehicleName The name of the vehicle to be spawned
 */
const spawn = (vehicleName: string) => {
  const ped = PlayerPedId();
  const pedCoords = GetEntityCoords(ped, true) as Vector3Tuple;
  const vehicle = CreateVehicle(
    vehicleName,
    ...pedCoords,
    GetEntityHeading(ped),
    true,
    false
  );
  SetPedIntoVehicle(ped, vehicle, DEFAULT_SEAT);
  SetEntityAsNoLongerNeeded(vehicle);
  SetModelAsNoLongerNeeded(vehicleName);
  debugDATA(`${vehicleName} spawned.`);
};

/**
 * Loads the vehicle into memory
 * @param vehicleName The vehicle name
 * @returns void
 */
const request = (vehicleName: string) => {
  if (!IsModelInCdimage(vehicleName) || !IsModelAVehicle(vehicleName)) return;
  RequestModel(vehicleName);

  const tick = setTick(() => {
    if (HasModelLoaded(vehicleName)) {
      spawn(vehicleName);
      clearTick(tick);
    }
    Wait(500);
  });
};

/**
 * Takes the given car and loads it
 * @param source The source
 * @param args The args
 * @returns void
 */
export const car = (source: number, args = []) => {
  if (args.length < 1) return request(DEFAULT_VEHICLE);
  const [vehicleName] = args;
  request(vehicleName);
};
