export interface Book {
    book_author: {
        author_id: number | null;
        author_name: string | null;
    }
    coverImageUrl?: string;
    book_id?: number | null;
    isbn13?: number;
    title: string | null;
    authorId?: number | null;
}

export interface Author {
    author_name: string | null;
    author_id: number;
    books: {
        title: string | null | undefined; 
        book_id: number | undefined
    }[];
}

export interface Authors {
    authors: Author[]
}