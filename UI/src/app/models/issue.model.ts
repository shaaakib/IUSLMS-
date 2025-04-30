export interface Issue {
    id: number;
    userId: number;
    bookId: number;
    issueDate: string;
    returnDate?: string;
    user?: {
      id: number;
      name: string;
    };
    book?: {
      id: number;
      title: string;
    };
  }
  