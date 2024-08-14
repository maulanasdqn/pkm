import React, { FC, ReactElement } from 'react';
import { render } from '@testing-library/react';
import { ControlledTextField, TextField } from './textfield';
import '@testing-library/jest-dom';
import { useForm } from 'react-hook-form';

const ControlledMockTextField: FC = (): ReactElement => {
  const { control } = useForm({
    mode: 'all',
  });

  return <ControlledTextField name="test" control={control} />;
};

describe('TextField', () => {
  it('should have render successfully', () => {
    const { baseElement } = render(<TextField />);
    expect(baseElement).toBeTruthy();
  });

  it('should have base className', () => {
    const { baseElement } = render(<TextField />);
    expect(baseElement).toHaveClass(
      'w-full border px-4 py-2.5 rounded-[4px] focus:outline-none font-medium disabled:cursor-not-allowed disabled:border-neutral-60% disabled:text-neutral-50% disabled:bg-neutral-10% disabled:placeholder:text-neutral-50%'
    );
  });

  it('should have correct className when variant is default', () => {
    const { baseElement } = render(<TextField variant="default" />);
    expect(baseElement).toHaveClass(
      'border-neutral-60% placeholder:text-neutral-60%'
    );
  });

  it('should have correct className when variant is success', () => {
    const { baseElement } = render(<TextField variant="success" />);
    expect(baseElement).toHaveClass(
      'bg-white border-primary-50% text-neutral-70%'
    );
  });

  it('should have correct className when variant is info', () => {
    const { baseElement } = render(<TextField variant="info" />);
    expect(baseElement).toHaveClass(
      'bg-white border-blue-80% text-neutral-80%'
    );
  });

  it('should have correct className when variant is error', () => {
    const { baseElement } = render(<TextField variant="error" />);
    expect(baseElement).toHaveClass(
      'bg-white border-red-60% text-red-50% placeholder:text-red-50%'
    );
  });
});

describe('Controlled TextField', () => {
  it('should have render successfully', () => {
    const { baseElement } = render(<ControlledMockTextField />);
    expect(baseElement).toBeTruthy();
  });
});
