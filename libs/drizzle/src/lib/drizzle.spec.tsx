import { render } from '@testing-library/react';

import Drizzle from './drizzle';

describe('Drizzle', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Drizzle />);
    expect(baseElement).toBeTruthy();
  });
});
