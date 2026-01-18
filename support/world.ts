import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { BrowserContext, Page } from '@playwright/test';

export class OurWorld extends World {
  page?: Page;
  context?: BrowserContext;

  // page object instances can be added here

  constructor(options: IWorldOptions) {
    super(options);
  }

  // helper to initialize page and context
  initPages(){
  }
}

setWorldConstructor(OurWorld);