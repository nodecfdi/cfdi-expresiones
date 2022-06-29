# @nodecfdi/cfdi-expresiones

[![Source Code][badge-source]][source]
[![Npm Node Version Support][badge-node-version]][node-version]
[![Discord][badge-discord]][discord]
[![Latest Version][badge-release]][release]
[![Software License][badge-license]][license]
[![Build Status][badge-build]][build]
[![Reliability][badge-reliability]][reliability]
[![Maintainability][badge-maintainability]][maintainability]
[![Code Coverage][badge-coverage]][coverage]
[![Violations][badge-violations]][violations]
[![Total Downloads][badge-downloads]][downloads]

> Library to generate expressions for CFDI 4.0, CFDI 3.3, CFDI 3.2, RET 2.0 and RET 1.0

:us: The documentation of this project is in spanish as this is the natural language for intended audience.

:mexico: La documentación del proyecto está en español porque ese es el lenguaje principal de los usuarios.

Esta librería contiene objetos de ayuda para crear expresiones de CFDI 3.2, CFDI 3.3, CFDI 4.0, RET 2.0 y RET 1.0 de acuerdo a la información técnica del SAT en el Anexo 20. Librería inspirada por la versión para php <https://github.com/phpcfdi/cfdi-expresiones>

Estas expresiones se utilizan principalmente para dos motivos:

1. Generar el código QR de una representación impresa de un CFDI o RET.
2. Consultar el WebService del SAT de estado de un CFDI.

Ejemplo de expresión para CFDI 3.3 && CFDI 4.0:

```text
https://verificacfdi.facturaelectronica.sat.gob.mx/default.aspx?id=CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC&re=POT9207213D6&rr=DIM8701081LA&tt=2010.01&fe=/OAgdg==
```

Ejemplo de expresión para CFDI 3.2:

```text
?re=AAA010101AAA&rr=COSC8001137NA&tt=0000001234.567800&id=CEE4BE01-ADFA-4DEB-8421-ADD60F0BEDAC
```

Ejemplo de expresión para RET 1.0:

```text
?re=XAXX010101000&nr=12345678901234567890&tt=1234567890.123456&id=ad662d33-6934-459c-a128-BDf0393f0f44
```

Ejemplo de expresión para RET 2.0:

```text
https://prodretencionverificacion.clouda.sat.gob.mx/?id=ad662d33-6934-459c-a128-BDf0393f0f44&re=XAXX010101000&nr=12345678901234567890&tt=1234567890.12&fe=/OAgdg==
```

## Instalación

```shell
npm i @nodecfdi/cfdi-expresiones --save
```

o

```shell
yarn add @nodecfdi/cfdi-expresiones
```

## Ejemplo básico de uso

Dado que en node como tal no se tiene acceso al api del navegador, más bien es un ambiente de servidor, no tenemos
acceso a Document, por lo que para poder pasar el document a la lib usaremos la lib xmldom, que nos permitirá crear
nuestro documento y pasárselo a esta lib.

```ts
import {readFileSync} from 'fs';
import {DiscoverExtractor} from '@nodecfdi/cfdi-expresiones';
import {DOMParser} from 'xmldom';
// creamos el extractor
const extractor = new DiscoverExtractor();
// Accedemos al contenido en nuestro archivo XML
const content = readFileSync('archivo-cfdi.xml').toString();
// generamos el documento con ayuda de DOMParser
const document = new DOMParser().parseFromString(content, 'text/xml');
// obtenemos la expresión
const expression = extractor.extract(document);
// y también podemos obtener los valores inviduales
const values = extractor.obtain(document);
```

Nota: Actualmente la librería requiere que le pases un objeto de tipo Document, existen muchas libs en node que te dan
el objeto que implementa esa interfaz, en esta lib usamos para pruebas la
librería [xmldom](https://www.npmjs.com/package/xmldom). Y se recomienda usar dicha lib para evitar cualquier error.

## Soporte

Puedes obtener soporte abriendo un ticket en Github.

Adicionalmente, esta librería pertenece a la comunidad [OcelotlStudio](https://ocelotlstudio.com), así que puedes usar los mismos canales de comunicación para obtener ayuda de algún miembro de la comunidad.

## Compatibilidad

Esta librería se mantendrá compatible con al menos la versión con
[soporte activo de Node](https://nodejs.org/es/about/releases/) más reciente.

También utilizamos [Versionado Semántico 2.0.0](https://semver.org/lang/es/) por lo que puedes usar esta librería sin temor a romper tu aplicación.

## Contribuciones

Las contribuciones con bienvenidas. Por favor lee [CONTRIBUTING][] para más detalles y recuerda revisar el archivo [CHANGELOG][].

## Copyright and License

The `@nodecfdi/cfdi-expresiones` library is copyright © [NodeCfdi](https://github.com/nodecfdi) - [OcelotlStudio](https://ocelotlstudio.com) and licensed for use under the MIT License (MIT). Please see [LICENSE][] for more information.

[contributing]: https://github.com/nodecfdi/cfdi-expresiones/blob/main/CONTRIBUTING.md
[changelog]: https://github.com/nodecfdi/cfdi-expresiones/blob/main/CHANGELOG.md

[source]: https://github.com/nodecfdi/cfdi-expresiones
[node-version]: https://www.npmjs.com/package/@nodecfdi/cfdi-expresiones
[discord]: https://discord.gg/AsqX8fkW2k
[release]: https://www.npmjs.com/package/@nodecfdi/cfdi-expresiones
[license]: https://github.com/nodecfdi/cfdi-expresiones/blob/main/LICENSE
[build]: https://github.com/nodecfdi/cfdi-expresiones/actions/workflows/build.yml?query=branch:main
[reliability]:https://sonarcloud.io/component_measures?id=nodecfdi_cfdi-expresiones&metric=Reliability
[maintainability]: https://sonarcloud.io/component_measures?id=nodecfdi_cfdi-expresiones&metric=Maintainability
[coverage]: https://sonarcloud.io/component_measures?id=nodecfdi_cfdi-expresiones&metric=Coverage
[violations]: https://sonarcloud.io/project/issues?id=nodecfdi_cfdi-expresiones&resolved=false
[downloads]: https://www.npmjs.com/package/@nodecfdi/cfdi-expresiones

[badge-source]: https://img.shields.io/badge/source-nodecfdi/cfdi--expresiones-blue.svg?logo=github
[badge-node-version]: https://img.shields.io/node/v/@nodecfdi/cfdi-expresiones.svg?logo=nodedotjs
[badge-discord]: https://img.shields.io/discord/459860554090283019?logo=discord
[badge-release]: https://img.shields.io/npm/v/@nodecfdi/cfdi-expresiones.svg?logo=npm
[badge-license]: https://img.shields.io/github/license/nodecfdi/cfdi-expresiones.svg?logo=open-source-initiative
[badge-build]: https://img.shields.io/github/workflow/status/nodecfdi/cfdi-expresiones/build/main?logo=github-actions
[badge-reliability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_cfdi-expresiones&metric=reliability_rating
[badge-maintainability]: https://sonarcloud.io/api/project_badges/measure?project=nodecfdi_cfdi-expresiones&metric=sqale_rating
[badge-coverage]: https://img.shields.io/sonar/coverage/nodecfdi_cfdi-expresiones/main?logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-violations]: https://img.shields.io/sonar/violations/nodecfdi_cfdi-expresiones/main?format=long&logo=sonarcloud&server=https%3A%2F%2Fsonarcloud.io
[badge-downloads]: https://img.shields.io/npm/dm/@nodecfdi/cfdi-expresiones.svg?logo=npm
