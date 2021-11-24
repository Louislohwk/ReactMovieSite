import axios from "axios";
import { Movie } from "../models/Movie"

const API_URL = process.env.REACT_APP_MOVIEDB_API_URL || '';
const API_KEY = process.env.REACT_APP_MOVIEDB_API_KEY || '';

const defaultMovies: Movie[] = [];

export const getMovies = async (filter: string, page?: number) => {

    if(filter == null) return defaultMovies;

    let _API_URL: string = API_URL;
    let _filter: string = filter?.toLowerCase();
    let _defaultMovies:Movie[] = defaultMovies;

    _API_URL = _filter === "popular" ?
    _API_URL += `movie/${_filter}?api_key=` + API_KEY + "&language=en-US" + `&page=${page}` :
    _API_URL += `${_filter}/movie/week?api_key=` + API_KEY + "&language=en-US" + `&page=${page}`;
    
    
    const response = await axios.get(_API_URL);
    const results = response.data.results;

    _defaultMovies = [...results].map(({id,title,overview,release_date,poster_path}) => ({ id,title,overview,release_date,poster_path}));
    /*
    _defaultMovies.forEach(async (movie:Movie) => {
        const details = await getMovieDetails(movie.id);
        const credits = await getMovieCredits(movie.id);
        movie.run_time = details.runtime;
        movie.vote_count = details.vote_count;
        movie.genres = details.genres;
        movie.castMembers = [...credits.cast].map(({id,name,gender,popularity,character}) => ({id,name,gender,popularity,character}));
    });
    */

    return _defaultMovies;
  };

  export const getSearchMovies = async (search: string, page?: number) => {

    if(search == null) return defaultMovies;

    let _API_URL: string = API_URL;
    let _search: string = search?.toLowerCase();
    let _defaultMovies:Movie[] = defaultMovies;

    _API_URL += `search/movie?api_key=` + API_KEY + "&language=en-US" + `&query=${_search}` + `&page=${page}`
    
    const response = await axios.get(_API_URL);
    const results = response.data.results;

    _defaultMovies = [...results].map(({id,title,overview,release_date,poster_path}) => ({ id,title,overview,release_date,poster_path}));

    return _defaultMovies;
  };

  export const getMovieDetails = async (id: number) => {

    if(id == null) return null;

    let _API_URL: string = API_URL;
    _API_URL += `/movie/${id}?api_key=` + API_KEY;
    
    const response = await axios.get(_API_URL);
    const results = response.data;
    return results;
  };

  export const getMovieCredits = async (id: number) => {

    if(id == null) return null;

    let _API_URL: string = API_URL;
    _API_URL += `/movie/${id}/credits?api_key=` + API_KEY;
    
    const response = await axios.get(_API_URL);
    const results = response.data;
    return results;
  };

  export const getPresonDetails = async (id: number) => {

    if(id == null) return null;

    let _API_URL: string = API_URL;
    _API_URL += `/person/${id}?api_key=` + API_KEY;
    
    const response = await axios.get(_API_URL);
    const results = response.data;
    return results;
  };

  export const getPresonCredits = async (id: number) => {

    if(id == null) return null;

    let _API_URL: string = API_URL;
    _API_URL += `/person/${id}/movie_credits?api_key=` + API_KEY;
    
    const response = await axios.get(_API_URL);
    const results = response.data.cast;
    return results;
  };