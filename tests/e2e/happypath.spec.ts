import { faker } from '@faker-js/faker';
import { test } from './base';

// Before looking below be aware of following:
// 1. I saw that in home assignment there should be 3 steps,
//    rather than 3 tests. But since these steps are logically
//    independent, I've created three separate tests.
// 2. As a bonus to this independence (and used test runner)
//    comes ability to parallelise all tests in suite, which
//    I've utilized.
// 3. Looking at steps I've decided to separate some of them
//    to hooks, as they are test pre-conditions.
// 4. I've also took bravery to change 'Step 3' - instead of
//    navigating to home page, and then to 'contact' page by
//    clicking, I followed existing best practices and
//    navigate to needed page directly. Anyways in case of
//    need I've added functionality to do it 'clicking' way
//    as demonstration.

test.describe.configure({ mode: 'parallel' });

test.describe(() => {
  test.beforeEach(async ({ app: { home } }) => {
    await home.navigate();
  });

  test('Step 1 - should have bookmarks', async ({ app: { home } }) => {
    await home.header.nav.tabs.shouldBe('Platform', 'Synthetic Data', 'Resources', 'Company', 'Pricing');
  });

  test('Step 2 - should how no results when searching for missing query', async ({ app: { home } }) => {
    await home.header.search('sythetic');
    await home.shouldHaveNoSearchResultsFor('sythetic');
  });
});

test.describe(() => {
  test.beforeEach(async ({ app: { contact } }) => {
    // await home.navigate();
    // await home.header.nav.tabs.company.contactUs();
    await contact.navigate();
  });

  test('Step 3 - should submit "Contact Us" form', async ({ app: { contact } }) => {
    await contact.navigate();
    await contact.form.set({
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      organisation: faker.company.name(),
      country: faker.location.country(),
      source: faker.lorem.sentence(),
    });
    await contact.form.submit();
  });
});
