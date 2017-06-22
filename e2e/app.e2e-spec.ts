import { GdssPage } from './app.po';

describe('gdss App', () => {
  let page: GdssPage;

  beforeEach(() => {
    page = new GdssPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
