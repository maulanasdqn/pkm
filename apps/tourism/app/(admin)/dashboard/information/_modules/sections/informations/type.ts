export type TInformationItemProps = {
  item: TInformation;
};

export type TInformation = {
  id: number;
  img: string;
  createdAt: string;
  location: string;
  title: string;
  content: string;
};
