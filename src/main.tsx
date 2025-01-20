import { createRoot } from 'react-dom/client';
import './shared/styles/index.scss';
import App from '@/app/app';

createRoot(document.getElementById('root')!).render(<App />);
