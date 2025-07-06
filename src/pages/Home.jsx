import React, { useEffect, useState } from 'react';
import Moviecard from '../components/Moviecard';

const Home = () => {

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");


  useEffect(() => {

    let url = `https://api.themoviedb.org/3/movie/popular?page=${page}&api_key=5699a0033d2cb6496462eec62d3b1596`;

    if (search) {
      url = `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=5699a0033d2cb6496462eec62d3b1596`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => setMovies(data.results));
  }, [page, search]);

  return (
    <div className="p-4 pt-16">
      <input type="text" placeholder="Search Movies..."
        className="p-2 w-3/4 md:w-1/2 border rounded border-gray-700
        bg-gray-900 bg-opacity-60 backdrop-blur-md text-white fixed
        top-16 left-1/2 transform -translate-x-1/2 z-10"
        onChange={(e) => setSearch(e.target.value)} />

      <div className="grid grid-cols-1 md:grid-cols-3-3 lg:grid-cols-4 gap-4 mt-16">
        {movies.map((movies) => {
          return (
            <Moviecard key={movies.id} movie={movies} />
          );

        })}
      </div>
      <div className="pagination-container flex justify-between mt-5">
        <button
          disabled={page == 1}
          className="p-2 bg-gray-700 text-white rounded"
          onClick={() => {
            setPage(prev => prev - 1);
          }}>PREV</button>
        <button className="p-2 bg-gray-700 text-white rounded"
          onClick={() => {
            setPage(prev => prev + 1);
          }}>NEXT</button>
      </div>

    </div>


  );
};

export default Home;