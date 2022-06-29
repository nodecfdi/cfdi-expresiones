[@nodecfdi/cfdi-expresiones](../README.md) / Retenciones10

# Class: Retenciones10

## Hierarchy

- `FormatForeignTaxId20`<`this`\> & `FormatRfcXml`<`this`\> & `FormatTotal10x6`<`this`\>

  ↳ **`Retenciones10`**

## Implements

- [`ExpressionExtractorInterface`](../interfaces/ExpressionExtractorInterface.md)

## Table of contents

### Constructors

- [constructor](Retenciones10.md#constructor)

### Methods

- [extract](Retenciones10.md#extract)
- [format](Retenciones10.md#format)
- [formatForeignTaxId](Retenciones10.md#formatforeigntaxid)
- [formatRfc](Retenciones10.md#formatrfc)
- [formatTotal](Retenciones10.md#formattotal)
- [matches](Retenciones10.md#matches)
- [obtain](Retenciones10.md#obtain)
- [uniqueName](Retenciones10.md#uniquename)

## Constructors

### constructor

• **new Retenciones10**()

#### Overrides

Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal10x6).constructor

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

### formatForeignTaxId

▸ **formatForeignTaxId**(`foreignTaxId`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `foreignTaxId` | `string` |

#### Returns

`string`

#### Inherited from

Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal10x6).formatForeignTaxId

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

Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal10x6).formatRfc

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

Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal10x6).formatTotal

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
