import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import PrivateRoutes from './privateRoutes';

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
