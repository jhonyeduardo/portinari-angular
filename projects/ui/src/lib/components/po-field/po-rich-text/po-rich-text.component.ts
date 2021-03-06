import { AfterViewInit, Component, ElementRef, forwardRef, OnDestroy } from '@angular/core';

import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

import { PoRichTextBaseComponent } from './po-rich-text-base.component';

/**
 * @docsExtends PoRichTextBaseComponent
 *
 * @example
 *
 * <example name="po-rich-text-basic" title="Portinari Rich Text Basic">
 *   <file name="sample-po-rich-text-basic/sample-po-rich-text-basic.component.html"> </file>
 *   <file name="sample-po-rich-text-basic/sample-po-rich-text-basic.component.ts"> </file>
 * </example>
 *
 * <example name="po-rich-text-labs" title="Portinari Rich Text Labs">
 *   <file name="sample-po-rich-text-labs/sample-po-rich-text-labs.component.html"> </file>
 *   <file name="sample-po-rich-text-labs/sample-po-rich-text-labs.component.ts"> </file>
 * </example>
 *
 * <example name="po-rich-text-recipe" title="Portinari Rich Text Recipe">
 *   <file name="sample-po-rich-text-recipe/sample-po-rich-text-recipe.component.html"> </file>
 *   <file name="sample-po-rich-text-recipe/sample-po-rich-text-recipe.component.ts"> </file>
 * </example>
 */
@Component({
  selector: 'po-rich-text',
  templateUrl: './po-rich-text.component.html',
  providers: [
  {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => PoRichTextComponent),
    multi: true,
  },
  {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => PoRichTextComponent),
    multi: true,
  }]
})
export class PoRichTextComponent extends PoRichTextBaseComponent implements AfterViewInit, OnDestroy {

  private listener = this.validateClassesForRequired.bind(this);

  get errorMsg() {
    return (this.errorMessage !== '' && !this.value && this.required && this.invalid) ? this.errorMessage : '';
  }

  constructor(private element: ElementRef) {
    super();
  }

  ngAfterViewInit() {
    // Se não tem ngModel ou reactive form adiciona validação com classes css
    if (!this.onChangeModel) {
      this.element.nativeElement.addEventListener('keyup', this.listener);
      this.element.nativeElement.addEventListener('cut', this.listener);
      this.element.nativeElement.addEventListener('paste', this.listener);
    }
  }

  ngOnDestroy() {
    if (!this.onChangeModel) {
      this.element.nativeElement.removeEventListener('keyup', this.listener);
      this.element.nativeElement.removeEventListener('cut', this.listener);
      this.element.nativeElement.removeEventListener('paste', this.listener);
    }
  }

  updateValue(value: string) {
    this.value = value;
    this.invalid = !value;
    this.updateModel(this.value);
  }

  private validateClassesForRequired() {
    setTimeout(() => {
      const value = this.value;
      const element = this.element.nativeElement;

      if (!value && this.required) {
        element.classList.add('ng-invalid');
        element.classList.add('ng-dirty');
      } else {
        element.classList.remove('ng-invalid');
      }
    });
  }

}
