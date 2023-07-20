import { Page } from '@playwright/test';

export const Contact = ({ page }: { page: Page }) => ({
  navigate: () => page.goto('/contact'),
  form: {
    set: async (args: {
      firstname: string;
      lastname: string;
      email: string;
      phone: string;
      organisation: string;
      country: string;
      source: string;
    }) => {
      const container = page.locator('div:has-text("Ask us anything!")');

      await container.locator('[name="firstname"]').fill(args.firstname);
      await container.locator('[name="lastname"]').fill(args.lastname);
      await container.locator('[name="email"]').fill(args.email);
      await container.locator('[name="mobilephone"]').fill(args.phone);
      await container.locator('[name="country"]').selectOption(args.country);
      await container.locator('[name="how_did_you_hear_about_mostly_ai___free_text"]').fill(args.source);
      await container.locator('input[id ^= "LEGAL_CONSENT"]').check();
    },
    // this function suppose to submit the form,
    // but as home assignment states we should
    // only hover button, to do not mess up
    // production data
    submit: () => page.locator('input[type="submit"][value="SEND MESSAGE"]').hover(),
  },
});
