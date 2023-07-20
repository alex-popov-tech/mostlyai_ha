import { BrowserContext, Page } from '@playwright/test';
import { Home } from './pages/home';
import { Contact } from './pages/contact';

export const App = ({ page }: { context: BrowserContext; page: Page }) => ({
  home: Home({ page }),
  contact: Contact({ page }),
});
