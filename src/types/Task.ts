export type Task = {
  id: string;
  title: string;
  completed: boolean;
  description: string | null;
  category_id: string;
  category: string | null
  color: string
};