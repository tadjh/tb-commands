/**
 * Gets the ped's current coordinates and heading
 * @param _source The source (unused)
 * @returns void
 */
export function coords(_source: number, args: string[] | []) {
  let entity = PlayerPedId();
  let coords = GetEntityCoords(entity, true) as Vector3;

  const parsed = parseArgs(args);
  if (parsed.flags.los) {
    coords = getEntityLookAt(entity);
  } else if (parsed.flags.cam) {
    coords = getLookAtCoord();
  }

  const archetypeName = GetEntityArchetypeName(entity);
  const heading = GetEntityHeading(entity);
  const output = formatString(parsed, heading, archetypeName, coords);
  // fs.writeFileSync("coords.txt", output);
  console.log(output);
}

interface ParsedArgs {
  verb: string;
  name?: string;
  flags: {
    ts?: boolean;
    json?: boolean;
    array?: boolean;
    los?: boolean;
    cam?: boolean;
  };
}

function parseArgs(input: string[]) {
  const parsed: ParsedArgs = {
    verb: "spawnpoint",
    flags: {},
  };

  if (!input.length) return parsed;

  const location = [];

  for (let i = 0; i < input.length; i++) {
    const arg = input[i];

    if (arg.startsWith("--")) {
      arg
        .slice(1)
        .split("")
        .forEach((flag) => {
          if (flag === "json" || flag === "ts" || flag === "array") {
            parsed.flags[flag as keyof ParsedArgs["flags"]] = true;
          } else if (flag === "los" || flag === "cam") {
            parsed.flags[flag] = true;
          } else {
            throw new Error(`Invalid flag: -${flag}`);
          }
        });
    } else if (typeof arg === "string") {
      location.push(arg);
    }
  }

  parsed.name = location.join(" ");
  return parsed;
}

function formatString(
  { verb, flags, name }: ParsedArgs,
  heading: number,
  archetypeName: string,
  [x, y, z]: [number, number, number]
) {
  switch (true) {
    case flags.array:
      return `[${x}, ${y}, ${z}]`;
    case flags.json:
      return JSON.stringify(
        {
          coords: { x, y, z },
          heading,
        },
        null,
        1
      ).replace(/\n\s+/g, " ");
    default:
      // output for map files
      let c: "--" | "//" = "--";
      let o: ":" | " =" = " =";

      if (flags.ts) {
        c = "//";
        o = ":";
      }

      let output = [];

      output.push(verb);
      output.push(`'${archetypeName}'`);
      output.push("{", `x${o}`, x, `, y${o}`, y, `, z${o}`, z, "}");
      output.push(c, `heading${o}`, heading);

      if (name) {
        output.push(`name${o}`, name);
      }

      return output.join(" ");
  }
}

// Define Vector3 as a tuple [number, number, number].
type Vector3 = [number, number, number];

// Helper functions for vector arithmetic.
function addVectors(v1: Vector3, v2: Vector3): Vector3 {
  return [v1[0] + v2[0], v1[1] + v2[1], v1[2] + v2[2]];
}

function scaleVector(v: Vector3, scalar: number): Vector3 {
  return [v[0] * scalar, v[1] * scalar, v[2] * scalar];
}

// Converts degrees to radians.
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Convert a rotation (in degrees) to a normalized direction vector.
function rotationToDirection(rotation: Vector3): Vector3 {
  const radZ = toRadians(rotation[2]);
  const radX = toRadians(rotation[0]);
  const absX = Math.abs(Math.cos(radX));

  return [-Math.sin(radZ) * absX, Math.cos(radZ) * absX, Math.sin(radX)];
}

// This function performs a raycast from the gameplay camera's position
// along its forward direction and returns the hit coordinate (if any),
// or a point far out along that direction if nothing is hit.
function getLookAtCoord(): Vector3 {
  // Retrieve the camera's current position and rotation.
  // These native functions are assumed to be available in the FiveM environment.
  const camCoord = GetGameplayCamCoord() as Vector3;
  const camRot = GetGameplayCamRot(2) as Vector3; // '2' typically denotes the correct rotation order

  // Calculate the forward direction vector based on the camera's rotation.
  const forwardVector = rotationToDirection(camRot);

  // Define a distance (in world units) for the raycast endpoint.
  const distance = 1000.0;
  const destination = addVectors(
    camCoord,
    scaleVector(forwardVector, distance)
  );

  // Initiate a raycast (shape test) from the camera position to the destination.
  // The parameters are: startX, startY, startZ, endX, endY, endZ, flags, ignoreEntity, and an extra flag.
  const rayHandle = StartShapeTestRay(
    camCoord[0],
    camCoord[1],
    camCoord[2],
    destination[0],
    destination[1],
    destination[2],
    10, // flag (e.g., 10 to filter certain collision types)
    PlayerPedId(), // Ignore the player ped (if needed)
    0 // Additional flag, usually set to 0
  );

  // Retrieve the results of the raycast.
  // The native returns a tuple: [result, hit, hitCoords, surfaceNormal, entityHit]
  const [result, hit, hitCoords] = GetShapeTestResult(rayHandle) as [
    number,
    boolean,
    Vector3,
    any,
    any
  ];

  // If the raycast hit something, return the hit coordinates; otherwise, return the destination.
  return hit ? hitCoords : destination;
}

function getEntityLookAt(ped: number) {
  const target = GetEntityForwardVector(ped) as Vector3;
  const [x, y, z] = GetEntityCoords(ped, true);
  const end = [x + target[0], y + target[1], z + target[2]];

  const ray = StartShapeTestRay(x, y, z, end[0], end[1], end[2], 1, ped, 0);
  const [_handle, hit, _endCoords, _normal, detectedEntity] =
    GetShapeTestResult(ray);

  if (hit) {
    return GetEntityCoords(detectedEntity, true) as Vector3;
  } else {
    throw new Error("No line of sight");
  }
}
