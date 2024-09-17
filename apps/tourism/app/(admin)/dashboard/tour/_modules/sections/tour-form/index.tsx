import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  SelectOption,
  ControlledTextarea,
  ControlledTextField,
  ControlledSelect,
  DialogDescription,
  TextField,
  Alert,
} from '@pkm/ui';
import { ChangeEvent, FC, ReactElement, useEffect, useState } from 'react';
import { TTourFormProps } from './type';
import { useForm } from 'react-hook-form';
import {
  createDestinationSchema,
  TCreateDestinationSchema,
} from '@pkm/libs/entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDestination } from '@pkm/libs/actions/tourism';
import { uploadImage } from '@pkm/libs/actions';
import Image from 'next/image';
import { LoadingOutlined } from '@ant-design/icons';
export const TourFormTrigger: FC<TTourFormProps> = ({
  id,
  text,
}): ReactElement => {
  const {
    control,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TCreateDestinationSchema>({
    resolver: zodResolver(createDestinationSchema),
    defaultValues: {
      name: '',
      description: '',
      images: [],
      ticketPrice: 0,
      status: undefined,
    },
    mode: 'all',
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isSuccess, setIsSuccess] = useState(isSubmitSuccessful);
  const uploadedImage = getValues('images');
  const onSubmit = async (values: TCreateDestinationSchema) => {
    try {
      const results = await uploadImage(formData as FormData, 'destinations');
      const { uploadedFiles } = results;
      const imagesPath: string[] = [];
      uploadedFiles.forEach((file) => {
        imagesPath.push(file.path);
      });

      await createDestination({
        ...values,
        images: imagesPath,
      });
      setIsLoading(true);
    } catch (error) {
      console.error(error);
    } finally {
      reset();
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    const formData = new FormData();
    if (files) {
      Array.from(files).forEach((file) => {
        formData.append(`images`, file);
      });
    }
    setFormData(formData);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsSuccess(isSubmitSuccessful);
    }
  }, [isSubmitSuccessful]);
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="capitalize" size={id ? 'sm' : 'md'}>
            {text}
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 border-0 max-w-3xl bg-neutral-10% overflow-hidden">
          <DialogHeader className="p-5 pb-2.5">
            <DialogTitle className="text-2xl font-bold">
              {!id ? 'Tambah Destinasi Wisata' : ' Edit Destinasi Wisata'}{' '}
              <span>
                {isLoading ? <LoadingOutlined className="animate-spin" /> : ''}
              </span>
            </DialogTitle>
            <DialogDescription>
              Silahkan lengkapi data destinasi wisata
            </DialogDescription>
          </DialogHeader>
          <form
            id="destination-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full h-[60dvh] border-y border-neutral-60% p-10 overflow-y-auto"
          >
            <ControlledSelect
              name="status"
              placeholder="Pilih Status"
              control={control}
              errorMessage={errors.status?.message}
              variant={
                errors.status
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            >
              <SelectOption value="active">Aktif</SelectOption>
              <SelectOption value="inactive">Tidak Aktif</SelectOption>
            </ControlledSelect>
            <ControlledTextField
              name="name"
              placeholder="Masukan nama destinasi"
              control={control}
              errorMessage={errors.name?.message}
              variant={
                errors.name
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />
            <ControlledTextField
              name="ticketPrice"
              placeholder="Masukan harga tiket"
              type="number"
              min={0}
              control={control}
              errorMessage={errors.ticketPrice?.message}
              variant={
                errors.ticketPrice
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="image">Unggah Gambar</label>
              <TextField
                name="images"
                type="file"
                placeholder="Masukan gambar"
                accept="image/*"
                onChange={handleChange}
                multiple
                errorMessage={errors.images?.message as string}
                variant={
                  errors.images
                    ? 'error'
                    : isSubmitSuccessful
                    ? 'success'
                    : 'default'
                }
              />
            </div>
            <div className="flex flex-col gap-2">
              <h2>File yang diunggah </h2>
              <div className="flex justify-center items-center w-full gap-2 rounded border border-neutral-60% p-5 min-h-[100px]">
                {uploadedImage.length > 0 ? (
                  uploadedImage.map((image) => (
                    <Image
                      key={image}
                      className="w-[100px] h-[100px] object-cover"
                      src={image}
                      width={100}
                      height={100}
                      alt="thumbnail"
                    />
                  ))
                ) : (
                  <h3 className="text-center text-neutral-60%">
                    Belum ada file yang diunggah
                  </h3>
                )}
              </div>
            </div>
            <ControlledTextarea
              name="description"
              placeholder="Masukkan deskripsi"
              className="min-h-[200px]"
              control={control}
              errorMessage={errors.description?.message}
              variant={
                errors.description
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />
          </form>
          <DialogFooter className="p-5 pt-2.5 justify-end">
            <Button
              form="destination-form"
              type="submit"
              variant="primary"
              disabled={isLoading}
            >
              {!id ? 'Tambah' : 'Edit'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Alert
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        message={id ? 'Data berhasil diubah' : 'Data berhasil ditambahkan'}
        variant="success"
        timer={3000}
      />
    </>
  );
};
