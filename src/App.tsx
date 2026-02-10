import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from '@/pages/Home';
import { Detail } from '@/pages/Detail';
import { SearchPage } from '@/pages/Search';
import { Watch } from '@/pages/Watch';
import { Movies } from '@/pages/Movies';
import { Series } from '@/pages/Series';
import { Genre } from '@/pages/Genre';
import { NewReleases } from '@/pages/NewReleases';
import { MyList } from '@/pages/MyList';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Detail />} />
        <Route path="/series/:id" element={<Detail />} />
        <Route path="/watch/movie/:id" element={<Watch />} />
        <Route path="/watch/series/:id" element={<Watch />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/genre/:genreName" element={<Genre />} />
        <Route path="/new" element={<NewReleases />} />
        <Route path="/my-list" element={<MyList />} />
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
