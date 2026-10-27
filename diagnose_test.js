import { test } from 'node:test';
import assert from 'node:assert/strict';
import { diagnose } from './diagnose.js';

test('devuelve las causas de un código, de la más a la menos probable', () => {
  const r = diagnose({ vehicleId: 'tiggo4-15t', codes: ['P0301'] });
  assert.deepEqual(r.causes.map((c) => c.id), ['bobina-cil1', 'bujias', 'inyector-cil1']);
});

test('respeta el formato de la respuesta', () => {
  const r = diagnose({ vehicleId: 'tiggo4-15t', codes: ['P0301'] });
  assert.equal(r.vehicle, 'Chery Tiggo 4 Pro 1.5T');
  assert.deepEqual(r.codes, [{ code: 'P0301', description: 'Fallo de encendido en el cilindro 1' }]);
  assert.deepEqual(r.notFound, []);
  assert.deepEqual(r.causes[0], {
    id: 'bobina-cil1',
    title: 'Bobina de encendido del cilindro 1 averiada',
    component: 'Bobina de encendido cil. 1',
    probability: 0.45,
    codes: ['P0301'],
    steps: [
      { text: 'Intercambiar la bobina del cilindro 1 con la del 2 y borrar los códigos', expected: 'Si la bobina es la causa, el fallo pasa a P0302' },
      { text: 'Medir la resistencia del primario', expected: '0,5–0,8 Ω' },
    ],
  });
});

test('un vehículo que no existe es un error', () => {
  assert.throws(() => diagnose({ vehicleId: 'no-existe', codes: ['P0300'] }));
});

test('un código que no está en el manual va a notFound', () => {
  const r = diagnose({ vehicleId: 'tiggo4-15t', codes: ['P0301', 'P9999'] });
  assert.deepEqual(r.notFound, ['P9999']);
  assert.deepEqual(r.codes.map((c) => c.code), ['P0301']);
});

test('causa compartida: una sola entrada, todos sus códigos y probabilidad por unión', () => {
  const r = diagnose({ vehicleId: 'tiggo4-15t', codes: ['P0300', 'P0301'] });
  const bujias = r.causes.filter((c) => c.id === 'bujias');
  assert.equal(bujias.length, 1);
  assert.deepEqual(bujias[0].codes, ['P0300', 'P0301']);
  assert.equal(bujias[0].probability, 0.58); // 1 - (1-0.4)(1-0.3)
  assert.ok(r.causes.every((c) => c.probability >= 0 && c.probability <= 1));
});

test('las causas salen ordenadas de mayor a menor probabilidad', () => {
  const r = diagnose({ vehicleId: 'tiggo4-15t', codes: ['P0300', 'P0301'] });
  const ps = r.causes.map((c) => c.probability);
  assert.deepEqual(ps, [...ps].sort((a, b) => b - a));
});

test('el resultado no depende del orden de los códigos', () => {
  const a = diagnose({ vehicleId: 'tiggo4-15t', codes: ['P0300', 'P0301', 'X1'] });
  const b = diagnose({ vehicleId: 'tiggo4-15t', codes: ['X1', 'P0301', 'P0300'] });
  assert.deepEqual(a, b);
});

test('códigos repetidos, en minúsculas o con espacios se normalizan', () => {
  const a = diagnose({ vehicleId: 'tiggo4-15t', codes: ['P0301'] });
  const b = diagnose({ vehicleId: 'tiggo4-15t', codes: [' p0301 ', 'P0301'] });
  assert.deepEqual(a, b);
});

test('la clave "P0420 " del Golf (con espacio) se encuentra como P0420', () => {
  const r = diagnose({ vehicleId: 'golf7-14tsi', codes: ['P0420'] });
  assert.deepEqual(r.notFound, []);
  assert.deepEqual(r.codes.map((c) => c.code), ['P0420']);
  assert.equal(r.causes[0].id, 'catalizador');
});

test('las causas se resuelven con el vehículo pedido', () => {
  const r = diagnose({ vehicleId: 'golf7-14tsi', codes: ['P0171'] });
  assert.equal(r.causes.find((c) => c.id === 'toma-aire').title, 'Fuga de vacío en el tubo de la válvula PCV');
});

test('sin códigos devuelve el vehículo y listas vacías', () => {
  const r = diagnose({ vehicleId: 'clio4-15dci', codes: [] });
  assert.deepEqual(r, { vehicle: 'Renault Clio IV 1.5 dCi', codes: [], notFound: [], causes: [] });
});
