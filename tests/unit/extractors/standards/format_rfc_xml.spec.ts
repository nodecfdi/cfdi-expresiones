import FormatRfcXml from '#src/extractors/standards/format_rfc_xml';

describe('class FormatRfcXml', () => {
  test.each([
    ['AAA010101AAA', 'AAA010101AAA'],
    ['AAAA010101AAA', 'AAAA010101AAA'],
    ['ÑAAA010101AAA', 'ÑAAA010101AAA'],
    ['&AAA010101AAA', '&amp;AAA010101AAA'],
  ])('format rfc input: %s - expected: %s', (input: string, expected: string) => {
    const extractor = new FormatRfcXml();

    expect(extractor.formatRfc(input)).toBe(expected);
  });
});
