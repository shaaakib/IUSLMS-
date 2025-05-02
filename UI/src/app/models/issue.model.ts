export interface Issue {
    id: number;
    userId: number;
    bookId: number;
    issueDate: string;
    returnDate?: string;
    status?: string;
    quantity?: number;
    user?: {
      id: number;
      name: string;
    };
    book?: {
      id: number;
      title: string;
    };
  }
  