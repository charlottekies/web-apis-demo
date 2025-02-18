import { NextResponse } from "next/server";
import { getAllBooks } from "../../service/bookService";

export async function GET() {
    const books = await getAllBooks({includeAuthor: true, includeImage: true})
    return NextResponse.json(books, { status: 200 });
  }