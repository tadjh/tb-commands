/**
 * Gets the ped's current coordinates and heading
 * @param _source The source (unused)
 * @returns void
 */
export function coords(_source: number, args: string[] | []) {
  const ped = PlayerPedId();
  const parsed = parseArgs(args);
  const heading = GetEntityHeading(ped);
  const archetypeName = GetEntityArchetypeName(ped);
  const coords = GetEntityCoords(ped, true) as [number, number, number];
  const output = formatString(parsed, heading, archetypeName, coords);
  // fs.writeFileSync("coords.txt", output);
  console.log(output);
}

interface ParsedArgs {
  verb: string;
  name?: string;
  flags: {
    t?: boolean;
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

    if (arg === "-t") {
      parsed.flags.t = true;
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
  let c: "--" | "//" = "--";
  let o: ":" | " =" = " =";

  if (flags.t) {
    c = "//";
    o = ":";
  }

  let output = [];

  output.push(verb);
  output.push(`'${archetypeName}'`);
  output.push("{", `x${o}`, x, `y${o}`, y, `z${o}`, z, "}");
  output.push(c, `heading${o}`, heading);

  if (name) {
    output.push(`name${o}`, name);
  }

  return output.join(" ");
}
