import { newSpecPage } from '@stencil/core/testing';
import { MatveevaliAmbulanceWlApp } from '../matveevali-ambulance-wl-app';

describe('matveevali-ambulance-wl-app', () => {

  it('renders editor', async () => {
    const page = await newSpecPage({
      url: `http://localhost/entry/@new`,
      components: [MatveevaliAmbulanceWlApp],
      html: `<matveevali-ambulance-wl-app base-path="/"></matveevali-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual ("matveevali-ambulance-wl-editor");

  });

  it('renders list', async () => {
    const page = await newSpecPage({
      url: `http://localhost/ambulance-wl/`,
      components: [MatveevaliAmbulanceWlApp],
      html: `<matveevali-ambulance-wl-app base-path="/ambulance-wl/"></matveevali-ambulance-wl-app>`,
    });
    page.win.navigation = new EventTarget()
    const child = await page.root.shadowRoot.firstElementChild;
    expect(child.tagName.toLocaleLowerCase()).toEqual("matveevali-ambulance-wl-list");
  });
});