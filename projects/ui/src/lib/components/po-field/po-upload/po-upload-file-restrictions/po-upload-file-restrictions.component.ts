import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { browserLanguage, poLocaleDefault } from '../../../../utils/util';

import { PoUploadFileRestrictions } from '../interfaces/po-upload-file-restriction.interface';
import { poUploadLiteralsDefault } from '../po-upload-base.component';

@Component({
  selector: 'po-upload-file-restrictions',
  templateUrl: './po-upload-file-restrictions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoUploadFileRestrictionsComponent implements OnInit {

  @Input('p-file-restrictions') fileRestrictions: PoUploadFileRestrictions;

  literals;
  literalParams;
  minFileSize: any;
  maxFiles: any;
  maxFileSize: any;
  allowedExtensions: any;

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.setFileRestrictions(this.fileRestrictions);
    this.getLiterals();
  }

  setFileRestrictions(fileRestrictions) {
    if (this.fileRestrictions.minFileSize) {
      this.minFileSize = this.formatBytes(this.fileRestrictions.minFileSize);
    }
    if (this.fileRestrictions.maxFileSize) {
      this.maxFileSize = this.formatBytes(this.fileRestrictions.maxFileSize);
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

  private getLiterals(language?: string) {
    language = language || browserLanguage();

    this.literalParams = [this.maxFiles, this.allowedExtensions, this.minFileSize, this.maxFileSize];

    this.literals = {
      ...poUploadLiteralsDefault[poLocaleDefault],
      ...poUploadLiteralsDefault[language],
    };

    this.changeDetector.detectChanges();
  }

}
