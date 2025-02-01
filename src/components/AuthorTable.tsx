import { Author, Authors } from '@/app/types/book';
import { TableContainer, Paper, Table, TableHead, TableBody } from '@mui/material';
import TableCell from '@mui/material/TableCell';

import TableRow from '@mui/material/TableRow';


const AuthorTableRow = ({ author }: { author: Author }) => {
    return (
        <TableRow
            key={author.author_id}>
            <TableCell align="left">{author.author_name}</TableCell>
            <TableCell align="left">
                {author.books.map((book: typeof author.books[0]) => (
                    <div key={book.book_id}>
                        {book.title}
                    </div>
                ))}
            </TableCell>
        </TableRow>
    );
};

function AuthorTable(data: Authors) {
    return <TableContainer component={Paper}>
        <Table aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>Author Name</TableCell>
                    <TableCell>Books</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data.authors.map((author) => (
                    <AuthorTableRow key={author.author_id} author={author} />
                ))}
            </TableBody>
        </Table>
    </TableContainer>;
}

export default AuthorTable;