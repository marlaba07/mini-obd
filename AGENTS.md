# AGENTS.md

## Propósito
Mini-OBD: dado un vehículo y códigos de avería OBD, `diagnose({ vehicleId, codes })` devuelve las causas posibles de ese vehículo, de la más a la menos probable, con sus pasos de comprobación. El enunciado y las reglas de negocio están en `README.md`.

## Stack y estructura
- Node >=20, ESM, sin dependencias. No agregar ninguna sin pedido explícito.
- `diagnose.js`: la lógica. `diagnose_test.js`: tests. `data/manual.json`: datos de entrada.
- `DECISIONES.md`: decisiones de diseño del autor.

## Comandos
- `npm test` (equivale a `node --test`). Es la única verificación automática.

## Convenciones
- Función pura: sin I/O más allá de cargar el manual, sin estado global mutable.
- Resultado determinista: no depender del orden de los códigos; desempates explícitos.
- Los datos del manual no son confiables: normalizar claves y códigos (espacios, mayúsculas) y tolerar referencias sin definición, sin inventar información técnica.
- Tests con `node:test` y `node:assert/strict`, nombres descriptivos en español. Cada regla del README tiene al menos un test. Escribir el test que falla antes de implementar.
- Commits: seguir el formato definido en `.claude/commit/SKILL.md` (`YY.MMDD` + `ADD/MOD/FIX/DEL`). Sin atribución a IA.

## Cambios pequeños
- Una cosa por cambio; no refactorizar ni "mejorar" código fuera del alcance pedido.
- Sin abstracciones, clases ni configuración que el problema no requiera.
- Si una decisión de producto no está en el enunciado, preguntar antes de asumir.

## Gentle-AI y ODD
- El trabajo sigue Organic Driven Development: explorar antes de escribir, autorizar el cambio antes de modificar, tests primero cuando hay un runner aplicable.
- Un cambio chico y entendido se hace directo, sin tareas ni documentos de seguimiento.
- Solo el trabajo sustancial (2 o más pasos relevantes) lleva lista de tareas.
- Las instrucciones de Gentle-AI instaladas globalmente complementan este archivo; ante conflicto, prevalece lo que diga este archivo sobre el proyecto.

## Definición de terminado
- `npm test` pasa completo, con evidencia del resultado real.
- Todas las reglas del README están cubiertas y no se rompió el formato de respuesta.
- Solo cambiaron los archivos del alcance. Se informa qué quedó sin verificar.

## Restricciones
- No modificar `README.md` ni `data/manual.json`.
- `DECISIONES.md` lo redacta el autor con sus palabras; no completarlo sin pedido.
- No commitear `.DS_Store`, ni usar `git add .`/`-A`/`commit -a`; agregar archivos por nombre.
- No tocar el historial de sesiones de los agentes (se entrega sin editar).
- No hacer commit, push ni acciones destructivas sin pedido explícito.
