export class FormatSelloLast8 {
  public formatSello(sello: string): string {
    return sello.slice(-8);
  }
}
