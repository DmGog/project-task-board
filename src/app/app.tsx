import s from './app.module.scss';
import { Routing } from '@/app/routing';
import { Header } from '@/shared';

function App() {
  return (
    <div className={s.root}>
      <Header />
      <Routing />
    </div>
  );
}

export default App;
