export interface GenericColumn {
  key: string;
  hebKey: string;
  cellRenderer?: (value: any) => string;
}
