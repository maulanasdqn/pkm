import { TInformationSchema } from '@pkm/libs/entities';

export type InformationDetailModuleProps = TInformationSchema & {
  otherInformations: TInformationSchema[];
};
