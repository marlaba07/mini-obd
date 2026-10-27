import { readFileSync } from 'node:fs';

const manual = JSON.parse(readFileSync(new URL('./data/manual.json', import.meta.url), 'utf8'));

/**
 * @param {{ vehicleId: string, codes: string[] }} input
 * @returns {{
 *   vehicle: string,
 *   codes: { code: string, description: string }[],
 *   notFound: string[],
 *   causes: {
 *     id: string, title: string, component: string, probability: number,
 *     codes: string[], steps: { text: string, expected: string }[]
 *   }[]
 * }}
 */
export function diagnose({ vehicleId, codes }) {
  const vehicle = manual.vehicles.find((v) => v.id === vehicleId);
  if (!vehicle) throw new Error(`Vehículo desconocido: ${vehicleId}`);

  const known = new Map(Object.entries(vehicle.codes).map(([k, v]) => [normalize(k), v]));
  const requested = [...new Set(codes.map(normalize))].sort();

  const found = requested.filter((c) => known.has(c));
  const notFound = requested.filter((c) => !known.has(c));

  // Causa compartida: una sola entrada; probabilidad = unión de eventos
  // independientes, 1 - Π(1 - p). La independencia es un supuesto.
  const byCause = new Map();
  for (const code of found) {
    for (const { cause, probability } of known.get(code).causes) {
      const acc = byCause.get(cause) ?? { codes: [], miss: 1 };
      acc.codes.push(code);
      acc.miss *= 1 - probability;
      byCause.set(cause, acc);
    }
  }

  // Una causa referenciada pero sin definir se informa igual, sin inventar datos.
  const causes = [...byCause].map(([id, { codes: causeCodes, miss }]) => {
    const def = vehicle.causes[id];
    return {
      id,
      title: def?.title ?? id,
      component: def?.component ?? id,
      probability: round(1 - miss),
      codes: causeCodes,
      steps: def?.steps ?? [],
    };
  });
  causes.sort((a, b) => b.probability - a.probability || (a.id.localeCompare(b.id)));

  return {
    vehicle: vehicle.name,
    codes: found.map((code) => ({ code, description: known.get(code).description })),
    notFound,
    causes,
  };
}

const normalize = (code) => String(code).trim().toUpperCase();
const round = (n) => Math.round(n * 1e6) / 1e6;
