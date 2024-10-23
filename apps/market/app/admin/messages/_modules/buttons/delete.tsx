'use client';
import { DeleteOutlined } from '@ant-design/icons';
import { deleteMessages } from '@pkm/libs/actions/market';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@pkm/ui';
import { FC, ReactElement, useState } from 'react';

export const DeleteMessageButton: FC<{ id: string }> = ({
  id,
}): ReactElement => {
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    await deleteMessages(id);
    setShowModal(false);
  };

  return (
    <Dialog
      open={showModal}
      onOpenChange={() => {
        setShowModal(!showModal);
      }}
    >
      <DialogTrigger asChild>
        <button>
          <DeleteOutlined className="text-2xl text-red" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apakah anda yakin?</DialogTitle>
          <DialogDescription>Pesan akan dihapus dari tabel</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleDelete} color="red">
            Hapus
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
