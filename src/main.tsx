import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './index.css'
import './styles/vairiables.css'
import '../node_modules/bootstrap-icons/font/bootstrap-icons.min.css'
import App from './App.tsx'
import { AuthProvider } from './components/AuthContext/AuthContext.tsx';
import store from './store/store.ts';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <App />
    </AuthProvider>
    </Provider>
  </StrictMode>,
)
