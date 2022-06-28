import { toFixed } from '~/utils';

export class FormatTotal10x6 {
    public formatTotal(input: string): string {
        return toFixed(Number.parseFloat(input), 6).padStart(17, '0');
    }
}
