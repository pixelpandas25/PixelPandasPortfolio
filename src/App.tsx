import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router';
import { SplashScreen } from './components/layout/SplashScreen';

function App() {
  return (
    <>
      <SplashScreen />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
