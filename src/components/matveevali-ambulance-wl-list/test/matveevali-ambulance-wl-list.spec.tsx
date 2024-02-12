import { newSpecPage } from '@stencil/core/testing';
import { MatveevaliAmbulanceWlList } from '../matveevali-ambulance-wl-list';

describe('matveevali-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MatveevaliAmbulanceWlList],
      html: `<matveevali-ambulance-wl-list></matveevali-ambulance-wl-list>`,
    });
    expect(page.root).toEqualHtml(`
      <matveevali-ambulance-wl-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </matveevali-ambulance-wl-list>
    `);
  });
});
