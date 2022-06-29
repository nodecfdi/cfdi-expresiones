[@nodecfdi/cfdi-expresiones](../README.md) / Retenciones20

# Class: Retenciones20

## Hierarchy

- `FormatForeignTaxId20`<`this`\> & `FormatRfcXml`<`this`\> & `FormatTotal18x6`<`this`\> & `FormatSelloLast8`<`this`\>

  ↳ **`Retenciones20`**

## Implements

- [`ExpressionExtractorInterface`](../interfaces/ExpressionExtractorInterface.md)

## Table of contents

### Constructors

- [constructor](Retenciones20.md#constructor)

### Methods

- [extract](Retenciones20.md#extract)
- [format](Retenciones20.md#format)
- [formatForeignTaxId](Retenciones20.md#formatforeigntaxid)
- [formatRfc](Retenciones20.md#formatrfc)
- [formatSello](Retenciones20.md#formatsello)
- [formatTotal](Retenciones20.md#formattotal)
- [matches](Retenciones20.md#matches)
- [obtain](Retenciones20.md#obtain)
- [uniqueName](Retenciones20.md#uniquename)

## Constructors

### constructor

• **new Retenciones20**()

#### Overrides

Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal18x6, FormatSelloLast8).constructor

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

Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal18x6, FormatSelloLast8).formatForeignTaxId

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

Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal18x6, FormatSelloLast8).formatRfc

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

Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal18x6, FormatSelloLast8).formatSello

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

Mixin(FormatForeignTaxId20, FormatRfcXml, FormatTotal18x6, FormatSelloLast8).formatTotal

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
