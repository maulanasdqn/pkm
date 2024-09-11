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
import { TInformationFormTrigger } from './type';
import { EditFilled } from '@ant-design/icons';

export const InformationFormTrigger: FC<TInformationFormTrigger> = ({
  id,
  text,
}): ReactElement => {
  return (
    <Dialog>
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
        <div className="flex flex-col gap-5 w-full h-[60dvh] border-y border-neutral-60% p-10 overflow-y-auto">
          <TextField placeholder="Masukan judul informasi" />
          <TextField placeholder="Lokasi informasi" />
          <TextField type="file" multiple placeholder="Masukan gambar" />
          <div className="flex flex-col gap-2">
            <h2>File yang diunggah</h2>
            <div className="flex justify-center items-center w-full rounded border border-neutral-60% p-5 min-h-[100px]">
              <h3 className="text-center text-neutral-60%">
                Belum ada file yang diunggah
              </h3>
            </div>
          </div>
          <Textarea
            placeholder="Masukkan deskripsi"
            className="min-h-[200px]"
          />
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
