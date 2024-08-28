import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Textarea,
  TextField,
} from '@pkm/ui';
import { FC, ReactElement } from 'react';
import { TTourFormProps } from './type';

export const TourFormTrigger: FC<TTourFormProps> = ({
  id,
  text,
}): ReactElement => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="capitalize" size={id ? 'sm' : 'md'}>
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0 border-0 max-w-3xl bg-neutral-10%">
        <DialogHeader className="p-5 pb-2.5">
          <DialogTitle className="text-2xl font-bold">
            {!id ? 'Tambah Destinasi Wisata' : ' Edit Destinasi Wisata'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5 w-full border-y border-neutral-60% p-10">
          <div className="max-w-md">
            <TextField placeholder='Masukan nama destinasi'/>
          </div>
          <Textarea placeholder='Masukkan deskripsi' className="min-h-[400px]" />
        </div>
        <DialogFooter className="p-5 pt-2.5 justify-end">
          <Button type="button" variant="primary">
            {!id ? 'Tambah' : 'Edit'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
