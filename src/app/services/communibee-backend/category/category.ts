import BackendModel from '../backend-model';

export interface Category {
  displayName: string;
}

export interface CategoryModel extends BackendModel, Category {
}
