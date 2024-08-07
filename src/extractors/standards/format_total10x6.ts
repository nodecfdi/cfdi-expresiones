import toFixed from '../../utils/to_fixed.js';

export class FormatTotal10x6 {
  public formatTotal(input: string): string {
    return toFixed(Number.parseFloat(input || '0'), 6).padStart(17, '0');
  }
}
