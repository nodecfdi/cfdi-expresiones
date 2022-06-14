# @nodecfdi/cfdi-expresiones

[![Source Code][badge-source]][source]
[![Software License][badge-license]][license]
[![Latest Version][badge-release]][release]
[![Discord][badge-discord]][discord]

[source]: https://github.com/nodecfdi/cfdi-expresiones
[badge-source]: https://img.shields.io/badge/source-nodecfdi%2Fcfdi--expressiones-blue?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMTIgMTIgNDAgNDAiPjxwYXRoIGZpbGw9IiMzMzMzMzMiIGQ9Ik0zMiwxMy40Yy0xMC41LDAtMTksOC41LTE5LDE5YzAsOC40LDUuNSwxNS41LDEzLDE4YzEsMC4yLDEuMy0wLjQsMS4zLTAuOWMwLTAuNSwwLTEuNywwLTMuMiBjLTUuMywxLjEtNi40LTIuNi02LjQtMi42QzIwLDQxLjYsMTguOCw0MSwxOC44LDQxYy0xLjctMS4yLDAuMS0xLjEsMC4xLTEuMWMxLjksMC4xLDIuOSwyLDIuOSwyYzEuNywyLjksNC41LDIuMSw1LjUsMS42IGMwLjItMS4yLDAuNy0yLjEsMS4yLTIuNmMtNC4yLTAuNS04LjctMi4xLTguNy05LjRjMC0yLjEsMC43LTMuNywyLTUuMWMtMC4yLTAuNS0wLjgtMi40LDAuMi01YzAsMCwxLjYtMC41LDUuMiwyIGMxLjUtMC40LDMuMS0wLjcsNC44LTAuN2MxLjYsMCwzLjMsMC4yLDQuNywwLjdjMy42LTIuNCw1LjItMiw1LjItMmMxLDIuNiwwLjQsNC42LDAuMiw1YzEuMiwxLjMsMiwzLDIsNS4xYzAsNy4zLTQuNSw4LjktOC43LDkuNCBjMC43LDAuNiwxLjMsMS43LDEuMywzLjVjMCwyLjYsMCw0LjYsMCw1LjJjMCwwLjUsMC40LDEuMSwxLjMsMC45YzcuNS0yLjYsMTMtOS43LDEzLTE4LjFDNTEsMjEuOSw0Mi41LDEzLjQsMzIsMTMuNHoiLz48L3N2Zz4%3D
[license]: https://github.com/nodecfdi/cfdi-expresiones/blob/master/LICENSE
[badge-license]: https://img.shields.io/github/license/nodecfdi/cfdi-expresiones?logo=open-source-initiative&style=flat-square
[badge-release]: https://img.shields.io/npm/v/@nodecfdi/cfdi-expresiones
[release]: https://www.npmjs.com/package/@nodecfdi/cfdi-expresiones
[badge-discord]: https://img.shields.io/discord/459860554090283019?logo=discord&style=flat-square
[discord]: https://discord.gg/aFGYXvX

> Library to generate expressions for CFDI 4.0, CFDI 3.3, CFDI 3.2, RET 2.0 and RET 1.0

:us: The documentation of this project is in spanish as this is the natural language for intended audience.

:mexico: La documentación del proyecto está en español porque ese es el lenguaje principal de los usuarios.

Esta librería contiene objetos de ayuda para crear expresiones de CFDI 3.2, CFDI 3.3, CFDI 4.0, RET 2.0 y RET 1.0 de acuerdo a la
información técnica del SAT en el Anexo 20. Librería inspirada por la versión para
php https://github.com/phpcfdi/cfdi-expresiones

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

Ejemplo de expresión para RET 1.0 && RET 2.0:

```text
https://prodretencionverificacion.clouda.sat.gob.mx/?&re=XAXX010101000&nr=12345678901234567890%tt=1234567890.123456&id=ad662d33-6934-459c-a128-BDf0393f0f44
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
