import React from 'react';
import { render } from '@testing-library/react';
import { Alert } from './alert';
import '@testing-library/jest-dom';

describe('Alert', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Alert message="The list has been saved." onHide={() => ({})} show />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should render successfully with variant', () => {
    const { baseElement } = render(
      <Alert
        message="The list has been saved."
        variant="success"
        onHide={() => ({})}
        show
      />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should have correct className for success variant', () => {
    const { baseElement } = render(
      <Alert
        message="The list has been saved."
        variant="success"
        onHide={() => ({})}
        show
      />
    );
    expect(baseElement).toHaveClass('border-primary-30%');
  });

  it('should have correct className for warning variant', () => {
    const { baseElement } = render(
      <Alert
        message="The list has been saved."
        variant="warning"
        onHide={() => ({})}
        show
      />
    );
    expect(baseElement).toHaveClass('border-secondary-30%');
  });

  it('should have correct className for error variant', () => {
    const { baseElement } = render(
      <Alert
        message="The list has been saved."
        variant="error"
        onHide={() => ({})}
        show
      />
    );
    expect(baseElement).toHaveClass('border-red-30%');
  });
});
