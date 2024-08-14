import React from 'react';
import { render } from '@testing-library/react';
import { Button } from './button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button size="md">Button</Button>);
    expect(baseElement).toBeTruthy();
  });
});
