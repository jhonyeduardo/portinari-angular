import { Component } from '@angular/core';

import { PoProgressBaseComponent } from './po-progress-base.component';
import { PoProgressStatus } from './enums/po-progress-status.enum';

/**
 * @docsExtends PoProgressBaseComponent
 *
 * @example
 * <example name="po-progress-basic" title="Portinari Progress Basic">
 *   <file name="sample-po-progress-basic/sample-po-progress-basic.component.html"> </file>
 *   <file name="sample-po-progress-basic/sample-po-progress-basic.component.ts"> </file>
 * </example>
 *
 * <example name="po-progress-labs" title="Portinari Progress Labs">
 *   <file name="sample-po-progress-labs/sample-po-progress-labs.component.html"> </file>
 *   <file name="sample-po-progress-labs/sample-po-progress-labs.component.ts"> </file>
 * </example>
 *
 * <example name="po-progress-publication" title="Portinari Progress - Publication">
 *   <file name="sample-po-progress-publication/sample-po-progress-publication.component.html"> </file>
 *   <file name="sample-po-progress-publication/sample-po-progress-publication.component.ts"> </file>
 * </example>
 */
@Component({
  selector: 'po-progress',
  templateUrl: './po-progress.component.html'
})
export class PoProgressComponent extends PoProgressBaseComponent {

  get statusClass(): string {

    if (this.status === PoProgressStatus.Success) {
      return 'po-progress-success';
    }

    if (this.status === PoProgressStatus.Error) {
      return 'po-progress-error';
    }

    return 'po-progress-default';
  }

}
