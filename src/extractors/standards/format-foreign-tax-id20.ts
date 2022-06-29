import { html_entities } from '~/utils';

export class FormatForeignTaxId20 {
    public formatForeignTaxId(foreignTaxId: string): string {
        // codificar
        foreignTaxId = html_entities(foreignTaxId);
        // usar hasta un máximo de 20 posiciones
        foreignTaxId = foreignTaxId.substring(0, 20);
        // crear un padding para establecer a 20 posiciones

        return foreignTaxId.padStart(20, '0');
    }
}
