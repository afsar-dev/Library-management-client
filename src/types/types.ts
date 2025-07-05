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

export interface ISummary {
  totalQuantity: number;
  book: Book;
}

export interface Book {
  title: string;
  isbn: string;
}
