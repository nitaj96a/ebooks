import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LanguagesSearchComponent} from './languages-search.component';

describe('LanguagesSearchComponent', () => {
    let component: LanguagesSearchComponent;
    let fixture: ComponentFixture<LanguagesSearchComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LanguagesSearchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LanguagesSearchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
