[@nodecfdi/cfdi-expresiones](../README.md) / Comprobante32

# Class: Comprobante32

## Hierarchy

- `FormatRfcXml`<`this`\> & `FormatTotal10x6`<`this`\>

  ↳ **`Comprobante32`**

## Implements

- [`ExpressionExtractorInterface`](../interfaces/ExpressionExtractorInterface.md)

## Table of contents

### Constructors

- [constructor](Comprobante32.md#constructor)

### Methods

- [extract](Comprobante32.md#extract)
- [format](Comprobante32.md#format)
- [formatRfc](Comprobante32.md#formatrfc)
- [formatTotal](Comprobante32.md#formattotal)
- [matches](Comprobante32.md#matches)
- [obtain](Comprobante32.md#obtain)
- [uniqueName](Comprobante32.md#uniquename)

## Constructors

### constructor

• **new Comprobante32**()

#### Overrides

Mixin(FormatRfcXml, FormatTotal10x6).constructor

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

Mixin(FormatRfcXml, FormatTotal10x6).formatRfc

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

Mixin(FormatRfcXml, FormatTotal10x6).formatTotal

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

___

### uniqueName

▸ **uniqueName**(): `string`

Extractor (implementor) unique name

#### Returns

`string`

#### Implementation of

[ExpressionExtractorInterface](../interfaces/ExpressionExtractorInterface.md).[uniqueName](../interfaces/ExpressionExtractorInterface.md#uniquename)
