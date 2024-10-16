import { generateReactHelpers } from '@uploadthing/react';
import { TTourismFileRouter } from '../server';

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<TTourismFileRouter>();
