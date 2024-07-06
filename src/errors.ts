export class ExpressionError extends Error {}

export class AttributeNotFoundError extends ExpressionError {}

export class ElementNotFoundError extends ExpressionError {}

export class UnmatchedDocumentError extends ExpressionError {}
