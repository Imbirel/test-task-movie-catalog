import { BrowserRouter, Route, Routes } from 'react-router';
import { CatalogPage } from '@/pages/CatalogPage/CatalogPage';
import { NotFound } from '@/pages/NotFound/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<CatalogPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
