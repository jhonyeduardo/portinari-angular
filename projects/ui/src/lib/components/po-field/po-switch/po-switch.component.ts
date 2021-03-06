import { AfterViewChecked, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { PoSwitchBaseComponent } from './po-switch-base.component';
import { PoSwitchLabelPosition } from './po-switch-label-position.enum';

/**
 * @docsExtends PoSwitchBaseComponent
 *
 * @example
 *
 * <example name="po-switch-basic" title="Portinari Switch Basic">
 *   <file name="sample-po-switch-basic/sample-po-switch-basic.component.html"> </file>
 *   <file name="sample-po-switch-basic/sample-po-switch-basic.component.ts"> </file>
 * </example>
 *
 * <example name="po-switch-labs" title="Portinari Switch Labs">
 *   <file name="sample-po-switch-labs/sample-po-switch-labs.component.html"> </file>
 *   <file name="sample-po-switch-labs/sample-po-switch-labs.component.ts"> </file>
 *   <file name="sample-po-switch-labs/sample-po-switch-labs.component.e2e-spec.ts"> </file>
 *   <file name="sample-po-switch-labs/sample-po-switch-labs.component.po.ts"> </file>
 * </example>
 *
 * <example name="po-switch-order" title="Portinari Switch - Order Summary">
 *   <file name="sample-po-switch-order/sample-po-switch-order.component.html"> </file>
 *   <file name="sample-po-switch-order/sample-po-switch-order.component.ts"> </file>
 * </example>
 *
 * <example name="po-switch-order-reactive-form" title="Portinari Switch - Order Summary Reactive Form">
 *   <file name="sample-po-switch-order-reactive-form/sample-po-switch-order-reactive-form.component.html"> </file>
 *   <file name="sample-po-switch-order-reactive-form/sample-po-switch-order-reactive-form.component.ts"> </file>
 * </example>
 */
@Component({
  selector: 'po-switch',
  templateUrl: './po-switch.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PoSwitchComponent),
      multi: true,
    }
  ]
})
export class PoSwitchComponent extends PoSwitchBaseComponent implements AfterViewChecked {

  constructor(private changeDetector: ChangeDetectorRef) {
    super();
  }

  ngAfterViewChecked(): void {
    this.changeDetector.detectChanges();
  }

  getLabelPosition() {
    switch (this.labelPosition) {
      case PoSwitchLabelPosition.Left: return 'left';
      case PoSwitchLabelPosition.Right: return 'right';
      default: return 'right';
    }
  }

  getSwitchPosition() {
    switch (this.labelPosition) {
      case PoSwitchLabelPosition.Left: return 'right';
      case PoSwitchLabelPosition.Right: return 'left';
      default: return 'left';
    }
  }

  onKeyDown(event) {
    if (event.which === 32 || event.keyCode === 32)  {
      event.preventDefault();
      this.eventClick();
    }
  }

}
