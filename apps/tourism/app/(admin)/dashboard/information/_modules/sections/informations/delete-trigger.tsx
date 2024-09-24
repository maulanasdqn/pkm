'use client';
import * as React from 'react';
import { DeleteFilled } from '@ant-design/icons';
import {
  DialogHeader,
  DialogFooter,
  Button,
  DialogClose,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  Alert,
} from '@pkm/ui';
import { deleteInformation } from '@pkm/libs/actions/tourism';

export const DeleteTrigger: React.FC<{
  id: string;
}> = ({ id }): React.ReactElement => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const handleDelete = async () => {
    await deleteInformation(id);
    setIsSuccess(true);
    setIsOpen(false);
  };
  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button size="icon" color="red">
            <DeleteFilled />
          </Button>
        </DialogTrigger>
        <DialogContent className="p-0 border-0 max-w-md bg-neutral-10% overflow-hidden">
          <DialogHeader className="p-5 pb-2.5">
            <DialogTitle className="text-2xl font-bold">
              Apakah anda yakin?
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-5 w-full border-y border-neutral-60% px-5 py-10 overflow-y-auto">
            <p>
              Setelah dihapus data tidak dapat dikembalikan, apakah anda yakin
              ingin menghapus informasi ini?
            </p>
          </div>
          <DialogFooter className="p-5 pt-2.5 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="text" color="black">
                Batalkan
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="primary"
              color="red"
              onClick={handleDelete}
            >
              Ya saya yakin
            </Button>
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
