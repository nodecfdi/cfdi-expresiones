import { formatNumber, toFloat } from '@nodecfdi/cfdi-core';
import rtrim from '#src/utils/rtrim';

export default class FormatTotal18x6 {
  public formatTotal(input: string): string {
    let total = rtrim(formatNumber(toFloat(input), 6), '0');
    if (total.endsWith('.')) {
      total = `${total}0`;
    }

    return total;
  }
}
