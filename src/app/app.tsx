import s from './app.module.css';
import { TextField } from '@/shared';

function App() {
  return (
    <div className={s.root}>
      <div
        style={{
          paddingTop: '50px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <TextField searchIcon type="search" label="поиск" />
        <TextField type="date" label="дата" />
        <TextField type="text" label="текст" />
      </div>
    </div>
  );
}

export default App;
