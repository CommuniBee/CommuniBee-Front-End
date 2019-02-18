export interface GenericColumn {
  key: string;
  hebKey: string;
  hideInTable?: boolean; // default is false
  cellRenderer?: (value: any) => string;
  modalRenderer?: (value: any) => string;
  onClick?: (element: any, event: Event) => void;
}
