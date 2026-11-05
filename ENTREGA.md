# Entrega · Duelo de herramientas

**Equipo:** Equipo-3-E6
**Integrantes:** Jonathan Torres Monsalve
**Repositorio:** https://github.com/JhonnyTorres/Pruebas-Automatizadas--2
**Herramienta que nos tocó:** ☐ Selenium + Mocha &nbsp; ☒ Cypress &nbsp; ☐ Playwright + Cucumber
**Escenario que nos tocó:** E6 · Entidad Pública

Archivos que entregan, todos en el repositorio y con `git push`:

| Archivo | Quién lo escribe | Parte |
|---|---|---|
| `ENTREGA.md` (este) | ustedes | 1 a 6 |
| `autoinforme.json` | ustedes (minutos y diagnóstico) | 2 a 4 |
| `medidas.json` y `medidas-control.json` | los genera el medidor (`npm run medir`) | 4 |
| `MATRIZ.md` | ustedes | 5 |
| `ADR.md` | ustedes | 6 |
| Las pruebas de su kit (las tres historias) | ustedes | 1 a 3 |

---

## 1. Qué hace la herramienta por nosotros (Parte 1)

| Tarea | ¿Quién la hace? | ¿Dónde lo vemos? (archivo y línea) |
|---|---|---|
| Abrir el navegador y cerrarlo al terminar | La herramienta sola | No hay ninguna línea nuestra: lo hace `cypress run --browser chrome` (`package.json`, script `test`). |
| Esperar a que el elemento exista o se pueda usar | La herramienta sola | `duelo.cy.js` línea 5: `cy.get('h3')` espera solo, no escribimos ninguna espera. |
| Reintentar una comprobación que todavía no se cumple | La herramienta sola | `duelo.cy.js` línea 5: `.should('have.length', 8)` se reintenta hasta 4 s (lo dice el comentario de la línea 4). |
| Ejecutar las pruebas, contarlas y decir cuántas pasaron | La herramienta sola | `cypress.config.js` (`specPattern`) y la tabla final de `npm test` (Tests / Passing / Failing). |
| Comprobar un valor y mostrar «esperado» y «recibido» | La herramienta sola (Chai viene incluido) | `.should(...)` en `duelo.cy.js`; al fallar dice «expected 9, found 8». |
| Leer el texto de un `alert()` del navegador | Código nuestro, con piezas de la herramienta | `duelo.cy.js` líneas 11-12: `cy.stub()` + `cy.on('window:alert')`. Cypress acepta el alert solo, pero para leer el texto hay que escucharlo antes del clic. |
| Dejar evidencia (captura, video o traza) cuando una prueba falla | La herramienta sola (captura) · configuración del kit (video apagado) | Apareció `cypress/screenshots/...(failed).png`; `cypress.config.js` tiene `video: false`. |

**Con esta tabla:** ¿la herramienta que nos tocó es una *librería*, un *framework*, o una librería con piezas que
tuvimos que armar nosotros?

> _Respuesta:_ Cypress es un framework: nosotros solo escribimos los `it(...)` y Cypress es el que los llama, abre el
> navegador, espera, reintenta y cuenta los resultados. Lo único que tocó armar fue la lectura del `alert()`, y aun así
> con piezas que ya trae (`cy.stub` y `cy.on`).

## 2. Bitácora de las historias (Partes 2 y 3)

| | US-04 CA2 (7 mochilas, stock 6) | US-09 CA1 (DESC10) |
|---|---|---|
| Minutos hasta el verde | ___ (ver `autoinforme.json`) | ___ (ver `autoinforme.json`) |
| Primer intento que **no** funcionó: qué escribimos y qué dijo la herramienta | `cy.get('input[type=number]').clear().type('7')`. Falló: la tienda vuelve a poner 1 cuando el campo queda vacío, así que se escribía 17 y el `should('have.value', '7')` no se cumplía. | Pasó en el primer intento. |
| Mensaje de error que nos ayudó (o que nos confundió) | Al principio solo vimos «1 failing» en la tabla del final; el detalle estaba más arriba en la terminal. | — |
| Qué tuvimos que buscar en la documentación (enlace) | `type` con `{selectall}`: https://docs.cypress.io/api/commands/type · stubs para `window:alert`: https://docs.cypress.io/api/cypress-api/catalog-of-events | `contains` y `siblings`: https://docs.cypress.io/api/commands/contains |
| Qué haría distinto un equipo con más experiencia en esta herramienta | Usaría `{selectall}` desde el principio y pondría atributos `data-cy` en la tienda para no depender de `parent()`. | Sacaría «agregar la mochila» a un comando propio (`Cypress.Commands.add`) porque se repite en US-04 y US-09. |

**Lo más distinto frente a US-01 CA1:**

> _Respuesta:_ En US-01 basta con contar los `h3`. En US-04 hubo que buscar *dentro* de la tarjeta de la mochila
> (`within`) y el aviso no está en la página: es un `alert()` y hay que preparar el stub antes del clic, si no se pierde.
> En US-09 el resultado aparece después de varios pasos y se leyó desde el `<dt>` «Descuento» hacia su `<dd>`. En
> ningún caso hubo que escribir esperas.

## 3. Lo que medimos (Parte 4)

```text
(pegar aquí el resumen de npm run medir -- --corridas 10 en kits/cypress)
```

```text
(pegar aquí el resumen de npm run medir -- --corridas 10 en control/playwright)
```

- Mediana de nuestro kit: ______ s · Mediana del control en **nuestra** máquina: ______ s · **Veces el control** (kit ÷ control): ______
- Corridas completas de nuestro kit: ______ de ______
- Líneas de código (pruebas + soporte): ______
- Puntos de diagnóstico (de 5): 4

**El fallo a propósito.** Cambiamos el 8 por 9 en US-01 (`.should('have.length', 9)`).

```text
(pegar aquí las primeras 10 líneas del error rojo que imprimió Cypress)
```

Lo que ayudaba: el mensaje dice cuántos elementos esperaba y cuántos encontró, y marca el archivo y la línea. Lo que
faltaba: una traza para ver paso a paso qué pasó sin volver a correr la prueba.

| Pregunta (campo en `autoinforme.json`) | ¿Sí o no? | ¿De dónde vino? |
|---|:---:|---|
| ¿El mensaje dice **qué** falló? (`diceQueFallo`) | Sí | Herramienta |
| ¿Muestra el valor **esperado** y el **recibido**? (`esperadoYRecibido`) | Sí | Herramienta |
| ¿Señala la **línea de nuestra prueba** donde falló? (`lineaDeLaPrueba`) | Sí | Herramienta |
| ¿Quedó una **captura de pantalla** (o un video)? (`capturaOVideo`) | Sí | Herramienta (captura en `cypress/screenshots`); el video lo apaga la configuración del kit |
| ¿Quedó una **traza o un informe**? (`trazaOInforme`) | No | Test Replay existe pero es de Cypress Cloud (pago) |

**Tres cosas que nuestra medición NO demuestra:**

1. Cómo se comporta con cientos de pruebas: aquí son solo 3, así que no se ve el paralelismo ni cuánto crece el tiempo.
2. Que funcione igual en Edge, Firefox o en equipos viejos: solo medimos en Chrome y en un único computador.
3. Lo que cuesta mantener las pruebas en el tiempo: 10 corridas seguidas en un día no dicen nada de qué pasa cuando la tienda cambia o sale una versión nueva de Cypress.

## 4. Mirando el tablero (Parte 5)

> _Respuestas:_ (completar con los datos del tablero de la clase cuando estén todos los equipos)
>
> 1.
> 2.
> 3.

## 5. Matriz y decisión (Partes 5 y 6)

☒ `MATRIZ.md` completa (pesos que suman 100, puntajes con evidencia, total y prueba de sensibilidad)
☒ `ADR.md` completo (una página, con consecuencias negativas y qué nos haría cambiar de opinión)
☐ `medidas.json`, `medidas-control.json` y `autoinforme.json` en el repositorio, con `git push`

**Nuestra recomendación en una frase:**

> Para la Entidad Pública recomendamos Selenium, porque se basa en un estándar abierto (W3C WebDriver), no depende de
> una sola empresa y maneja los navegadores reales que usa la entidad, aunque toca programar más cosas a mano.

## 6. Reflexión

1. Antes de medir habríamos dicho Cypress, porque fue la que nos tocó y las pruebas salieron rápido. Al pesar por el
   escenario cambió: a la entidad le importa más que la herramienta siga existiendo en diez años y que corra en sus
   navegadores que lo cómodo que sea escribir pruebas. Si nos hubiera tocado Selenium, el código habría sido más largo
   pero la recomendación sería la misma.
2. Faltó probar en Edge y Firefox, con versiones viejas, y con una suite grande. También faltó ver cuánto cuesta
   actualizar las pruebas cuando cambia la tienda.
3. Escribir las tres primeras pruebas es la parte pequeña. Lo grande es mantenerlas cuando cambian la página, el
   navegador o la herramienta, y eso la actividad no lo alcanza a medir.
4. En una empresa de producto que despliega seguido subiría Velocidad, Estabilidad e Integración, y bajaría Cobertura
   y Comunidad y futuro.
5. Sí usamos un asistente de IA: escribió el código de US-04 y US-09 y ayudó con la matriz. Hubo que corregirlo en
   US-04, porque `clear().type('7')` dejaba 17 en el campo. Por eso nuestros minutos no reflejan cuánto le tomaría a
   alguien escribir esas pruebas solo con la documentación.