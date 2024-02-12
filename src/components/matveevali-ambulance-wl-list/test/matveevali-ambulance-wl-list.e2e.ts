import { newE2EPage } from '@stencil/core/testing';

describe('matveevali-ambulance-wl-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<matveevali-ambulance-wl-list></matveevali-ambulance-wl-list>');

    const element = await page.find('matveevali-ambulance-wl-list');
    expect(element).toHaveClass('hydrated');
  });
});
