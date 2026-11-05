# Matriz de decisión

**Equipo:** Equipo-3-E6· Jonathan Torres Monsalve
**Herramienta asignada en el sorteo:** Cypress
**Escenario:** E6 · Entidad Pública — entidad del Estado con contrato de largo plazo.

## 1. Propósito y contexto de la decisión

Esta matriz compara Selenium, Cypress y Playwright para seleccionar una herramienta de automatización de pruebas en el escenario E6. La ponderación prioriza la cobertura de navegadores y la sostenibilidad a largo plazo, debido a la necesidad de trabajar en un entorno institucional y mantener las pruebas durante un periodo prolongado.

Los puntajes representan una valoración del equipo basada en documentación consultada y en la evidencia disponible del laboratorio. No deben interpretarse como resultados universales de rendimiento o calidad.

## 2. Criterios, pesos y puntajes

| Criterio | Peso | Selenium | Cypress | Playwright |
|---|---:|---:|---:|---:|
| Encaje | 10 | 5 | 3 | 4 |
| Cobertura | 20 | 5 | 3 | 3 |
| Estabilidad | 15 | 3 | 4 | 5 |
| Diagnóstico | 5 | 2 | 4 | 5 |
| Velocidad | 5 | 3 | 2 | 4 |
| Integración | 5 | 3 | 4 | 5 |
| Comunidad y futuro | 30 | 5 | 2 | 3 |
| Costo total | 10 | 3 | 3 | 5 |
| **Total ponderado** | **100** | **4,15** | **2,90** | **3,85** |

**Fórmula:** total ponderado = suma de (peso del criterio × puntaje de la herramienta) / 100.

Los pesos suman 100. Los totales se calcularon con los puntajes de la tabla:
- Selenium: 4,15.
- Cypress: 2,90.
- Playwright: 3,85.

## 3. Evidencia de los puntajes por criterio

### 3.1. Encaje — peso 10

**Puntajes:** Selenium 5 · Cypress 3 · Playwright 4.

**[DOC]** Selenium ofrece bindings oficiales para Java, Python, C#, Ruby y JavaScript, facilitando que distintos proveedores mantengan las pruebas con diferentes lenguajes. Playwright permite escribir pruebas en JavaScript/TypeScript, Python, Java y .NET. Cypress permite escribir las pruebas en JavaScript y TypeScript, por lo que ofrece menos alternativas para transferir directamente el código de pruebas a equipos que utilicen otros lenguajes.

**[LAB]** En el laboratorio se utilizaron mecanismos propios de Cypress, como `cy.stub()` para escuchar y verificar el mensaje de `alert()`. Esta experiencia permitió identificar aspectos de aprendizaje de la herramienta, pero no constituye por sí sola una limitación de compatibilidad.

**[VALORACIÓN E6]** Se conservan los puntajes Selenium 5, Cypress 3 y Playwright 4. La diferencia considera principalmente la variedad de lenguajes disponibles para escribir las pruebas. El límite de Cypress se refiere al lenguaje del código de prueba, no al lenguaje con el que esté construida la aplicación bajo prueba.

### 3.2. Cobertura — peso 20

**Puntajes:** Selenium 5 · Cypress 3 · Playwright 3.

**[DOC]** Selenium permite automatizar navegadores de marca como Chrome, Edge y Firefox mediante sus respectivos drivers. Su compatibilidad con versiones concretas depende de la combinación entre Selenium, el navegador, el driver y el sistema operativo. Cypress también permite ejecutar pruebas en Chrome, Edge y Firefox, pero oficialmente admite las tres versiones mayores más recientes de estos navegadores; además, las versiones actuales requieren Firefox 140 o superior. Playwright permite utilizar Google Chrome y Microsoft Edge de marca, pero su implementación de Firefox utiliza una compilación modificada por el proyecto y no automatiza el Firefox de marca.

**[VALORACIÓN E6]** Por estas diferencias, Selenium obtiene 5, Cypress 3 y Playwright 3, priorizando la necesidad de trabajar con los navegadores corporativos exigidos por el escenario. La calificación no implica que Selenium garantice compatibilidad con cualquier versión antigua ni que Cypress o Playwright carezcan de soporte para navegadores.

### 3.3. Estabilidad — peso 15

**Puntajes:** Selenium 3 · Cypress 4 · Playwright 5.

**[DOC]** Selenium dispone de esperas implícitas y explícitas, pero el desarrollador debe definir las condiciones de sincronización necesarias en cada punto de la prueba. Cypress ofrece reintento automático de consultas y aserciones mediante su mecanismo de *retry-ability*, evitando muchas esperas manuales. Playwright incorpora comprobaciones automáticas de acción (*auto-waiting*) y aserciones con reintento automático.

**[LAB]** En las mediciones locales se ejecutaron 10 corridas completas de Cypress y 10 de Playwright, ambas sin fallos y con las 3 pruebas aprobadas en la última ejecución. Estos resultados describen el comportamiento observado en el laboratorio, pero no demuestran una superioridad universal de estabilidad ni permiten comparar con Selenium, que no fue medido en este entorno.

**[VALORACIÓN E6]** Se asignan 3 puntos a Selenium, 4 a Cypress y 5 a Playwright por las diferencias entre sus mecanismos de sincronización y reintento. Las diez corridas sin fallos no se utilizan como prueba de que Playwright sea universalmente más estable.

### 3.4. Diagnóstico — peso 5

**Puntajes:** Selenium + Mocha 2 · Cypress 4 · Playwright 5.

**[DOC]** Selenium + Mocha proporciona mensajes de error y reportes de ejecución, pero requiere configurar mecanismos adicionales para obtener capturas, registros detallados y trazas que faciliten investigar los fallos. Cypress ofrece mensajes de error con información de la aserción, capturas automáticas durante `cypress run` y reporteros integrados o personalizables; la grabación de video puede habilitarse en su configuración. Playwright dispone de Trace Viewer, que permite revisar acciones, capturas, estados del DOM, consola, solicitudes de red y ubicación del código fuente, siempre que se configure la grabación de trazas.

**[LAB]** En la ejecución de Cypress se provocó un fallo en US-01: el resultado identificó la comprobación fallida, mostró el valor esperado (9) y el recibido (8), e indicó el archivo y la línea. Se obtuvo una captura, pero el video estaba desactivado (`video: false`) y no se conservó una traza de ejecución.

**[VALORACIÓN E6]** Se asignan 2 puntos a Selenium + Mocha, 4 a Cypress y 5 a Playwright, considerando la cantidad de configuración adicional y la información disponible para investigar fallos. No se atribuye a Cypress una traza que no fue generada durante el laboratorio.

### 3.5. Velocidad — peso 5

**Puntajes:** Selenium 3 · Cypress 2 · Playwright 4.

**[DOC]** Selenium permite paralelizar pruebas mediante Selenium Grid, ejecutándolas en diferentes máquinas y navegadores, pero requiere configurar y administrar la infraestructura. Mocha también dispone de ejecución paralela. Cypress permite distribuir archivos de prueba entre varias máquinas mediante Cypress Cloud, utilizando `--record` y `--parallel`, por lo que esta modalidad depende de dicho servicio. Playwright Test incorpora ejecución paralela mediante procesos trabajadores (*workers*) y permite distribuir pruebas entre máquinas mediante particiones (*sharding*).

**[LAB]** En las mediciones locales, Cypress obtuvo una mediana de 8,59 segundos y Playwright de 3,41 segundos, con 10 corridas completas y sin fallos para cada herramienta. Playwright fue aproximadamente 2,52 veces más rápido en esta suite de tres pruebas. No se dispone de una medición equivalente de Selenium.

**[VALORACIÓN E6]** Se asignan 3 puntos a Selenium, 2 a Cypress y 4 a Playwright, considerando las capacidades de paralelización, la configuración requerida y los resultados limitados del laboratorio. La medición no demuestra un rendimiento universal para suites mayores ni permite establecer una comparación empírica con Selenium.

**Alcance de las mediciones:** las medianas corresponden a diez ejecuciones de una suite de tres pruebas, en el mismo entorno local Windows x64 y Node.js v24.22.1. Cypress: 8,59 s (mínimo 8,45; máximo 8,98). Playwright: 3,41 s (mínimo 3,18; máximo 5,10). Son datos del laboratorio, no una garantía de rendimiento para otros proyectos o equipos.

### 3.6. Integración — peso 5

**Puntajes:** Selenium 3 · Cypress 4 · Playwright 5.

**[DOC]** Selenium puede ejecutarse en plataformas de integración continua como GitHub Actions. Su configuración parte de instalar el binding del lenguaje y ejecutar las pruebas; los reportes dependen del framework y del reporter seleccionado. Cypress también dispone de integración documentada con GitHub Actions y otros proveedores de CI. Además, incorpora reporteros como `spec`, `teamcity` y `junit`, y permite utilizar reporteros personalizados. Playwright documenta flujos para GitHub Actions y dispone de reporteros integrados, entre ellos HTML y JUnit, que permiten generar resultados y publicarlos como artefactos del flujo de CI.

**[VALORACIÓN E6]** Se asignan 3 puntos a Selenium, 4 a Cypress y 5 a Playwright, considerando el nivel de integración documentada y las opciones de reporte disponibles. Esta calificación no implica que las otras herramientas sean incompatibles con CI ni que exista una integración con Jira comprobada en el laboratorio.

### 3.7. Comunidad y futuro — peso 30

**Puntajes:** Selenium 5 · Cypress 2 · Playwright 3.

**[DOC]** Selenium cuenta con una comunidad organizada, un modelo de gobernanza público y participación de Software Freedom Conservancy. Además, WebDriver es una recomendación del W3C, lo que aporta una referencia estandarizada para la automatización de navegadores. Cypress mantiene su aplicación bajo licencia MIT y dispone de un repositorio público con mecanismos de contribución. Playwright es mantenido por Microsoft, publica sus paquetes principales bajo licencia Apache 2.0 y dispone de documentación y repositorio públicos.

**[VALORACIÓN E6]** Se conservan los puntajes originales: Selenium 5, Cypress 2 y Playwright 3, dando mayor valoración a la trayectoria y gobernanza de Selenium. No obstante, la evidencia consultada confirma que Cypress y Playwright también son proyectos abiertos y mantenidos; por ello, la diferencia entre sus puntajes debe entenderse como una percepción de riesgo del equipo y no como una demostración de menor actividad o sostenibilidad. Esta valoración podría cambiar si se establecen indicadores comparables de actividad, contribuciones, frecuencia de versiones y gobernanza.

**Nota de revisión:** los puntajes 2 para Cypress y 3 para Playwright no quedan demostrados de forma concluyente por la documentación consultada. La existencia de un proyecto MIT activo y el mantenimiento de Playwright por Microsoft impiden afirmar, sin indicadores adicionales, que uno tenga una comunidad claramente menos sostenible que el otro. Se conservan los valores originales para mantener la trazabilidad de la decisión, pero este criterio merece revisión por el equipo.

### 3.8. Costo total — peso 10

**Puntajes:** Selenium 3 · Cypress 3 · Playwright 5.

**[DOC]** Selenium se distribuye bajo licencia Apache 2.0 y puede ejecutarse en infraestructura propia; no exige una licencia comercial para utilizar el framework. Cypress App es gratuito y de código abierto bajo licencia MIT. Cypress Cloud ofrece planes gratuitos y pagos, por lo que el costo depende de los límites y funciones que la organización necesite; la paralelización también aparece en el plan gratuito, con sus condiciones y límites. Playwright publica sus paquetes principales bajo licencia Apache 2.0 e incluye opciones de ejecución, reportes y CI que pueden utilizarse sin contratar un servicio comercial de nube.

**[VALORACIÓN E6]** Se conservan los puntajes 3 para Selenium, 3 para Cypress y 5 para Playwright. La valoración considera la posibilidad de ejecutar las pruebas sin licencias comerciales ni dependencia obligatoria de servicios externos. No representa un cálculo financiero: no se midieron horas de configuración y mantenimiento, costos de infraestructura ni consumo de servicios en la nube.

## 4. Interpretación de las mediciones

Los archivos de medición registrados para el laboratorio contienen los siguientes resultados:

| Dato | Cypress | Playwright |
|---|---:|---:|
| Corridas completas | 10 | 10 |
| Corridas con fallos | 0 | 0 |
| Pruebas esperadas | 3 | 3 |
| Pruebas aprobadas en la última corrida | 3 | 3 |
| Mediana | 8,59 s | 3,41 s |
| Mínimo | 8,45 s | 3,18 s |
| Máximo | 8,98 s | 5,10 s |
| Líneas de código registradas | 37 | 48 |

La relación entre las medianas es 8,59 / 3,41 = aproximadamente 2,52. En esta ejecución concreta, Playwright tardó 5,18 segundos menos de mediana. Esta comparación se limita a las tres pruebas ejecutadas, las diez corridas registradas y el entorno local indicado. No se dispone de una medición comparable de Selenium.

Las líneas de código registradas no se interpretan como una medida directa de calidad, mantenibilidad o superioridad de una herramienta.

## 5. Sensibilidad de la ponderación

La sensibilidad se calculó con la función `sensibilidad` de `docs/matriz-nucleo.js`, utilizando movimientos individuales de 10 puntos porcentuales entre pares de criterios. El análisis no representa una modificación acumulativa de varios pesos.

- Movimientos válidos analizados: 35.
- Movimientos que cambiaron el conjunto de ganadores: 14.
- En 9 movimientos Playwright pasó a ser ganador único.
- En 5 movimientos se produjo un empate entre Selenium y Playwright.
- En ninguno de los movimientos Cypress quedó como ganador.

Un ejemplo es trasladar 10 puntos de Comunidad y futuro a Estabilidad:

| Herramienta | Total original | Total con el cambio |
|---|---:|---:|
| Selenium | 4,15 | 3,95 |
| Cypress | 2,90 | 3,10 |
| Playwright | 3,85 | 4,05 |

Con ese cambio, Playwright obtiene 4,05 y supera a Selenium, que obtiene 3,95. El resultado evidencia que la decisión es sensible a la ponderación asignada a Comunidad y futuro y Estabilidad. No demuestra que una ponderación alternativa sea necesariamente más correcta.

## 6. Límites y supuestos de la matriz

1. Los puntajes son valoraciones del equipo sustentadas en documentación y evidencia disponible, no una medición universal.
2. Las mediciones locales comparan Cypress y Playwright en una suite de tres pruebas. Selenium no fue medido en las mismas condiciones.
3. Los tiempos dependen del equipo, sistema operativo, versiones, navegador, configuración y contenido de la suite.
4. El criterio Comunidad y futuro contiene una valoración subjetiva que requiere indicadores adicionales para justificar la diferencia entre Cypress y Playwright.
5. El criterio Costo total no incluye una cotización de infraestructura ni una medición de horas de configuración, soporte y mantenimiento.
6. La integración con Jira no se considera comprobada por el solo hecho de que una herramienta genere reportes o se ejecute en CI.
7. La compatibilidad con navegadores concretos depende de sus versiones, el sistema operativo y la configuración de cada herramienta.

## 7. Fuentes consultadas

### Encaje
- [Selenium — Language bindings](https://www.selenium.dev/documentation/webdriver/getting_started/)
- [Cypress — How it works](https://docs.cypress.io/app/core-concepts/introduction-to-cypress)
- [Playwright — Languages](https://playwright.dev/docs/languages)

### Cobertura
- [Selenium — Browsers](https://www.selenium.dev/documentation/webdriver/browsers/)
- [Selenium — Driver requirements](https://www.selenium.dev/documentation/webdriver/driver_requirements/)
- [Cypress — Launching browsers](https://docs.cypress.io/app/references/launching-browsers)
- [Cypress — Migration guide](https://docs.cypress.io/app/references/migration-guide)
- [Playwright — Browsers](https://playwright.dev/docs/browsers)

### Estabilidad
- [Selenium — Waiting strategies](https://www.selenium.dev/documentation/webdriver/waits/)
- [Cypress — Retry-ability](https://docs.cypress.io/app/core-concepts/retry-ability)
- [Playwright — Actionability](https://playwright.dev/docs/actionability)

### Diagnóstico
- [Selenium — Take a screenshot](https://www.selenium.dev/documentation/webdriver/interactions/windows/#take-screenshot)
- [Mocha — Reporters](https://mochajs.org/#reporters)
- [Cypress — Reporters](https://docs.cypress.io/app/tooling/reporters)
- [Playwright — Trace Viewer](https://playwright.dev/docs/trace-viewer)

### Velocidad
- [Selenium Grid](https://www.selenium.dev/documentation/grid/)
- [Mocha — Parallel tests](https://mochajs.org/#parallel-tests)
- [Cypress — Parallelization](https://docs.cypress.io/cloud/features/smart-orchestration/parallelization)
- [Playwright — Test parallelism](https://playwright.dev/docs/test-parallel)

### Integración
- [Selenium — Running in CI](https://www.selenium.dev/documentation/guides/ci/)
- [Cypress — Continuous Integration](https://docs.cypress.io/app/continuous-integration/overview)
- [Cypress — GitHub Actions](https://docs.cypress.io/app/continuous-integration/github-actions)
- [Cypress — Reporters](https://docs.cypress.io/app/tooling/reporters)
- [Playwright — Continuous Integration](https://playwright.dev/docs/ci)
- [Playwright — Reporters](https://playwright.dev/docs/test-reporters)

### Comunidad y futuro
- [Selenium — Project resources and governance](https://www.selenium.dev/project/)
- [Selenium — Governance](https://www.selenium.dev/project/governance/)
- [Selenium — WebDriver](https://www.selenium.dev/documentation/en/webdriver/)
- [W3C — WebDriver](https://www.w3.org/TR/webdriver/)
- [Cypress — GitHub repository and license](https://github.com/cypress-io/cypress)
- [Cypress — FAQ](https://docs.cypress.io/app/faq)
- [Playwright — npm package and license](https://www.npmjs.com/package/playwright)
- [Playwright — GitHub repository](https://github.com/microsoft/playwright)

### Costo total
- [Selenium — Copyright and license](https://www.selenium.dev/documentation/about/copyright/)
- [Cypress — FAQ](https://docs.cypress.io/app/faq)
- [Cypress — Pricing](https://www.cypress.io/pricing)
- [Playwright — npm package and license](https://www.npmjs.com/package/playwright)
- [Playwright — Continuous Integration](https://playwright.dev/docs/ci)

---

**Estado de la matriz:** los puntajes y pesos originales se conservan. Antes de la entrega final, el equipo debería revisar especialmente la justificación de Comunidad y futuro y verificar que las fuentes y las evidencias de laboratorio correspondan a las versiones efectivamente utilizadas.
