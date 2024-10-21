import { CheckOutlined } from '@ant-design/icons';
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
import { ButtonsStatus } from './types';
import { updateOrderStatus } from '@pkm/libs/actions/market';
import { OrderStatus } from '@pkm/libs/entities';

export const AcceptButton: FC<ButtonsStatus> = ({ orderId }): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleAccept = async () => {
    await updateOrderStatus(orderId, OrderStatus.APPROVED);
    setShowModal(!showModal);
  };

  return (
    <Dialog
      modal
      open={showModal}
      onOpenChange={() => {
        setShowModal(!showModal);
      }}
    >
      <DialogTrigger asChild>
        <Button variant="text" size="sm" color="black" className="text-center">
          <CheckOutlined className="text-2xl text-primary" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Konfirmasi Pembayaran</DialogTitle>
          <DialogDescription>
            Apa yakin ingin mengonfirmasi pembayaran? Disarankan untuk cek ulang
            kembali bukti pembayaran
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button onClick={handleAccept} type="button">
            Konfirmasi Pembayaran
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
