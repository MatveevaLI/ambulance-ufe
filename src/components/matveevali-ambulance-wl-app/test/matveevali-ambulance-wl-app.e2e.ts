import { newE2EPage } from '@stencil/core/testing';

describe('matveevali-ambulance-wl-app', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<matveevali-ambulance-wl-app></matveevali-ambulance-wl-app>');

    const element = await page.find('matveevali-ambulance-wl-app');
    expect(element).toHaveClass('hydrated');
  });
});
