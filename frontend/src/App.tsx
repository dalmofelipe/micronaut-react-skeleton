import Button from '@mui/material/Button';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { create } from 'zustand';
import './App.css';
import axiosLogo from './assets/axios.svg';
import muiLogo from './assets/mui.svg';
import reactQueryLogo from './assets/query.png';
import reactLogo from './assets/react.svg';
import zustandLogo from './assets/zustand.svg';
import viteLogo from '/vite.svg';
import { Box } from '@mui/material';
import { purple } from '@mui/material/colors';

// Zustand store
const useCounterStore = create<{ count: number; inc: () => void }>((set) => ({
  count: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
}));

// React Query
const fetchData = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  return res.data;
};

const queryClient = new QueryClient();

function DemoComponent() {
  const { count, inc } = useCounterStore();
  const { data, isLoading } = useQuery({
    queryKey: ['demo'],
    queryFn: fetchData,
  });

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 16,
    }}>
      <div>
        <h2>Exemplo Zustand + MUI</h2>
        <Button
          variant="contained"
          onClick={inc}
          sx={{ 
            backgroundColor: purple[900], 
            '&:hover': { backgroundColor: purple[800] } 
          }}
        >
          Zustand count: {count}
        </Button>
      </div>

      <div>
        <h2>Exemplo React Query + Axios</h2>
        {isLoading ? <p>Carregando...</p> : <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </Box>
  );
}

function App() {
  // const [count, setCount] = useState(0)
  const { count, inc } = useCounterStore();

  return (
    <QueryClientProvider client={queryClient}>
      <>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" data-color="#646cff" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" data-color="#61dafb" />
          </a>
          <a href="https://axios-http.com/" target="_blank">
            <img src={axiosLogo} className="logo" alt="Axios logo" data-color="#5a29e4" />
          </a>
          <a href="https://tanstack.com/query/latest" target="_blank">
            <img src={reactQueryLogo} className="logo" alt="React Query logo" data-color="#ff4154" />
          </a>
          <a href="https://zustand-demo.pmnd.rs/" target="_blank">
            <img src={zustandLogo} className="logo" alt="Zustand logo" data-color="#ffb300" />
          </a>
          <a href="https://mui.com/" target="_blank">
            <img src={muiLogo} className="logo" alt="MUI logo" data-color="#007fff" />
          </a>
        </div>
        <h1>Vite + React + Axios<br />React Query + Zustand + MUI</h1>
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          gap: 16,
        }}>
          <div>
            <button onClick={() => inc()}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.tsx</code> and save to test HMR
            </p>
          </div>

          <DemoComponent />
        </Box>
      </>
    </QueryClientProvider>
  )
}

export default App
