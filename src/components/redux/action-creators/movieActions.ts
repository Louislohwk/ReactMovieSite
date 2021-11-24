import { Movie } from "../../models/Movie";
import { SET_MOVIES_FILTER, SET_MOVIES, SET_MOVIES_PAGE, ADD_TO_MOVIES, UPDATE_MOVIE, SET_SEARCH, MOVIE_SEARCH } from "../actiontypes/movieActionType";

const setMovies = (payload: Movie[]) => {
    return (dispatch:any) => {
        dispatch({
            type: SET_MOVIES,
            movies: payload,
        });
    }
  };
  
  const setFilter = (payload: string) => {
    return (dispatch:any) => {
        dispatch({
            type: SET_MOVIES_FILTER,
            filtername: payload,
        });
    }
  };
  
  const setPage = (payload: number) => {
    return (dispatch:any) => {
        dispatch({
            type: SET_MOVIES_PAGE,
            page: payload,
        });
    }
  };
  
  const addMovies = (payload: Movie[]) => {
    return (dispatch:any) => {
        dispatch({
            type: ADD_TO_MOVIES,
            movies: payload,
        });
    }
  };
  
  const updateMovie = (payload: Movie) => {
    return (dispatch:any) => {
        dispatch({
            type: UPDATE_MOVIE,
            movie: payload,
        });
    }
  };
  
  const setSearch = (payload: string) => {
    return (dispatch:any) => {
        dispatch({
            type: SET_SEARCH,
            search: payload,
        });
    }
  };
  
  const searchMovie = (payload: string) => {
    return (dispatch:any) => {
        dispatch({
            type: MOVIE_SEARCH,
            search: payload,
        });
    }
  };

  export { setFilter, setMovies, setPage, addMovies, updateMovie, setSearch, searchMovie};