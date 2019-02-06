export interface GenericColumn {
  key: string;
  cellRenderer?: (value: any) => string;
}
