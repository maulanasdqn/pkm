'use client';
import {
  Alert,
  Button,
  ControlledTextarea,
  ControlledTextField,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  TextField,
} from '@pkm/ui';
import {
  ChangeEvent,
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { TInformationFormTrigger } from './type';
import { EditFilled, Loading3QuartersOutlined } from '@ant-design/icons';
import {
  changeFileNameTourism,
  compressImageTourism,
  createInformationSchema,
  TCreateInformationSchema,
} from '@pkm/libs/entities';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createInformation,
  getOneInformation,
  updateInformation,
} from '@pkm/libs/actions/tourism';
import Image from 'next/image';
import { useUploadThing } from '@pkm/libs/uploadthing/tourism/client';

export const InformationFormTrigger: FC<TInformationFormTrigger> = ({
  id,
  text,
}): ReactElement => {
  const {
    control,
    setValue,
    watch,
    setError,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TCreateInformationSchema>({
    resolver: zodResolver(createInformationSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      location: '',
    },
    mode: 'all',
  });

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState(isSubmitSuccessful);
  const { startUpload, isUploading } = useUploadThing('imageUploader');

  const onSubmit = async (values: TCreateInformationSchema) => {
    try {
      if (values.image.length === 0) {
        return setError('image', {
          type: 'custom',
          message: 'Minimal harus ada 1 gambar yang diunggah',
        });
      }

      if (id) {
        await updateInformation({ ...values, id });
        setIsLoading(true);
      } else {
        await createInformation({
          ...values,
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
    if (files) {
      Array.from(files).forEach(async (file) => {
        const newFile = changeFileNameTourism({
          file,
          prefix: 'information',
          uniqueId: Date.now().toLocaleString(),
        });

        const compressedFile = await compressImageTourism(newFile, {
          quality: 0.6,
          type: 'image/jpeg',
        });

        if (compressedFile) {
          const res = await startUpload([compressedFile]);
          if (res) {
            setValue('image', res[0].appUrl);
          }
        }
      });
    }
  };

  const fetchData = useCallback(async () => {
    if (!id) return;
    const { data } = await getOneInformation(id);
    if (data) {
      setValue('title', data.title);
      setValue('description', data.description);
      setValue('location', data.location);
      setValue('image', data.image);
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
    <Fragment>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="capitalize" size={id ? 'icon' : 'md'}>
            {text === 'edit' ? <EditFilled /> : text}
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 border-0 max-w-3xl bg-neutral-10% overflow-hidden">
          <DialogHeader className="p-5 pb-2.5">
            <DialogTitle className="text-2xl font-bold">
              {!id ? 'Tambah Informasi Wisata' : ' Edit Informasi Wisata'}
            </DialogTitle>
          </DialogHeader>
          <form
            id="form-information"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5 w-full h-[60dvh] border-y border-neutral-60% p-10 overflow-y-auto"
          >
            <ControlledTextField
              name="title"
              placeholder="Masukan judul informasi"
              control={control}
              errorMessage={errors.title?.message}
              variant={
                errors.title
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />
            <ControlledTextField
              name="location"
              placeholder="Lokasi informasi"
              control={control}
              errorMessage={errors.location?.message}
              variant={
                errors.location
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />
            <TextField
              name="image"
              type="file"
              placeholder="Masukan gambar"
              accept="image/*"
              onChange={handleChange}
              errorMessage={errors.image?.message as string}
              variant={
                errors.image
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />
            <div className="flex flex-col gap-2">
              <h2>
                File yang diunggah{' '}
                {isUploading && (
                  <Loading3QuartersOutlined className="ml-2.5 animate-spin" />
                )}
              </h2>
              <div className="flex justify-center items-center w-full rounded border border-neutral-60% p-5 min-h-[100px]">
                {watch('image').length > 0 ? (
                  <div className="w-[100px] h-[100px] rounded">
                    <Image
                      className="w-[100px] h-[100px] object-cover -z-10 group-hover:blur-sm group-hover:opacity-70 transition-all duration-200"
                      src={watch('image')}
                      width={100}
                      height={100}
                      alt="thumbnail"
                    />
                  </div>
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
              form="form-information"
              type="submit"
              variant="primary"
              disabled={isLoading || isUploading}
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
    </Fragment>
  );
};
