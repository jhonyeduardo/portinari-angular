import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { PoUploadFileRestrictions } from '@portinari/portinari-ui/lib';

@Component({
  selector: 'po-upload-file-restrictions',
  templateUrl: './po-upload-file-restrictions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoUploadFileRestrictionsComponent implements OnInit {

  @Input('p-file-restrictions') fileRestrictions: PoUploadFileRestrictions;

  minFileSize: any;
  maxFiles: any;
  maxFileSize: any;
  allowedExtensions: any;

  constructor() { }

  ngOnInit() {
    this.setFileRestrictions(this.fileRestrictions);
  }

  setFileRestrictions(fileRestrictions) {
    if (this.fileRestrictions.minFileSize) {
      this.minFileSize = ` a partir de ${this.formatBytes(this.fileRestrictions.minFileSize)}`;
    }
    if (this.fileRestrictions.maxFileSize) {
      this.maxFileSize = ` até ${this.formatBytes(this.fileRestrictions.maxFileSize)}`;
    }
    this.maxFiles = this.fileRestrictions.maxFiles ? this.fileRestrictions.maxFiles : 1;
    this.allowedExtensions = this.fileRestrictions.allowedExtensions
    .join(', ')
    .toUpperCase()
    .replace(/,(?=[^,]*$)/, ' e') || undefined;
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
