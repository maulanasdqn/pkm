import { CloseOutlined } from '@ant-design/icons';
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
import { FC, Fragment, ReactElement, useState } from 'react';
import { ButtonsStatus } from './types';
import { updateOrderStatus } from '@pkm/libs/actions/market';
import { OrderStatus } from '@pkm/libs/entities';

export const RejectButton: FC<ButtonsStatus> = ({ orderId }): ReactElement => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleReject = async () => {
    await updateOrderStatus(orderId, OrderStatus.REJECTED);
    setShowModal(!showModal);
  };

  return (
    <Fragment>
      <Dialog
        modal
        open={showModal}
        onOpenChange={() => {
          setShowModal(!showModal);
        }}
      >
        <DialogTrigger asChild>
          <Button
            variant="text"
            size="sm"
            color="black"
            className="text-center"
          >
            <CloseOutlined className="text-2xl text-red" />
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tolak Pembayaran</DialogTitle>
            <DialogDescription>
              Apa yakin ingin menolak pembayaran? Disarankan untuk cek ulang
              kembali bukti pembayaran
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button onClick={handleReject} color="red" type="button">
              Tolak Pembayaran
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};
