import { credentialsProvider } from './credential';
import { googleProvider } from './google';

export const authProvider = [credentialsProvider, googleProvider];
