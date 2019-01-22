import BackendModel from '../backend-model';
import { Category, CategoryModel } from '../category/category';

export interface Content {
  title: string;
  file: string;
  fileName: string;
  category: Category | CategoryModel;
  tags?: string[];
}

export interface ContentModel extends BackendModel, Content {
}
