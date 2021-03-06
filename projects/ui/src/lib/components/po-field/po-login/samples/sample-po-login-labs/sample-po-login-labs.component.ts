import { Component, OnInit } from '@angular/core';

import { PoCheckboxGroupOption } from '@portinari/portinari-ui';

@Component({
  selector: 'sample-po-login-labs',
  templateUrl: './sample-po-login-labs.component.html'
})
export class SamplePoLoginLabsComponent implements OnInit {

  errorPattern: string;
  event: string;
  help: string;
  label: string;
  login: string;
  maxlength: number;
  minlength: number;
  pattern: string;
  placeholder: string;
  properties: Array<string>;

  public readonly propertiesOptions: Array<PoCheckboxGroupOption> = [
    { value: 'clean', label: 'Clean' },
    { value: 'disabled', label: 'Disabled' },
    { value: 'optional', label: 'Optional' },
    { value: 'readonly', label: 'Read Only' },
    { value: 'required', label: 'Required' }
  ];

  ngOnInit() {
    this.restore();
  }

  changeEvent(event: string) {
    this.event = event;
  }

  restore() {
    this.errorPattern = '';
    this.event = '';

    this.label = undefined;
    this.login = '';

    this.help = undefined;

    this.maxlength = undefined;
    this.minlength = undefined;

    this.pattern = '';
    this.placeholder = '';
    this.properties = [];
  }

}
