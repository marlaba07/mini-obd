# Decisiones

**Tiempo que tardé: 45m / 1h**

## Causa compartida entre dos códigos

Muestro la causa una sola vez, con todos los códigos que apuntan a ella (sin repetir y ordenados). 
Su probabilidad es la unión `1 − Π(1 − pᵢ)`: cada código cuenta como evidencia a favor, así que una causa respaldada por dos códigos sube de posición, y el resultado nunca pasa de 1. Por ejemplo, `bujias` en el Tiggo con P0300 (0,4) y P0301 (0,3) da 0,58. 
Descarté el máximo porque ignora la evidencia del segundo código, y la suma porque puede superar 1. 
El manual no dice que los códigos sean independientes: es un supuesto mío.

## Otros supuestos

- Los códigos se normalizan (espacios y mayúsculas) y los repetidos se juntan. 
  Devuelvo el código canónico y ordenado, para que el resultado no dependa del orden de entrada. 
  El manual del Golf trae la clave `"P0420 "` con un espacio y la tuve que absorber.
- Si dos causas empatan, desempato por id y redondeo la probabilidad a 6 decimales.
- El resultado no comparte referencias con el manual, así que modificarlo no afecta a las llamadas siguientes.
- No agregué validación de argumentos inválidos porque el enunciado no la pide.

## Dónde se equivocó la IA (o casi)

Durante el proceso, la IA avanzó con la implementación antes de completar todas las etapas de análisis y aprobación previstas. 
Por eso tuve que redirigir el trabajo para mantener el proceso por etapas.

## Qué haría con más tiempo

Contrastar con datos reales si la independencia entre códigos es razonable.
También mejoraría la forma de informar las causas que no tienen una definición completa en el manual, para advertir al mecánico que no hay pasos de diagnóstico disponibles.
