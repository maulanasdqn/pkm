'use client';

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
import {
  ChangeEvent,
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { TTourFormProps } from './type';
import { useForm } from 'react-hook-form';
import {
  createDestinationSchema,
  TCreateDestinationSchema,
} from '@pkm/libs/entities';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createDestination,
  getOneDestination,
  updateDestination,
} from '@pkm/libs/actions/tourism';
import { deleteImage, uploadImage } from '@pkm/libs/actions';
import Image from 'next/image';
import { CloseOutlined, LoadingOutlined } from '@ant-design/icons';
export const TourFormTrigger: FC<TTourFormProps> = ({
  id,
  text,
}): ReactElement => {
  const {
    control,
    setValue,
    handleSubmit,
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
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const onSubmit = async (values: TCreateDestinationSchema) => {
    try {
      const imagesPath: string[] = [];
      if (formData) {
        const results = await uploadImage(formData as FormData, 'destinations');
        if (results) {
          const { uploadedFiles } = results;
          uploadedFiles.forEach((file) => {
            imagesPath.push(file.path);
          });
        } else if (uploadedImages.length > 0) {
          imagesPath.push(...uploadedImages);
        }
      }

      if (id) {
        await updateDestination({ ...values, id, images: imagesPath });
        setIsLoading(true);
      } else {
        await createDestination({
          ...values,
          images: imagesPath,
        });
        setIsLoading(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setIsOpen(false);
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
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

  const handleDeleteImage = async (image: string, index: number) => {
    const fileName = image.split('/').pop();
    const isLocalImg = image.split('.').pop();

    if (uploadedImages.length > 1) {
      setUploadedImages([
        ...uploadedImages.slice(0, index),
        ...uploadedImages.slice(index + 1),
      ]);
    }

    if (isLocalImg && fileName) {
      await deleteImage(fileName, 'destinations');
    }
  };

  const fetchData = useCallback(async () => {
    if (!id) return;
    const { data } = await getOneDestination(id);
    if (data) {
      setValue('name', data.name);
      setValue('description', data.description);
      setValue('ticketPrice', data.ticketPrice);
      setValue('status', data.status);
      setUploadedImages(data.images);

      const formData = new FormData();
      formData.append('uploaded-image', data.images[0]);
      setFormData(formData);
    }
  }, [id, setValue]);

  useEffect(() => {
    if (isSubmitSuccessful) {
      setIsSuccess(isSubmitSuccessful);
    }
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if (id) {
      fetchData();
    }
  }, [fetchData, id]);
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
                {uploadedImages.length > 0 ? (
                  uploadedImages.map((image, index) => (
                    <div
                      key={image}
                      className="group relative w-[100px] h-[100px] rounded cursor-pointer"
                      onClick={() => handleDeleteImage(image, index)}
                    >
                      <span className="group-hover:opacity-100 text-neutral-90% opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                        <CloseOutlined className="text-2xl" />
                      </span>
                      <Image
                        className="w-[100px] h-[100px] object-cover -z-10 group-hover:blur-sm group-hover:opacity-70 transition-all duration-200"
                        src={image}
                        width={100}
                        height={100}
                        alt="thumbnail"
                      />
                    </div>
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
              disabled={isLoading || !formData ? true : false}
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
