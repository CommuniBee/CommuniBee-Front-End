export interface GenericColumn {
  key: string;
  hebKey: string;
  isTableColumn?: boolean; // default is false
  isTitleColumn?: (obj: any) => boolean;
  cellRenderer?: (value: any) => string;
  modalRenderer?: (value: any) => string;
}
