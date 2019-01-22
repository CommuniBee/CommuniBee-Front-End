import BackendModel from '../backend-model';

export interface Category {
  name: string;
}

export interface CategoryModel extends BackendModel, Category {
}
