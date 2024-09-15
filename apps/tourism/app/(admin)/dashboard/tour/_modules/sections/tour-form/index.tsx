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
} from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { TTourFormProps } from './type';
import { useForm } from 'react-hook-form';
import {
  createDestinationSchema,
  TCreateDestinationSchema,
} from '@pkm/libs/entities';
import { zodResolver } from '@hookform/resolvers/zod';
import { createDestination } from '@pkm/libs/actions/tourism';

export const TourFormTrigger: FC<TTourFormProps> = ({
  id,
  text,
}): ReactElement => {
  const {
    control,
    setValue,
    getValues,
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
  const onSubmit = async (values: TCreateDestinationSchema) => {
    try {
      await createDestination({
        ...values,
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="capitalize" size={id ? 'sm' : 'md'}>
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-0 max-w-3xl bg-neutral-10% overflow-hidden">
        <DialogHeader className="p-5 pb-2.5">
          <DialogTitle className="text-2xl font-bold">
            {!id ? 'Tambah Destinasi Wisata' : ' Edit Destinasi Wisata'}
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
              errors.name ? 'error' : isSubmitSuccessful ? 'success' : 'default'
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
              onChange={(event) => {
                const files = event.target.files;
                const values = getValues('images');
                // TODO: upload image to cloudinary
                if (files) {
                  Array.from(files).forEach((file) => {
                    setValue('images', [...values, file.name]);
                  });
                }
              }}
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
            <h2>File yang diunggah</h2>
            <div className="flex justify-center items-center w-full rounded border border-neutral-60% p-5 min-h-[100px]">
              <h3 className="text-center text-neutral-60%">
                Belum ada file yang diunggah
              </h3>
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
          <Button form="destination-form" type="submit" variant="primary">
            {!id ? 'Tambah' : 'Edit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
