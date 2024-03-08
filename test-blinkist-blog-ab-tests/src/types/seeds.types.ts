export type Articles = Article[];

export type Category = {
  id: number;
  name: string;
}

export type Editor = {
  id: number;
  name: string;
}

export type Article = {
  id: number;
  title: string;
  content: string;
  editor: Editor;
  category: Category;
}

export type Variation = {
  id: number;
  category: Category;
  content: string;
}
