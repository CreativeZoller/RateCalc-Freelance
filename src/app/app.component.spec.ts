import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/ui/toast/toast.component';

jest.mock('./shared/ui/toast/toast.component', () => ({
    ToastComponent: class MockToastComponent {},
}));

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, RouterOutlet],
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(fixture.nativeElement).toBeTruthy();
    });

    it('should have the correct standalone property set to true', () => {
        const componentMetadata = (AppComponent as any).__annotations__[0];
        expect(componentMetadata.standalone).toBe(true);
    });
});
