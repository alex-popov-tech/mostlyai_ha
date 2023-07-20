import { test as base } from '@playwright/test';
import { App } from 'src/e2e';

type MyFixtures = {
  app: ReturnType<typeof App>;
  pause: () => Promise<void>;
};

export const test = base.extend<MyFixtures>({
  pause: async ({ page }, use) => {
    await use(() => page.pause());
  },
  app: async ({ context, page }, use) => {
    // prevent showing cookies banner
    const name = 'borlabs-cookie';
    const value = encodeURIComponent(
      JSON.stringify({
        consents: { essential: ['borlabs-cookie', 'google-tag-manager', 'mixpanel'] },
        domainPath: 'mostly.ai/',
        expires: 'Thu, 18 Jan 2029 10:37:53 GMT',
        uid: 'anonymous',
        version: '7',
      })
    );
    await context.addCookies([{ name, value, domain: '.mostly.ai', path: '/' }]);

    const app = App({ context, page });
    await use(app);
    await page.close();
    await context.close();
  },
});
