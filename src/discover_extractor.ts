import { UnmatchedDocumentError } from './errors.js';
import { Comprobante32 } from './extractors/comprobante32.js';
import { Comprobante33 } from './extractors/comprobante33.js';
import { Comprobante40 } from './extractors/comprobante40.js';
import { Retenciones10 } from './extractors/retenciones10.js';
import { Retenciones20 } from './extractors/retenciones20.js';
import { type ExpressionExtractorInterface } from './types.js';

export class DiscoverExtractor implements ExpressionExtractorInterface {
  private readonly _expressions: ExpressionExtractorInterface[];

  public constructor(...expressions: ExpressionExtractorInterface[]) {
    this._expressions = expressions.length > 0 ? expressions : this.defaultExtractors();
  }

  public defaultExtractors(): ExpressionExtractorInterface[] {
    return [
      new Comprobante40(),
      new Comprobante33(),
      new Comprobante32(),
      new Retenciones20(),
      new Retenciones10(),
    ];
  }

  public currentExpressionExtractors(): ExpressionExtractorInterface[] {
    return this._expressions;
  }

  public matches(document: Document): boolean {
    return this.findMatch(document) !== null;
  }

  public uniqueName(): string {
    return 'discover';
  }

  public obtain(document: Document): Record<string, string> {
    const discovered = this.getFirstMatch(document);

    return discovered.obtain(document);
  }

  public extract(document: Document): string {
    const discovered = this.getFirstMatch(document);

    return discovered.extract(document);
  }

  public format(values: Record<string, string>, type = ''): string {
    const extractor = this.findByUniqueName(type);
    if (extractor === null) {
      throw new UnmatchedDocumentError(
        'DiscoverExtractor requires type key with an extractor identifier',
      );
    }

    delete values.type;

    return extractor.format(values);
  }

  protected findByUniqueName(uniqueName: string): ExpressionExtractorInterface | null {
    for (const expression of this._expressions) {
      if (uniqueName === expression.uniqueName()) {
        return expression;
      }
    }

    return null;
  }

  protected findMatch(document: Document): ExpressionExtractorInterface | null {
    for (const expression of this._expressions) {
      if (expression.matches(document)) {
        return expression;
      }
    }

    return null;
  }

  protected getFirstMatch(document: Document): ExpressionExtractorInterface {
    const discovered = this.findMatch(document);
    if (!discovered) {
      throw new UnmatchedDocumentError(
        'Cannot discover any DiscoverExtractor that matches with document',
      );
    }

    return discovered;
  }
}
