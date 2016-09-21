import { TriniSaludWebPage } from './app.po';

describe('trini-salud-web App', function() {
  let page: TriniSaludWebPage;

  beforeEach(() => {
    page = new TriniSaludWebPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
