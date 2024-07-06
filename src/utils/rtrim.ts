const rtrim = (string_: string, chart?: string): string => {
  const resultChart = chart
    ? String(chart).replaceAll(/([$()*+./:?[\]^{}])/g, String.raw`\$1`)
    : ' \\s\u00A0';
  // eslint-disable-next-line security/detect-non-literal-regexp
  const re = new RegExp(`[${resultChart}]+$`, 'g');

  return String(string_).replace(re, '');
};

export default rtrim;
