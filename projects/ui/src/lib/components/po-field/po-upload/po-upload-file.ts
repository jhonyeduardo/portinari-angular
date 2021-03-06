import { PoUploadStatus } from './po-upload-status.enum';

// Classe responsável pelo arquivo do PO Upload
export class PoUploadFile {
  // Nome do arquivo.
  public name: string;
  // Arquivo bruto.
  public rawFile: File;
  // Status de envio do arquivo.
  public status?: PoUploadStatus;
  // Identificador do arquivo.
  public uid: string;
  // Extensão do arquivo.
  public extension: string;
  // Tamanho do arquivo em bytes;
  public size: number;

  constructor(file: any) {
    if (file) {
      this.name = file.name;
      this.extension = this.getExtension(file.name);
      this.size = file.size;
      this.rawFile = file;
      this.uid = this.generateUUID();
      this.status = PoUploadStatus.None;
    }
  }

  private getExtension(value: string) {
    if (value) {
      const extension = value.substr(value.lastIndexOf('.'));
      return extension.toLowerCase();
    }

    return '';
  }

  private generateUUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }
}
