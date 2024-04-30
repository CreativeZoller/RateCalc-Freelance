import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
    it('should render itself', async () => {
        await render(AppComponent);
    });
});
