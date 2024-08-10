import { configEnv } from './env';

describe('Test Env', () => {
  it('Env should have base url', () => {
    expect(configEnv.NEXT_PUBLIC_BASE_URL).toBe('http://localhost:3000'); 
  });
});
