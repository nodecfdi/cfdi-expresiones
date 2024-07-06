import { encode, EncodingMode } from 'entities';

export class FormatForeignTaxId20 {
  public formatForeignTaxId(foreignTaxId: string): string {
    // Codificar
    let foreignTaxIdResult = encode(foreignTaxId, { mode: EncodingMode.UTF8 });
    // Usar hasta un máximo de 20 posiciones
    foreignTaxIdResult = foreignTaxIdResult.slice(0, 20);
    // Crear un padding para establecer a 20 posiciones
    foreignTaxIdResult = foreignTaxIdResult.padStart(20, '0');

    return foreignTaxIdResult;
  }
}
