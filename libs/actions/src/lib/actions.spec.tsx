import { render } from '@testing-library/react';

import Actions from './actions';

describe('Actions', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Actions />);
    expect(baseElement).toBeTruthy();
  });
});
