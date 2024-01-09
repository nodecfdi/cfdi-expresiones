import { htmlEntities } from '../../utils/index.js';

export class FormatForeignTaxId20 {
  public formatForeignTaxId(foreignTaxId: string): string {
    // Codificar
    foreignTaxId = htmlEntities(foreignTaxId);
    // Usar hasta un máximo de 20 posiciones
    foreignTaxId = foreignTaxId.slice(0, 20);
    // Crear un padding para establecer a 20 posiciones

    return foreignTaxId.padStart(20, '0');
  }
}
