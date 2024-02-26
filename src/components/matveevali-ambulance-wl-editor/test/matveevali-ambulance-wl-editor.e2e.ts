import { newE2EPage } from '@stencil/core/testing';

describe('matveevali-ambulance-wl-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<matveevali-ambulance-wl-editor></matveevali-ambulance-wl-editor>');

    const element = await page.find('matveevali-ambulance-wl-editor');
    expect(element).toHaveClass('hydrated');
  });
});
