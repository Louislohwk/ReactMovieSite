import {Route, Routes} from 'react-router-dom';
import Popular from './popular/Popular';
import Search from './search/Search';
import Trending from './trending/Trending';

const Router = () => {
  return (
    <Routes>
        <Route path="/" element={<Popular />}>
        </Route>
        <Route path="/popular" element={<Popular />}>
        </Route>
        <Route path="/trending" element={<Trending />}>
        </Route>
        <Route path="/browse" element={<Search />}>
        </Route>
    </Routes>
  );
}

export default Router;