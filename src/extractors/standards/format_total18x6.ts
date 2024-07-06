import rtrim from '../../utils/rtrim.js';
import toFixed from '../../utils/to_fixed.js';

export class FormatTotal18x6 {
  public formatTotal(input: string): string {
    let total = rtrim(toFixed(Number.parseFloat(input || '0'), 6), '0');
    if (total.endsWith('.')) {
      total = `${total}0`;
    }

    return total;
  }
}
