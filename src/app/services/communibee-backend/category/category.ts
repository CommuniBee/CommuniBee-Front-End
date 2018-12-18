import BackendModel from '../backend-model';

export interface CategoryModel extends BackendModel, Category {
}

export interface Category {
  displayName: string;
}
