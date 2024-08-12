import { formatNumber, toFloat } from '@nodecfdi/cfdi-core';

export default class FormatTotal10x6 {
  public formatTotal(input: string): string {
    return formatNumber(toFloat(input), 6).padStart(17, '0');
  }
}
