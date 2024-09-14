import { Routes, Route } from 'react-router-dom';
import './App.css';
import './App.css';
import Home from './pages/Home.tsx';
import NoPage from './pages/NoPage.tsx';
import Layout from './components/Layout.tsx';
import Search from './pages/Search.tsx';
import Dashboard from './pages/Dashboard.tsx';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
}

