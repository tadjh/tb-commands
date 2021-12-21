import { DEFAULT_SEAT, DEFAULT_VEHICLE, MAX_EXECUTION } from "../../constants";
import { Vector3Tuple } from "../../types";
import { debugDATA } from "../../utils";

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
 * Takes the given car and loads it
 * @param source The source
 * @param args The args
 * @param rawCommand The raw command entered
 * @returns void
 */
export const car = (source: number, [input]: [string]) => {
  const vehicleName = input || DEFAULT_VEHICLE;
  if (!IsModelInCdimage(vehicleName) || !IsModelAVehicle(vehicleName)) return;
  RequestModel(vehicleName);

  const startTime = Date.now();

  const tick = setTick(() => {
    if (HasModelLoaded(vehicleName)) {
      spawn(vehicleName);
      clearTick(tick);
    }
    if (Date.now() - startTime > MAX_EXECUTION) clearTick(tick);
    Wait(500);
  });
};
