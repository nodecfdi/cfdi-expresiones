[@nodecfdi/cfdi-expresiones](../README.md) / DiscoverExtractor

# Class: DiscoverExtractor

## Implements

- [`ExpressionExtractorInterface`](../interfaces/ExpressionExtractorInterface.md)

## Table of contents

### Constructors

- [constructor](DiscoverExtractor.md#constructor)

### Methods

- [currentExpressionExtractors](DiscoverExtractor.md#currentexpressionextractors)
- [defaultExtractors](DiscoverExtractor.md#defaultextractors)
- [extract](DiscoverExtractor.md#extract)
- [format](DiscoverExtractor.md#format)
- [matches](DiscoverExtractor.md#matches)
- [obtain](DiscoverExtractor.md#obtain)
- [uniqueName](DiscoverExtractor.md#uniquename)

## Constructors

### constructor

• **new DiscoverExtractor**(...`expressions`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `...expressions` | [`ExpressionExtractorInterface`](../interfaces/ExpressionExtractorInterface.md)[] |

## Methods

### currentExpressionExtractors

▸ **currentExpressionExtractors**(): [`ExpressionExtractorInterface`](../interfaces/ExpressionExtractorInterface.md)[]

#### Returns

[`ExpressionExtractorInterface`](../interfaces/ExpressionExtractorInterface.md)[]

___

### defaultExtractors

▸ **defaultExtractors**(): [`ExpressionExtractorInterface`](../interfaces/ExpressionExtractorInterface.md)[]

#### Returns

[`ExpressionExtractorInterface`](../interfaces/ExpressionExtractorInterface.md)[]

___

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

▸ **format**(`values`, `type?`): `string`

Format an expression based on given values

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `values` | `Record`<`string`, `string`\> | `undefined` | Parameters for generate expression |
| `type` | `string` | `''` | - |

#### Returns

`string`

#### Implementation of

[ExpressionExtractorInterface](../interfaces/ExpressionExtractorInterface.md).[format](../interfaces/ExpressionExtractorInterface.md#format)

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
