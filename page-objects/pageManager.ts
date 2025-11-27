import { Page } from '@playwright/test'
import { NavigationPage }  from "./navigationPage";
import { FormLayoutPage } from "./formLayoutsPage";
import { DatePickerPage } from "./datePickerPage";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly datePickerPage: DatePickerPage;
  private readonly formLayoutPage: FormLayoutPage;

  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page);
    this.datePickerPage = new DatePickerPage(this.page);
    this.formLayoutPage = new FormLayoutPage(this.page);
  }

  navigateToPage() {
    return this.navigationPage
  }

  onDatePickerPage() {
    return this.datePickerPage;
  }

  onFormLayoutsPage(){
    return this.formLayoutPage;
  }

}
