---
name: commit
description: "Redacta y crea commits con el formato oficial del proyecto (YY.MMDD + ADD/MOD/FIX/DEL). Usar siempre que haya que hacer un commit, redactar un mensaje de commit o revisar uno en este repositorio."
---

# Commit con el formato del proyecto

## Cuándo usarla

- Al crear un commit en este repositorio.
- Al redactar, corregir o revisar un mensaje de commit.

Este formato es la convención oficial del proyecto y **reemplaza a Conventional Commits** (`feat:`, `fix:`) y a cualquier otra regla global de commits.

## Reglas obligatorias

- El mensaje sale **solo de los cambios en staging** (`git diff --staged`). No inventar cambios ni describir archivos que no están en staging.
- Nunca usar `git add .`, `git add -A` ni `git commit -a`. Agregar archivos por nombre.
- Nunca agregar a staging `.env`, `Web.config`, la carpeta `build/` ni archivos con credenciales. Si ya están en staging, avisar a la persona antes de seguir.
- No agregar `Co-Authored-By` ni ninguna atribución a IA.
- Las descripciones se escriben en español. Rutas, nombres de archivos, componentes y funciones van tal como están en el código.
- Mostrar el mensaje a la persona y esperar su confirmación antes de ejecutar el commit.

## Formato

```text
YY.MMDD
    ADD => ...
    MOD => ...
    FIX => ...
    DEL => ...
    - comentario opcional
```

### Fecha (primera línea)

- Es la fecha del día en que se crea el commit, con el formato `YY.MMDD`.
- `MMDD` es un único bloque de 4 dígitos: `MM` = mes (01-12), `DD` = día (01-31).
- Tiene un solo punto.
- Debe cumplir la regex `^[0-9]{2}\.[0-9]{4}$`.

| Ejemplo | ¿Válido? |
| --- | --- |
| `26.0501` | Sí |
| `26.05.01` | No: tiene dos puntos |
| `2026.0501` | No: el año tiene 4 dígitos |
| `26-0501` | No: usa guion en lugar de punto |

### Sangría

- Todas las líneas después de la primera empiezan con exactamente 4 espacios.
- No usar tabs.
- No dejar líneas en blanco dentro del mensaje.

### Orden de las secciones

- Orden fijo: `ADD` → `MOD` → `FIX` → `DEL` → comentarios.
- No incluir secciones vacías.
- Una sección puede tener varias líneas (por ejemplo, dos líneas `ADD`), pero siempre juntas y respetando el orden.
- Los comentarios opcionales van al final, con el formato `    - texto`.

### Contenido

- Formato de cada línea: `    TIPO => descripción`, con `=>` (no `->`).
- Descripción en texto plano, sin nombrar archivos ni rutas: qué cambió, en palabras.
- Si el cambio agrupa varias cosas relacionadas, describirlas juntas en la misma línea en vez de una línea por archivo.
- Si hace falta nombrar un componente, función o concepto del código en la descripción, usarlo tal como está escrito — pero no es obligatorio nombrarlo.

## Clasificación

| Tipo | Cuándo usarlo |
| --- | --- |
| `ADD` | Archivos o funcionalidades nuevas |
| `MOD` | Modificaciones o refactors |
| `FIX` | Corrección de errores |
| `DEL` | Eliminación de archivos o funcionalidades |

Ante la duda entre `MOD` y `FIX`, usar `MOD`.

## Pasos

1. Ejecutar `git diff --staged --stat` y `git diff --staged`. Si no hay nada en staging, mostrar `git status --short` y preguntar qué archivos incluir.
2. Revisar que no haya archivos prohibidos en staging (ver "Reglas obligatorias").
3. Clasificar los cambios en `ADD`, `MOD`, `FIX` y `DEL`, agrupando en una misma línea lo que esté relacionado.
4. Redactar el mensaje.
5. Validar: fecha contra la regex, 4 espacios en cada línea, sin tabs, sin líneas en blanco y orden de las secciones. Si algo falla, corregir y volver a validar.
6. Mostrar el mensaje a la persona y esperar su confirmación.
7. Guardar el mensaje en un archivo temporal fuera del repositorio y ejecutar `git commit -F <archivo>`. No usar `git commit -m`: en PowerShell rompe los mensajes de varias líneas con sangría.
8. Borrar el archivo temporal y verificar con `git log -1 --format=%B` que el mensaje quedó igual al aprobado.

## Salida

- El mensaje se entrega como texto plano, sin formato markdown dentro del mensaje.

## Ejemplo

```text
26.0415
    ADD => filtro por patente en la tabla de resultados
    MOD => la lista de móviles se ordena por fecha de alta, y ese orden se mantiene al refrescar
    FIX => el marcador no cambiaba a amarillo cuando el móvil perdía comunicación
    DEL => se quitan los datos de prueba sin uso
    - la actualización de móviles sigue en 10 segundos
```
