[@nodecfdi/cfdi-expresiones](../README.md) / MatchDetector

# Class: MatchDetector

## Table of contents

### Constructors

- [constructor](MatchDetector.md#constructor)

### Properties

- [elementName](MatchDetector.md#elementname)
- [namespaceUri](MatchDetector.md#namespaceuri)
- [versionName](MatchDetector.md#versionname)
- [versionValue](MatchDetector.md#versionvalue)

### Methods

- [check](MatchDetector.md#check)
- [matches](MatchDetector.md#matches)

## Constructors

### constructor

• **new MatchDetector**(`namespaceUri`, `elementName`, `versionName`, `versionValue`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `namespaceUri` | `string` |
| `elementName` | `string` |
| `versionName` | `string` |
| `versionValue` | `string` |

## Properties

### elementName

• **elementName**: `string`

#### Defined in

[internal/match-detector.ts:6](https://github.com/nodecfdi/cfdi-expresiones/blob/0c2a2cb/src/internal/match-detector.ts#L6)

___

### namespaceUri

• **namespaceUri**: `string`

#### Defined in

[internal/match-detector.ts:4](https://github.com/nodecfdi/cfdi-expresiones/blob/0c2a2cb/src/internal/match-detector.ts#L4)

___

### versionName

• **versionName**: `string`

#### Defined in

[internal/match-detector.ts:8](https://github.com/nodecfdi/cfdi-expresiones/blob/0c2a2cb/src/internal/match-detector.ts#L8)

___

### versionValue

• **versionValue**: `string`

#### Defined in

[internal/match-detector.ts:10](https://github.com/nodecfdi/cfdi-expresiones/blob/0c2a2cb/src/internal/match-detector.ts#L10)

## Methods

### check

▸ **check**(`document`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `Document` |

#### Returns

`void`

___

### matches

▸ **matches**(`document`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `document` | `Document` |

#### Returns

`boolean`
