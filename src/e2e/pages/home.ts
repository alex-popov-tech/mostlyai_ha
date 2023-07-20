import { Page, expect } from '@playwright/test';

export const Home = ({ page }: { page: Page }) => ({
  navigate: () => page.goto('/'),
  header: {
    nav: {
      tabs: {
        company: {
          contactUs: async () => {
            await page.locator('a:has-text("Company")').hover();
            await page.locator('a:has-text("Contact")').click();
          },
        },
        shouldBe: async (...tabs: string[]) =>
          await expect
            .poll(async () => {
              const elements = page.locator('nav[role="navigation"] li');
              const length = await elements.count();
              const texts = await Promise.all(
                Array(length)
                  .fill('')
                  .map((_, i) => elements.nth(i).innerText())
              );
              return texts;
            })
            .toEqual(tabs),
      },
    },
    search: async (query: string) => {
      await page.locator('[aria-label="Open search"]').click();
      await page.locator('input[type="search"]').fill(query);
      await page.locator('input[type="search"]').press('Enter');
    },
  },
  shouldHaveNoSearchResultsFor: (query: string) =>
    expect(page.locator('.search-results-header h1.ct-headline').locator('xpath=./..')).toHaveText(
      new RegExp(`Sorry, no results for:.*${query}`)
    ),
});
