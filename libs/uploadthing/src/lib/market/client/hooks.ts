import { generateReactHelpers } from '@uploadthing/react';
import { OurFileRouter } from '../server/core';

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
