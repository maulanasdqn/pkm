type TChangeFileName = {
  prefix: string;
  uniqueId: string;
  file: File;
};

export const changeFileName = (params: TChangeFileName): File => {
  const { prefix, file, uniqueId } = params;

  const newFile = new File(
    [file],
    `${prefix}-${file.name.split('.')[0]}-${uniqueId}.${
      file.name.split('.')[1]
    }`,
    {
      type: file.type,
    }
  );

  return newFile;
};
