# @nodecfdi/cfdi-expresiones ChangeLog

## 2.1.6

### Patch Changes - Maintenance and small optimizations

- Update dependencies
- Update types exports for typescript module and commonjs
- Update to ESM support
- Update CI workflow for fix pipeline to latest github and pnpm changes
- Drop support to node versions < 16

## 2.1.5

### Patch Changes - Update dependencies and maintanence in general

- Remove unnecesary dependency library `@nodecfdi/cfdiutils-common`
- Update readme with latest release version
- Fixed CI error
- Fixed exports for support commonjs and module type correctly
- Fixed generate types (typescript)
- Update dependencies

## 2.1.4

### Patch Changes - Change export for build process using bundlers

- Resolve exports for usage with bundlers like a vite|rollup
- Update dependencies

## 2.1.3

### Change build tool from microbundle to rollup

- Change build tool
- Update dependencies
- Added api-extractor for check types `.d.ts`
- Replace microbundle for rollup
- Replace jest for vitest (added support to multiple environment tests like a node or browser env)
- Added all required test for browser usage

## 2.1.2

### Patch Changes

- Para typescript se arreglan los types dado que usar un custom path generaba mal el tipado.

## 2.1.1

### DOM Agnostic

- Se actualizan dependencias para ser agnostico al DOM
- Se arregla la generacion de la lib para browser con dependencias no usadas y especificar externals
- Se incrementa el coverage con tests faltantes y refactorización en general.

## 2.1.0

### Refactorización de CFDI 4.0

---

Se refactoriza la generación de expresión para CFDI 4.0 con fundamento en el Anexo 20.
Para ello la _Especificación técnica del código de barras bidimensional a incorporar en la representación impresa_ se separa a un estándar interno llamado `CfdiStandard20170701`

### Refactorización de métodos compartidos

---

Las expresiones de CFDI 3.3 y CFDI 4.0 son idénticas, asi como la forma de formatear los datos como RFC, Sello, Total, etc. por lo que se refactorizan las clases para poner los métodos comunes en traits.

### Refactorización de RET 2.0

---

Se refactoriza la forma de generar la expresión para Retenciones 2.0 con fundamento en el Anexo 20.

## 2.0.1

- Fix Revert change on RET 1.0 not include url base (check anexo 20 technical reference page 102)
- Fixed order of expression on Retenciones 2.0 id is first
- Fixed expression on Retenciones 2.0 fe is included (fe contains the last 8 characters of sello)
- Added test of retenciones 2.0 foreign

Thanks to [eclipxe13](https://github.com/eclipxe13) for review.

## 2.0.0

- Update expresión for RET 1.0 include url base
- Added CFDI40 and Retenciones2.0
- Update dependency library

This version introduces breaking compatibility changes, on retenciones1.0 expression

```text
\\ old expression
"?&re=XAXX010101000&nr=12345678901234567890%tt=1234567890.123456&id=ad662d33-6934-459c-a128-BDf0393f0f44"

\\ new expression
"https://prodretencionverificacion.clouda.sat.gob.mx/?&re=XAXX010101000&nr=12345678901234567890%tt=1234567890.123456&id=ad662d33-6934-459c-a128-BDf0393f0f44"
```

## 1.1.0

- Added ES6 and Rollup support
- Browser support
- Updated dependencies
