import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const publicDir = path.resolve(process.cwd(), "public");
const sourcePath = path.join(publicDir, "logdata.json");
const outputPath = path.join(publicDir, "logdata.callsign-3gram-index.json");

function normalizeCallsign(value) {
  return typeof value === "string" ? value.trim().toUpperCase() : "";
}

function buildTrigrams(value) {
  if (value.length < 3) {
    return [];
  }

  const grams = new Set();
  for (let index = 0; index <= value.length - 3; index += 1) {
    grams.add(value.slice(index, index + 3));
  }

  return Array.from(grams);
}

const payload = JSON.parse(await readFile(sourcePath, "utf8"));
const records = Array.isArray(payload.records) ? payload.records : [];
const grams = new Map();

records.forEach((record, recordIndex) => {
  const callsign = normalizeCallsign(record?.call);
  for (const gram of buildTrigrams(callsign)) {
    const existing = grams.get(gram);
    if (existing) {
      existing.push(recordIndex);
    } else {
      grams.set(gram, [recordIndex]);
    }
  }
});

const output = {
  version: 1,
  source: "logdata.json",
  field: "call",
  normalization: "trim-uppercase",
  gramSize: 3,
  recordCount: records.length,
  grams: Object.fromEntries(
    Array.from(grams.entries()).sort(([left], [right]) => left.localeCompare(right))
  ),
};

await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, "utf8");
console.log(`Wrote ${path.relative(process.cwd(), outputPath)} with ${grams.size} trigrams.`);
