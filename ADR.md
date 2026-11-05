# ADR-001 · Herramienta de pruebas de interfaz para «Entidad Pública (E6)»

- **Estado:** Propuesta
- **Fecha:** 2026-10-24
- **Equipo:** Equipo-3-E6 · Jonathan Torres Monsalve

## Contexto

Una entidad del Estado contrata software para operarlo y mantenerlo durante diez años y cambia de proveedor entre
licitaciones. Sus reglas de contratación favorecen estándares abiertos y software sin un único fabricante. Usa
Chrome, Edge y Firefox con versiones controladas por TI, y algunos equipos son antiguos. Una auditoría anual revisa
que las pruebas se repitan con el mismo resultado. No puede usar servicios de pago ni depender de la nube.

## Opciones consideradas

Selenium (con Mocha), Cypress y Playwright. La matriz con pesos y puntajes está en [`MATRIZ.md`](MATRIZ.md).
Criterios que más pesaron en este escenario: **Comunidad y futuro (30)**, **Cobertura (20)** y **Estabilidad (15)**.

## Decisión

Recomendamos **Selenium WebDriver** porque es el único que se apoya en un estándar abierto (WebDriver, Recomendación
W3C desde 2018), lo gobierna una organización sin ánimo de lucro (Software Freedom Conservancy) con licencia Apache 2.0
y maneja los navegadores de marca que usa la entidad, incluido Firefox. Obtuvo 4,15 sobre 5,00 frente a 3,85 de
Playwright y 2,90 de Cypress. Además, sus enlaces para varios lenguajes permiten que el siguiente proveedor herede las
pruebas aunque no trabaje en JavaScript.

## Consecuencias

- **Lo que ganamos:** independencia de un fabricante, una base que cumple las reglas de contratación, cobertura de
  Chrome, Edge y Firefox reales en versiones controladas, y cero costo de licencias o servicios.
- **Lo que perdemos o se complica:**
  - Hay que programar las esperas explícitas: si se hacen mal, las pruebas se vuelven inestables y la auditoría lo verá.
  - El diagnóstico es pobre de fábrica: capturas, trazas y reportes hay que armarlos (más líneas de código propio).
  - Escribir cada prueba toma más tiempo que en Playwright o Cypress.
- **Lo que tendremos que hacer:** una guía interna de esperas y de Page Objects, un código base que guarde captura al
  fallar y genere reporte JUnit/HTML, fijar las versiones de navegador y driver por escrito, y entregar esa
  documentación al siguiente proveedor en cada licitación.

## Qué nos haría cambiar de opinión

- Si en la auditoría más de 1 de cada 50 corridas falla sin cambios en el código (pruebas inestables), probar Playwright.
- Si la entidad deja de exigir Firefox de marca y equipos con versiones antiguas, Playwright pasa a ganar por estabilidad y diagnóstico.
- Si WebDriver BiDi se vuelve el estándar y Playwright lo adopta como protocolo principal, reevaluar Comunidad y futuro.

## ¿Con capa BDD (Cucumber) o sin ella?

Sin Cucumber. En E6 no hay analistas de negocio que lean los archivos `.feature`: los leería solo el proveedor de turno,
así que la capa agrega código y una dependencia más que heredar sin que nadie la aproveche. *(Completar con los datos del
tablero: líneas y minutos de Playwright + Cucumber frente al control.)*

## Evidencia usada

- Tablero de la clase, consultado el ____-__-__ a las __:__ : *(pendiente: corridas, diagnóstico, veces el control, líneas)*
- Documentación consultada:
  - https://sfconservancy.org/news/2018/may/31/seleniumW3C/
  - https://docs.cypress.io/app/references/launching-browsers
  - https://playwright.dev/docs/browsers