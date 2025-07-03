export interface IClassName {
  className?: string;
}

export interface IBook {
  image: string;
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}
