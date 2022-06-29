[@nodecfdi/cfdi-expresiones](../README.md) / ExpressionExtractorInterface

# Interface: ExpressionExtractorInterface

## Implemented by

- [`Comprobante32`](../classes/Comprobante32.md)
- [`Comprobante33`](../classes/Comprobante33.md)
- [`Comprobante40`](../classes/Comprobante40.md)
- [`DiscoverExtractor`](../classes/DiscoverExtractor.md)
- [`Retenciones10`](../classes/Retenciones10.md)
- [`Retenciones20`](../classes/Retenciones20.md)

## Table of contents

### Methods

- [extract](ExpressionExtractorInterface.md#extract)
- [format](ExpressionExtractorInterface.md#format)
- [matches](ExpressionExtractorInterface.md#matches)
- [obtain](ExpressionExtractorInterface.md#obtain)
- [uniqueName](ExpressionExtractorInterface.md#uniquename)

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

___

### uniqueName

▸ **uniqueName**(): `string`

Extractor (implementor) unique name

#### Returns

`string`
