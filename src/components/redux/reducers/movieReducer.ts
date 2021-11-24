import internal from "stream";
import { Movie } from "../../models/Movie";
import { MOVIE_SEARCH, SET_MOVIES, SET_MOVIES_FILTER, SET_MOVIES_PAGE, SET_SEARCH, UPDATE_MOVIE } from "../actiontypes/movieActionType";


export const MOVIE_DEFAULT_STATE = {
  movies: [],
  filtername: "Popular",
  page: 1,
  search: ""
};

export interface MovieState {
  movies: Movie[];
  filtername: string;
  page: number;
  search?: string;
}


const movieReducer = (state:MovieState = MOVIE_DEFAULT_STATE, action:any) => {
    switch(action.type) {
      case SET_MOVIES:
        return {
          ...state,
          movies: action.movies
        }
        case SET_MOVIES_FILTER:
        return {
          ...state,
          filtername: action.filtername
        }
        case SET_MOVIES_PAGE:
        return {
          ...state,
          page: action.page
        }
        case UPDATE_MOVIE:
        const _movies = state.movies.map(movie => {
          if (movie.id === action.movie.id) {
            return {...movie, ...action.movie};
          }
          return movie;
        })
        return {
          ...state,
          movies: _movies
        }
        case SET_SEARCH:
        return {
          ...state,
          search: action.search
        }
        case MOVIE_SEARCH:
          if(action.search == ""){
            return {
              ...state,
              movies: state.movies
            }
          }
        const _moviesSearch = state.movies.filter(movie => {
          return movie.title.includes(action.search);
        });
        return {
          ...state,
          movies: _moviesSearch
        }
      default:
        return state;
    }
  }
  
  export default movieReducer;