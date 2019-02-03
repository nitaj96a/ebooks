import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EbooksAddComponent} from './ebooks-add.component';

describe('EbooksAddComponent', () => {
    let component: EbooksAddComponent;
    let fixture: ComponentFixture<EbooksAddComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EbooksAddComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EbooksAddComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
