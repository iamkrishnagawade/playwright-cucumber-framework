import { Before, After, BeforeAll, AfterAll, Status } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { OurWorld } from "./world";

let browser: Browser;

BeforeAll(async () => {
  browser = await chromium.launch({ headless: true });
});

Before(async function (this: OurWorld) {
  this.context = await browser.newContext();
  this.page = await this.context.newPage();
});

After(async function (this: OurWorld, { result }) {
    if (result?.status === Status.FAILED) {
        const img = await this.page?.screenshot();
        img && this.attach(img, 'image/png');
    }

    await this.page?.close();
    await this.context?.close();
});

AfterAll(async () => {
    await browser.close();
});