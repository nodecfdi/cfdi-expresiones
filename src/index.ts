// Copyright (c) Nodecfdi. All rights reserved. Licensed under the MIT license.

/**
 * Librería que contiene objetos de ayuda para crear expresiones de CFDI 3.2,
 * CFDI 3.3, CFDI 4.0, RET 2.0 y RET 1.0 de acuerdo a la información técnica del SAT en el Anexo 20.
 */
export * from './discover_extractor.js';
export * from './extractors/comprobante32.js';
export * from './extractors/comprobante33.js';
export * from './extractors/comprobante40.js';
export * from './extractors/retenciones10.js';
export * from './extractors/retenciones20.js';
export * from './extractors/standards/comprobante20170701.js';
export * from './extractors/standards/format_foreign_tax_id20.js';
export * from './extractors/standards/format_rfc_xml.js';
export * from './extractors/standards/format_sello_last8.js';
export * from './extractors/standards/format_total10x6.js';
export * from './extractors/standards/format_total18x6.js';
export * from './internal/dom_helper.js';
export * from './internal/match_detector.js';
