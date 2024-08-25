export type TAlert = {
  message: string;
  y?: number;
  timer?: number;
  onHide?: () => void;
  show: boolean;
};
