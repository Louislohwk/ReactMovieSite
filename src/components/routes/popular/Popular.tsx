import { Box, Container, makeStyles } from '@material-ui/core';
import { Grid } from '@mui/material'
import MovieCard from '../../ui/card/MovieCard';
import movieReducer, { MOVIE_DEFAULT_STATE } from '../../redux/reducers/movieReducer';
import { useEffect, useReducer, useRef, useState } from 'react';
import { getMovies } from '../../services/MovieService';
import { Movie } from '../../models/Movie';
import { Button, Pagination, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../redux/rootActionCreators';
import { setFilter } from '../../redux/action-creators/movieActions';

const useStyles = makeStyles({
  pagination: {
        '& .Mui-selected': {
          backgroundColor: 'red !important',
          color:'white !important',
        },
        '& .MuiPaginationItem-root':{
        color: 'red'
        },
        marginLeft: '0 auto'
    },
    popBox: {
        position: 'relative',
        height: '90vh',
        width: '75vw',
        margin: '0 auto',
        marginTop: '10vh'
    },
    popContainer: {
        
    },
    title: {
      color: '#e7e7e7',
      paddingBottom: 30
    },
});

const Popular = () => {

  const classes = useStyles();
  //const [moviesState, moviesDispatch] = useReducer(movieReducer, MOVIE_DEFAULT_STATE);

  const moviesState = useSelector((state:RootState) => state.movies);
  const dispatch = useDispatch();

  const {setMovies, setPage, setSearch, setFilter} = bindActionCreators(actionCreators, dispatch);

  const fetchMovies = async () => {
    try {
      const movies: Movie[] = await getMovies(moviesState.filtername, moviesState.page);
      setMovies(movies);
    } catch (err) {
      console.log(err);
    }
  }

  const prevFilterRef = useRef();

  useEffect(() => {
    prevFilterRef.current = moviesState.filtername;
    setSearch("");
    if(prevFilter != "Popular"){
      setPage(1);
      setFilter("Popular")
    }
    fetchMovies();
}, [moviesState.filtername, moviesState.page]);

const prevFilter = prevFilterRef.current;

const pageChange = (event: any, value:number) => {
  setPage(value);
};

const movieProps = moviesState.movies.map((item: Movie) => <MovieCard key={item.id} movie={item}/>);

  return (
    <Box className={classes.popBox}>

      <Typography sx={{
        fontSize: {
          lg: 100,
          md: 75,
          sm: 40,
          xs: 30
          }
        }}
        className={classes.title}
      >
          POPULAR
      </Typography>

        <Grid container className={classes.popContainer}
        direction="row"
        justifyContent="center"
        alignItems="baseline"
        columnSpacing={2}
        rowSpacing={2}
        >
          {movieProps}
        </Grid>
        <Box style={{ height: '5vh' }}></Box>
        <Pagination
          count={moviesState.movies.length}
          size="large"
          page={moviesState.page}
          onChange={pageChange}
          className={classes.pagination}
        />
    </Box>
  );
}

export default Popular;