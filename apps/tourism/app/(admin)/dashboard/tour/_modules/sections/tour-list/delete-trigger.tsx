import { deleteDestination } from '@pkm/libs/actions/tourism';
import {
  Alert,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@pkm/ui';
import { FC, ReactElement, useState } from 'react';

export const DeleteTrigger: FC<{ id: string }> = ({ id }): ReactElement => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleDelete = async () => {
    await deleteDestination(id);
    setIsSuccess(true);
  };
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button size="sm" variant="primary" color="red">
            Hapus
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 border-0 max-w-md overflow-hidden">
          <DialogHeader className="p-5 pb-2.5">
            <DialogTitle className="text-2xl font-bold">
              Apakah anda yakin?
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="p-5">
            Setelah dihapus data tidak dapat dikembalikan, apakah anda yakin
            ingin menghapus data ini?
          </DialogDescription>
          <DialogFooter className="p-5 pt-2.5 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="text" color="black" key={id}>
                Batal
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="button"
                variant="primary"
                color="secondary"
                onClick={handleDelete}
              >
                Ya saya yakin
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Alert
        show={isSuccess}
        onHide={() => setIsSuccess(false)}
        message="data berhasil dihapus"
        variant="success"
        timer={3000}
      />
    </>
  );
};
