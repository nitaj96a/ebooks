/* tslint:disable:no-unused-variable */
import { async, TestBed } from '@angular/core/testing';
import { CategoriesEditComponent } from './categories-edit.component';
describe('CategoriesEditComponent', function () {
    var component;
    var fixture;
    beforeEach(async(function () {
        TestBed.configureTestingModule({
            declarations: [CategoriesEditComponent]
        })
            .compileComponents();
    }));
    beforeEach(function () {
        fixture = TestBed.createComponent(CategoriesEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', function () {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=categories-edit.component.spec.js.map