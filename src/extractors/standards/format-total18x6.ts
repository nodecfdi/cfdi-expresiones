import { rtrim, toFixed } from '~/utils';

export class FormatTotal18x6 {
    public formatTotal(input: string): string {
        let total = rtrim(toFixed(Number.parseFloat(input || '0'), 6), '0');
        if (total.slice(-1) === '.') {
            total = `${total}0`;
        }

        return total;
    }
}
