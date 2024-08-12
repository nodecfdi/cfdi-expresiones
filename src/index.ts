// Copyright (c) Nodecfdi. All rights reserved. Licensed under the MIT license.

/**
 * Librería que contiene objetos de ayuda para crear expresiones de CFDI 3.2,
 * CFDI 3.3, CFDI 4.0, RET 2.0 y RET 1.0 de acuerdo a la información técnica del SAT en el Anexo 20.
 */
export { default as DiscoverExtractor } from '#src/discover_extractor';
export { default as Comprobante32 } from '#src/extractors/comprobante32';
export { default as Comprobante33 } from '#src/extractors/comprobante33';
export { default as Comprobante40 } from '#src/extractors/comprobante40';
export { default as Retenciones10 } from '#src/extractors/retenciones10';
export { default as Retenciones20 } from '#src/extractors/retenciones20';
export { default as Comprobante20170701 } from '#src/extractors/standards/comprobante20170701';
export { default as FormatForeignTaxId20 } from '#src/extractors/standards/format_foreign_tax_id20';
export { default as FormatRfcXml } from '#src/extractors/standards/format_rfc_xml';
export { default as FormatSelloLast8 } from '#src/extractors/standards/format_sello_last8';
export { default as FormatTotal10x6 } from '#src/extractors/standards/format_total10x6';
export { default as FormatTotal18x6 } from '#src/extractors/standards/format_total18x6';
export { default as MatchDetector } from '#src/internal/match_detector';
