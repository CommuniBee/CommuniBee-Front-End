import BackendModel from '../backend-model';

export interface Category {
  _id: string;
  name: string;
}

export interface CategoryModel extends BackendModel, Category {
}
