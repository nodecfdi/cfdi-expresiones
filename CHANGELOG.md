# @nodecfdi/cfdi-expresiones ChangeLog

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
