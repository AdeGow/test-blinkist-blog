export type Articles = Article[];
export type AbTests = AbTest[];

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
  editor_id: number;
  category_id: number;
}

export type Variation = {
  id: number;
  category_id: number;
  content: string;
}

export type AbTest = {
  id: number;
  article_id: number;
  editor_id: number;
  control_variation: Variation;
  test_variation: Variation;
  start_date: Date;
  end_date: Date;
  is_active: Boolean;
}
