import { useQuery } from "@tanstack/react-query";
import api from "./axios";

export const getBookById = (id: number) => {
  if (typeof id !== 'number' || id <= 0) {
    throw new Error("Invalid book ID. It must be a positive number.");
  }

  const { data, isLoading } = useQuery({
    queryKey: ['book-by-id', id],
    queryFn: async () => await api.get(`/books/${id}`)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(`Error fetching book with id ${id}: ${error.message}`);
      }),
    staleTime: 1000 * 60 * 5,
  });

  return { 
    book: data,
    isLoadingBook: isLoading,
  }
}

export const getAllBooks = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['book-all'],
    queryFn: async () => await api.get(`/books`)
      .then((res) => res.data)
      .catch((error) => {
        throw new Error(`Error fetching all books: ${error.message}`);
      }),
  });

  return { 
    allBooks: data,
    isLoadingAllBooks: isLoading,
  }
}