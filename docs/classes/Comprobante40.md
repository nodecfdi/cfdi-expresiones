[@nodecfdi/cfdi-expresiones](../README.md) / Comprobante40

# Class: Comprobante40

This class is using the CFDI Standard 2017-07-01. It's the same for CFDI 3.3 & 4.0.

## Hierarchy

- `Comprobante20170701`

  ↳ **`Comprobante40`**

## Implements

- [`ExpressionExtractorInterface`](../interfaces/ExpressionExtractorInterface.md)

## Table of contents

### Constructors

- [constructor](Comprobante40.md#constructor)

### Methods

- [extract](Comprobante40.md#extract)
- [format](Comprobante40.md#format)
- [formatRfc](Comprobante40.md#formatrfc)
- [formatSello](Comprobante40.md#formatsello)
- [formatTotal](Comprobante40.md#formattotal)
- [matches](Comprobante40.md#matches)
- [obtain](Comprobante40.md#obtain)
- [uniqueName](Comprobante40.md#uniquename)

## Constructors

### constructor

• **new Comprobante40**()

#### Overrides

Comprobante20170701.constructor

## Methods

### extract

▸ **extract**(`document`): `string`

Format an expression based on given XML document

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `Document` | XML document |

#### Returns

`string`

#### Implementation of

[ExpressionExtractorInterface](../interfaces/ExpressionExtractorInterface.md).[extract](../interfaces/ExpressionExtractorInterface.md#extract)

#### Inherited from

Comprobante20170701.extract

___

### format

▸ **format**(`values`): `string`

Format an expression based on given values

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `values` | `Record`<`string`, `string`\> | Parameters for generate expression |

#### Returns

`string`

#### Implementation of

[ExpressionExtractorInterface](../interfaces/ExpressionExtractorInterface.md).[format](../interfaces/ExpressionExtractorInterface.md#format)

#### Inherited from

Comprobante20170701.format

___

### formatRfc

▸ **formatRfc**(`rfc`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `rfc` | `string` |

#### Returns

`string`

#### Inherited from

Comprobante20170701.formatRfc

___

### formatSello

▸ **formatSello**(`sello`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `sello` | `string` |

#### Returns

`string`

#### Inherited from

Comprobante20170701.formatSello

___

### formatTotal

▸ **formatTotal**(`input`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `string` |

#### Returns

`string`

#### Inherited from

Comprobante20170701.formatTotal

___

### matches

▸ **matches**(`document`): `boolean`

Check that the XML document matches with the extractor

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `Document` | XML document |

#### Returns

`boolean`

#### Implementation of

[ExpressionExtractorInterface](../interfaces/ExpressionExtractorInterface.md).[matches](../interfaces/ExpressionExtractorInterface.md#matches)

#### Inherited from

Comprobante20170701.matches

___

### obtain

▸ **obtain**(`document`): `Record`<`string`, `string`\>

Obtain the relevant values from the given XML Document

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `document` | `Document` | XML document |

#### Returns

`Record`<`string`, `string`\>

#### Implementation of

[ExpressionExtractorInterface](../interfaces/ExpressionExtractorInterface.md).[obtain](../interfaces/ExpressionExtractorInterface.md#obtain)

#### Inherited from

Comprobante20170701.obtain

___

### uniqueName

▸ **uniqueName**(): `string`

Extractor (implementor) unique name

#### Returns

`string`

#### Implementation of

[ExpressionExtractorInterface](../interfaces/ExpressionExtractorInterface.md).[uniqueName](../interfaces/ExpressionExtractorInterface.md#uniquename)

#### Overrides

Comprobante20170701.uniqueName
