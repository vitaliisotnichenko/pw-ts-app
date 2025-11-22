import {test} from '@playwright/test'


test.describe('first test set', () => {
  test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:4200/');
  })
  test('navigate to form layouts page', async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  });

  test('navigate to datepicker page', async ({page}) => {
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
  });
})
