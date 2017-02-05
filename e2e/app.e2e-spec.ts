import { PortrWebRebuildPage } from './app.po';

describe('portr-web-rebuild App', function() {
  let page: PortrWebRebuildPage;

  beforeEach(() => {
    page = new PortrWebRebuildPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
