'use client';

import { EditOutlined } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteImage, uploadImage } from '@pkm/libs/actions';
import {
  getAllCategoriesProduct,
  getOneProduct,
  updateProduct,
} from '@pkm/libs/actions/market';
import { Category } from '@pkm/libs/drizzle/market';
import { CreateProductMarket, TCreateProductMarket } from '@pkm/libs/entities';
import {
  Button,
  ControlledSelect,
  ControlledTextarea,
  ControlledTextField,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  SelectOption,
  DialogTrigger,
  TextField,
} from '@pkm/ui';
import Image from 'next/image';
import {
  ChangeEvent,
  FC,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';

export const EditProductButton: FC<{ id: string }> = ({ id }): ReactElement => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [defaultImage, setDefaultImage] = useState<string>('');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
    reset,
  } = useForm<TCreateProductMarket>({
    mode: 'all',
    resolver: zodResolver(CreateProductMarket),
  });

  const getCategories = async () => {
    const res = await getAllCategoriesProduct();
    if (res.status.ok) {
      setCategories(res.data);
    }
  };

  const getProduct = useCallback(async () => {
    const res = await getOneProduct(id);
    if (res.status.ok) {
      reset({
        name: res?.data?.name,
        description: res?.data?.description,
        price: res?.data?.price.toString(),
        stock: res?.data?.stock.toString(),
        categoryId: res?.data?.category?.id,
      });
      setDefaultImage(res?.data?.image as string);
    }
  }, [id, reset]);

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
      setError('image', {
        type: 'custom',
        message: undefined,
      });
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (image) {
        const formData = new FormData();
        formData.append('images', image);
        const results = await uploadImage(formData as FormData, 'products');
        if (results) {
          const { uploadedFiles } = results;

          const res = await updateProduct(id, {
            ...data,
            image: uploadedFiles[0].path,
          });

          const fileName = defaultImage.split('/').pop();
          if (fileName) {
            await deleteImage(fileName, 'products');
          }

          if (res.status.ok) {
            setShowModal(false);
            setImage(undefined);
            getProduct();
          }
        }
      } else {
        const res = await updateProduct(id, {
          ...data,
          image: defaultImage,
        });
        if (res.status.ok) {
          setShowModal(false);
          setImage(undefined);
          getProduct();
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  const imageShow = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    } else {
      return undefined;
    }
  }, [image]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      getProduct();
    }
  }, [categories.length, getProduct]);

  return (
    <Dialog
      modal
      open={showModal}
      onOpenChange={() => {
        setShowModal(!showModal);
      }}
    >
      <DialogTrigger asChild>
        <button>
          <EditOutlined className="text-2xl text-secondary" />
        </button>
      </DialogTrigger>

      <DialogContent
        aria-description="Add Modal"
        aria-describedby="Add Modal"
        className="lg:max-w-[880px] sm:max-w-[425px] sm:max-h-[721px] bg-neutral-10%"
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Tambah Produk
          </DialogTitle>
        </DialogHeader>
        <form
          id="produk"
          onSubmit={onSubmit}
          className="w-full flex flex-col lg:flex-row lg:gap-12 gap-6 lg:p-12 p-6"
        >
          <div className="w-full flex flex-col lg:gap-10 gap-6">
            <ControlledTextField
              name="name"
              control={control}
              placeholder="Nama Produk"
              errorMessage={errors.name?.message as string}
              variant={
                errors.name
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />
            <ControlledTextField
              name="price"
              type="number"
              control={control}
              placeholder="Harga"
              errorMessage={errors.price?.message as string}
              variant={
                errors.price
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />
            <ControlledTextarea
              name="description"
              control={control}
              placeholder="Deskripsi"
              errorMessage={errors.description?.message as string}
              variant={
                errors.description
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />

            <div className="flex flex-col gap-4">
              <Image
                src={imageShow || defaultImage}
                alt="image"
                width={100}
                height={100}
                quality={100}
                className="rounded-[4px] object-cover object-center"
              />
              <TextField
                name="image"
                type="file"
                placeholder="Masukan gambar"
                accept="image/*"
                onChange={handleImage}
                errorMessage={errors.image?.message as string}
                variant={
                  errors.image?.message
                    ? 'error'
                    : isSubmitSuccessful
                    ? 'success'
                    : 'default'
                }
              />
            </div>
          </div>

          <div className="w-full flex flex-col lg:gap-10 gap-6">
            <ControlledTextField
              name="stock"
              type="number"
              control={control}
              placeholder="Stok"
              errorMessage={errors.stock?.message as string}
              variant={
                errors.stock
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            />

            <ControlledSelect
              name="categoryId"
              control={control}
              placeholder="Pilih Kategori"
              errorMessage={errors.categoryId?.message as string}
              variant={
                errors.categoryId
                  ? 'error'
                  : isSubmitSuccessful
                  ? 'success'
                  : 'default'
              }
            >
              {categories?.map((category) => (
                <SelectOption key={category.id} value={category.id}>
                  {category.name}
                </SelectOption>
              ))}
            </ControlledSelect>
          </div>
        </form>

        <DialogFooter>
          <Button type="button" color="red" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button type="submit" form="produk">
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
