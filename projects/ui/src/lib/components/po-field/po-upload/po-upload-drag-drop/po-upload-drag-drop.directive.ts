import { Directive, EventEmitter, HostListener, Input, Output, ChangeDetectorRef } from '@angular/core';

import { PoNotificationService } from '../../../../services/po-notification/po-notification.service';
import { PoUploadLiterals } from '../interfaces/po-upload-literals.interface';

@Directive({
  selector: '[p-upload-drag-drop]'
})
export class PoUploadDragDropDirective {

  timeout: any;

  @Input('p-area-element') areaElement: HTMLElement;

  @Input('p-disabled') disabled: boolean;

  @Input('p-literals') literals: PoUploadLiterals;

  @Output('p-drag-leave') dragLeave: EventEmitter<any> = new EventEmitter<any>();

  @Output('p-drag-over') dragOver: EventEmitter<any> = new EventEmitter<any>();

  @Output('p-file-change') fileChange: EventEmitter<any> = new EventEmitter<any>();

  constructor(private notification: PoNotificationService, private changeDetector: ChangeDetectorRef) {}

  @HostListener('document:dragleave', ['$event']) onDragLeave(event) {
    event.preventDefault();
    event.stopPropagation();

    this.timeout = setTimeout(() => this.dragLeave.emit(), 30);
  }

  @HostListener('document:dragover', ['$event']) onDragOver(event) {
    event.preventDefault();
    event.stopPropagation();

    clearTimeout(this.timeout);

    if (!this.disabled) {
      this.dragOver.emit();
    }
  }

  @HostListener('document:drop', ['$event']) onDrop(event) {
    event.preventDefault();
    event.stopPropagation();

    if (!this.disabled) {
      const items = event.dataTransfer.items;
      for (let i = 0; i < items.length; i++) {
        const item = event.dataTransfer.items[i].webkitGetAsEntry();
        this.traverseFileTree(item, event);
      }

      this.dragLeave.emit();
    }

  }

  traverseFileTree(item, event) {
    if (item.isFile) {

      item.file(file => { this.sendFiles(event, [file]); });

    } else if (item.isDirectory) {
      const dirReader = item.createReader();
      dirReader.readEntries(entries => {
        for (let i = 0; i < entries.length; i++) {
          this.traverseFileTree(entries[i], event);
        }
      });
    }
  }

  private sendFiles(event, files) {
    if (this.areaElement.contains(event.target)) {
      if (files.length > 0) {
        this.fileChange.emit(files);
        // this.changeDetector.detectChanges();
      } else {
        this.notification.information(this.literals.invalidDropArea);
      }
    }
  }

}
