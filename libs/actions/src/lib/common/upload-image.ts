'use server';

import { writeFile } from 'fs/promises';
import { join } from 'path';

export const uploadImage = async (data: FormData, folderName: string) => {
  try {
    const files = data.getAll('images') as File[];

    if (files.length === 0) {
      throw new Error('No files uploaded');
    }

    const results = await Promise.all(
      files.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate a unique filename
        const uniqueFilename = `${Date.now()}-${file.name}`;
        const path = join(process.cwd(), 'public', folderName, uniqueFilename);

        await writeFile(path, buffer);
        return {
          originalName: file.name,
          path: `/${folderName}/${uniqueFilename}`,
        };
      })
    );

    return { success: true, uploadedFiles: results };
  } catch (err) {
    console.error(err);
    throw new Error(err as string);
  }
};
