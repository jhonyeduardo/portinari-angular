import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PoUploadFileRestrictionsComponent } from './po-upload-file-restrictions.component';

describe('PoUploadFileRestrictionsComponent', () => {
  let component: PoUploadFileRestrictionsComponent;
  let fixture: ComponentFixture<PoUploadFileRestrictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PoUploadFileRestrictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PoUploadFileRestrictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
