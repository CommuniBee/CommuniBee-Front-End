export interface GenericColumn {
  key: string;
  hebKey: string;
  isTableColumn?: boolean; // default is false
  cellRenderer?: (value: any) => string;
  modalRenderer?: (value: any) => string;
}
