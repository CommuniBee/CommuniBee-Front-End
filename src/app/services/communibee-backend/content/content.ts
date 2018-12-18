import BackendModel from '../backend-model';
import { Category, CategoryModel } from '../category/category';

export interface ContentModel extends BackendModel, Content {
}

export interface Content {
  title: string;
  files: string[];
  category: Category | CategoryModel;
  tags: string[];
}
