import { newSpecPage } from '@stencil/core/testing';
import { MatveevaliAmbulanceWlList } from '../matveevali-ambulance-wl-list';

describe('matveevali-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MatveevaliAmbulanceWlList],
      html: `<matveevali-ambulance-wl-list></matveevali-ambulance-wl-list>`,
    });
    const wlList = page.rootInstance as PfxAmbulanceWlList;
    const expectedPatients = wlList?.waitingPatients?.length 

    const items = page.root.shadowRoot.querySelectorAll("md-list-item");
    expect(items.length).toEqual(expectedPatients);
  });
});
