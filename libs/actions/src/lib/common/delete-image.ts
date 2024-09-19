'use server';

import { access, unlink } from 'fs/promises';
import path from 'path';

export const deleteImage = async (fileName: string, folderName: string) => {
  try {
    const filePath = path.join(process.cwd(), 'public', folderName, fileName);

    // Check if file exists
    await access(filePath);

    // Delete the file
    await unlink(filePath);

    return { message: 'File deleted successfully' };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return { error: 'File not found' };
    }
    console.error('Error deleting file:', error);
    return { error: 'Internal Server Error' };
  }
};
