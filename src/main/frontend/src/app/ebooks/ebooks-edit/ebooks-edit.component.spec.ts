import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbooksEditComponent } from './ebooks-edit.component';

describe('EbooksEditComponent', () => {
  let component: EbooksEditComponent;
  let fixture: ComponentFixture<EbooksEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbooksEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbooksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
