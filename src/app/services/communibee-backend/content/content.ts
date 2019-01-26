import BackendModel from '../backend-model';
import { Category, CategoryModel } from '../category/category';

export interface BasicContent {
  title: string;
}

export interface Content extends BasicContent {
  file: string;
  fileName: string;
  category: Category | CategoryModel;
  tags?: string[];
}

export interface BasicContentModel extends BackendModel, BasicContent {
}

export interface ContentModel extends BackendModel, Content {
}
