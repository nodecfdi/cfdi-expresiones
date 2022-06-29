[@nodecfdi/cfdi-expresiones](../README.md) / Comprobante33

# Class: Comprobante33

This class is using the CFDI Standard 2017-07-01. It´s the same for CFDI 3.3 & 4.0.

## Hierarchy

- `Comprobante20170701`

  ↳ **`Comprobante33`**

## Implements

- [`ExpressionExtractorInterface`](../interfaces/ExpressionExtractorInterface.md)

## Table of contents

### Constructors

- [constructor](Comprobante33.md#constructor)

### Methods

- [extract](Comprobante33.md#extract)
- [format](Comprobante33.md#format)
- [formatRfc](Comprobante33.md#formatrfc)
- [formatSello](Comprobante33.md#formatsello)
- [formatTotal](Comprobante33.md#formattotal)
- [matches](Comprobante33.md#matches)
- [obtain](Comprobante33.md#obtain)
- [uniqueName](Comprobante33.md#uniquename)

## Constructors

### constructor

• **new Comprobante33**()

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
