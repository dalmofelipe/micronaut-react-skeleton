import { Button, Paper, styled, Typography } from "@mui/material";
import { getBookById } from "../services/useBookService";
import { useCounter } from "../store/useCounterStore";
import { useState } from "react";

const BookCounterWrapper = styled(Paper)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.background.paper};
  gap: 20px;
  border-radius: 5px;
  padding: 10px;
`;

const BoxColCenter = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`

const randomIndex = () : number => {
  const ids = [1, 2, 3];
  return ids[Math.floor(Math.random() * ids.length)];
}

export const BookCounter = () => {
  const { count, increment } = useCounter();
  const [ bookId ] = useState(() => randomIndex());
  const { book, isLoadingBook } = getBookById(bookId);

  return (
    <BookCounterWrapper>
      <BoxColCenter>
        <Typography variant="h5">Exemplo Zustand + MUI</Typography>

        <Button variant="contained" onClick={increment}>
          Zustand count: {count}
        </Button>
      </BoxColCenter>

      <BoxColCenter>
        <Typography variant="h5">Exemplo React Query + Axios</Typography>
        <Typography variant="h6">Consulta ao Backend /books</Typography>
        {isLoadingBook 
          ? <p>Carregando...</p> 
          : <pre style={{ textAlign: 'left' }}>
              {JSON.stringify(book, null, 2)}
            </pre>
        }
        {!isLoadingBook && book === undefined && <p>Não foi possível carregar dados...</p>}
      </BoxColCenter>
    </BookCounterWrapper>
  );
}
