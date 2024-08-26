import * as React from 'react';
import { FC, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { ControlledTextarea, Textarea } from './textarea';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

const ControlledMockTextarea: FC = (): ReactElement => {
  const { control } = useForm({
    mode: 'all',
  });

  return <ControlledTextarea name="test" control={control} />;
};
describe('Textarea', () => {
  it('should have render successfully', () => {
    const { baseElement } = render(<Textarea />);
    expect(baseElement).toBeTruthy();
  });

  it('should have base className', () => {
    const { baseElement } = render(<Textarea />);
    expect(baseElement).toHaveClass(
      'w-full border px-4 py-2.5 rounded-[4px] focus:outline-none font-medium disabled:cursor-not-allowed disabled:border-neutral-60% disabled:text-neutral-50% disabled:bg-neutral-10% disabled:placeholder:text-neutral-50%'
    );
  });

  it('should have correct className when variant is default', () => {
    const { baseElement } = render(<Textarea variant="default" />);
    expect(baseElement).toHaveClass(
      'border-neutral-60% placeholder:text-neutral-60%'
    );
  });

  it('should have correct className when variant is success', () => {
    const { baseElement } = render(<Textarea variant="success" />);
    expect(baseElement).toHaveClass(
      'bg-white border-primary-50% text-neutral-70%'
    );
  });

  it('should have correct className when variant is info', () => {
    const { baseElement } = render(<Textarea variant="info" />);
    expect(baseElement).toHaveClass(
      'bg-white border-blue-80% text-neutral-80%'
    );
  });

  it('should have correct className when variant is error', () => {
    const { baseElement } = render(<Textarea variant="error" />);
    expect(baseElement).toHaveClass(
      'bg-white border-red-60% text-red-50% placeholder:text-red-50%'
    );
  });
});

describe('Controlled Textarea', () => {
  it('should have render successfully', () => {
    const { baseElement } = render(<ControlledMockTextarea />);
    expect(baseElement).toBeTruthy();
  });
});
