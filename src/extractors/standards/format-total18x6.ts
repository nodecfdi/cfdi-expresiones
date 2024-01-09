import { rtrim, toFixed } from '../../utils/index.js';

export class FormatTotal18x6 {
  public formatTotal(input: string): string {
    let total = rtrim(toFixed(Number.parseFloat(input || '0'), 6), '0');
    if (total.endsWith('.')) {
      total = `${total}0`;
    }

    return total;
  }
}
