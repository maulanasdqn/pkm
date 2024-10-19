'use server';
import { UTApi } from 'uploadthing/server';
import { DatabaseError } from 'pg';

const utapi = new UTApi();

export const deleteImageUT = async (url: string) => {
  try {
    const fileKey = url.split('/').pop();
    if (fileKey) {
      await utapi.deleteFiles(fileKey);
    }

    return {
      status: { ok: true },
      message: 'Image from UploadThing deleted successfully',
    };
  } catch (error) {
    if (error instanceof DatabaseError) {
      console.error(error);
      throw new Error(error.message);
    }
    throw new Error(error as string);
  }
};
