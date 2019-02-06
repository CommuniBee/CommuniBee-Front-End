export interface GenericColumn {
  key: string;
  hebKey: string;
  inTable?:boolean;
  cellRenderer?: (value: any) => string;
  modalRenderer?: (value: any) => string;
}
