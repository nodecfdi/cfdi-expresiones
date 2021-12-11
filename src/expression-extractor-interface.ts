export interface ExpressionExtractorInterface {
    /**
     * Extractor (implementor) unique name
     */
    uniqueName(): string;

    /**
     * Check that the XML document matches with the extractor
     *
     * @param document
     */
    matches(document: Document): boolean;

    /**
     * Obtain the relevant values from the given XML Document
     *
     * @param document
     */
    obtain(document: Document): Record<string, string>;

    /**
     * Format an expression based on given XML document
     *
     * @param document
     */
    extract(document: Document): string;

    /**
     * Format an expression based on given values
     *
     * @param values
     */
    format(values: Record<string, string>): string;
}
