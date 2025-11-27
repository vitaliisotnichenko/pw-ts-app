import { test, expect} from "@playwright/test";
import { PageManager } from "../page-objects/pageManager";

test.beforeEach(async ({page}) => {
  await page.goto('http://localhost:4200')
})

test('navigate to form page', async ({page}) => {
  const pageManager = new PageManager(page);
  await pageManager.navigateToPage().formLayoutsPage();
  await pageManager.navigateToPage().datepickerPage();
  await pageManager.navigateToPage().smartTablePage();
  await pageManager.navigateToPage().toastrPage();
  await pageManager.navigateToPage().tooltipPage();
})

test('parametrized methods', async ({page}) => {
  const pageManager = new PageManager(page);

  await pageManager.navigateToPage().formLayoutsPage();
  await pageManager.onFormLayoutsPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.com', 'Welcome1', 'Option 1');
  await  pageManager.onFormLayoutsPage().submitInlineFormWithNameEmailAndCheckbox('John Smith', 'john@test.com', true);
})

test('datePicker range', async ({page}) => {
  const pageManager = new PageManager(page);

  await pageManager.navigateToPage().datepickerPage();
  await pageManager.onDatePickerPage().selectCommonDatePickerDateFromToday(7);
  await pageManager.onDatePickerPage().selectDatePickerWithRangeFromToday(6, 15);
})
