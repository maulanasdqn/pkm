'use client';
import { EditFilled } from '@ant-design/icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { deleteImage, uploadImage } from '@pkm/libs/actions';
import { getOneUser, updateUser } from '@pkm/libs/actions/market';
import { Users } from '@pkm/libs/drizzle/market';
import { ProfileSchemaMarket, TProfileMarket, TUser } from '@pkm/libs/entities';
import {
  Button,
  ControlledSelect,
  ControlledTextarea,
  ControlledTextField,
  SelectOption,
  TextField,
} from '@pkm/ui';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import {
  FC,
  Fragment,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';

export const ProfileModule: FC = (): ReactElement => {
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<TProfileMarket>({
    mode: 'all',
    resolver: zodResolver(ProfileSchemaMarket),
  });

  const [isEdit, setIsEdit] = useState(false);
  const [defaultImage, setDefaultImage] = useState<string>('');
  const [image, setImage] = useState<File | undefined>(undefined);

  const { data: session } = useSession();

  const handleUser = useCallback(async () => {
    const res = await getOneUser(session?.user?.id as string);

    if (res?.status?.ok) {
      reset({
        fullname: res?.data?.fullname,
        email: res?.data?.email,
        phoneNumber: res?.data?.phoneNumber as string,
        address: res?.data?.address,
        gender: res?.data?.gender,
        image: res?.data?.image as string,
      });
      setDefaultImage(res?.data?.image as string);
    }
  }, [reset, session?.user?.id]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (image) {
        const formData = new FormData();
        formData.append('images', image);

        const result = await uploadImage(formData, 'profile');

        if (result) {
          const { uploadedFiles } = result;

          const res = await updateUser(session?.user?.id as string, {
            ...data,
            gender: data?.gender,
            image: uploadedFiles[0].path,
          });

          const fileName = defaultImage?.split('/').pop();
          if (fileName) {
            await deleteImage(fileName, 'profile');
          }

          if (res.status.ok) {
            setIsEdit(false);
            await handleUser();
          }
        }
      } else {
        const res = await updateUser(session?.user?.id as string, {
          ...data,
          image: defaultImage as string,
        });

        if (res.status.ok) {
          setIsEdit(false);
          await handleUser();
        }
      }
    } catch (error) {
      console.error(error);
    }
  });

  useEffect(() => {
    handleUser();
  }, [handleUser]);

  const showImage = useMemo(() => {
    if (image) {
      return URL.createObjectURL(image);
    }
  }, [image]);

  return (
    <section className="container mx-auto w-full h-full flex flex-col p-12 gap-10">
      <h2 className="text-4xl">Profil Saya</h2>

      <div className="w-full rounded-lg bg-neutral-10% shadow-md">
        <div className="w-full px-14 py-6 bg-neutral-40% rounded-t-lg">
          <h3 className="text-2xl text-neutral-80%">Informasi Akun</h3>
        </div>

        <div className="flex gap-20 p-14">
          <figure className="relative">
            <Image
              src={showImage || defaultImage}
              alt="Profile"
              width={500}
              height={500}
              quality={100}
              className="rounded-lg object-cover object-center min-w-[410px] max-w-[410px] min-h-[345px] max-h-[345px]"
            />
            {isEdit && (
              <Fragment>
                <TextField
                  id="image"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setImage(e.target.files?.[0]);
                    }
                  }}
                />
                <label
                  htmlFor="image"
                  className="absolute flex items-center justify-center -bottom-5 -right-5 cursor-pointer bg-white rounded-full size-16"
                >
                  <EditFilled className="text-neutral-90% text-3xl" />
                </label>
              </Fragment>
            )}
          </figure>
          <div className="w-full flex flex-col items-center gap-8">
            <form
              onSubmit={onSubmit}
              className="w-full grid grid-cols-2 gap-x-8 gap-y-12 h-fit"
            >
              <ControlledTextField
                name="fullname"
                placeholder="Nama lengkap"
                variant={
                  errors.fullname
                    ? 'error'
                    : isSubmitSuccessful
                    ? 'success'
                    : 'default'
                }
                control={control}
                disabled={!isEdit}
                errorMessage={errors.fullname?.message}
              />

              <ControlledTextField
                name="email"
                placeholder="Email"
                type="email"
                control={control}
                disabled={!isEdit}
                errorMessage={errors.email?.message}
                variant={
                  errors.email
                    ? 'error'
                    : isSubmitSuccessful
                    ? 'success'
                    : 'default'
                }
              />

              <ControlledSelect
                name="gender"
                placeholder="Jenis kelamin"
                control={control}
                disabled={!isEdit}
                variant={
                  errors.gender
                    ? 'error'
                    : isSubmitSuccessful
                    ? 'success'
                    : 'default'
                }
                errorMessage={errors.gender?.message}
              >
                <SelectOption id="male" value="male">
                  Laki-laki
                </SelectOption>
                <SelectOption id="female" value="female">
                  Perempuan
                </SelectOption>
              </ControlledSelect>

              <ControlledTextField
                name="phoneNumber"
                placeholder="No. telepon"
                type="number"
                control={control}
                disabled={!isEdit}
                errorMessage={errors.phoneNumber?.message}
                variant={
                  errors.phoneNumber
                    ? 'error'
                    : isSubmitSuccessful
                    ? 'success'
                    : 'default'
                }
              />

              <ControlledTextarea
                name="address"
                placeholder="Alamat"
                control={control}
                disabled={!isEdit}
                errorMessage={errors.address?.message}
                variant={
                  errors.address
                    ? 'error'
                    : isSubmitSuccessful
                    ? 'success'
                    : 'default'
                }
              />

              {isEdit && (
                <Button type="submit" variant="secondary">
                  Simpan
                </Button>
              )}
            </form>

            <Button
              onClick={() => {
                setImage(undefined);
                setIsEdit(!isEdit);
              }}
              variant="primary"
              className="w-full"
              color={isEdit ? 'red' : 'blue'}
            >
              {isEdit ? 'Batal' : 'Edit'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
