import { type Document } from '@nodecfdi/cfdi-core';

export interface ExpressionExtractorInterface {
  /**
   * Extractor (implementor) unique name
   */
  uniqueName(): string;

  /**
   * Check that the XML document matches with the extractor
   *
   * @param document - XML document
   */
  matches(document: Document): boolean;

  /**
   * Obtain the relevant values from the given XML Document
   *
   * @param document - XML document
   */
  obtain(document: Document): Record<string, string>;

  /**
   * Format an expression based on given XML document
   *
   * @param document - XML document
   */
  extract(document: Document): string;

  /**
   * Format an expression based on given values
   *
   * @param values - Parameters for generate expression
   */
  format(values: Record<string, string>): string;
}
