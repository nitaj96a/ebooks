import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EbooksSearchComponent } from './ebooks-search.component';

describe('EbooksSearchComponent', () => {
  let component: EbooksSearchComponent;
  let fixture: ComponentFixture<EbooksSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EbooksSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EbooksSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
