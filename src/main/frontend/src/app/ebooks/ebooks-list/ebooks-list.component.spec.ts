import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EbooksListComponent} from './ebooks-list.component';

describe('EbooksListComponent', () => {
    let component: EbooksListComponent;
    let fixture: ComponentFixture<EbooksListComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EbooksListComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EbooksListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
