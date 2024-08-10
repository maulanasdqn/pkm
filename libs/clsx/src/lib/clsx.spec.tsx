import { render } from '@testing-library/react';

import Clsx from './clsx';

describe('Clsx', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Clsx />);
    expect(baseElement).toBeTruthy();
  });
});
