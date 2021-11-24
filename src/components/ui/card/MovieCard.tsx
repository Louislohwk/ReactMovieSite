import { Box, Card, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Movie } from '../../models/Movie';
import { actionCreators } from '../../redux/rootActionCreators';
import { RootState } from '../../redux/reducers/rootReducer';
import { getMovieCredits, getMovieDetails } from '../../services/MovieService';
import MovieModal from '../modal/MovieModal';
import NoMovie from '../../../assets/nomovie.jpg';

const useStyles = makeStyles({
  root: {
    
  },
  card: {
    minHeight: 512,
    maxHeight: 512,
    width: 342,
    maxWidth: 342,
    '&:hover': {
        transform: 'scale(1.05)',
        transition: 'transform .2s',
        zIndex: 2,
        cursor:'pointer',
      },
  },
  movieCard :{
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat'
  },
  title: {
    color: 'black',
    textAlign: 'left'
  },
  overviewTitle: {
    fontSize: '1em',
    textAlign: 'left'
  },
  overview: {
    fontSize: '0.7em',
    textAlign: 'left'
  }
});

interface Props {
  movie: Movie;
}

const MovieCard = (props: Props) => {
  const classes = useStyles(props);
  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w342"

  const [open, setOpen] = React.useState(false);
  //const [moviesState, moviesDispatch] = useReducer(movieReducer, MOVIE_DEFAULT_STATE);

  const moviesState = useSelector((state:RootState) => state.movies);
  const dispatch = useDispatch();

  const {updateMovie} = bindActionCreators(actionCreators, dispatch);
  
  const handleOpen = async () => {
    const details = await getMovieDetails(props.movie.id);
    const credits = await getMovieCredits(props.movie.id);
    props.movie.run_time = details.runtime;
    props.movie.vote_count = details.vote_count;
    props.movie.genres = details.genres;
    props.movie.castMembers = [...credits.cast].map(({id,name,gender}) => ({id,name,gender}));
    //moviesDispatch(updateMovie(props.movie));
    updateMovie(props.movie);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const imagePath = props.movie.poster_path != null ? baseImgUrl + '/' + size + props.movie.poster_path : NoMovie;

  return (
    <Grid
        container
        item xs={12} md={4} lg={3}
        className={classes.root}
    >
        <Card className={classes.card}
              >
          <Box className={classes.movieCard}
            style={{backgroundImage: `url(${imagePath})` }}
            onClick={handleOpen}
            >
          </Box>
        </Card>
        <MovieModal open={open} handleClose={handleClose} movie={props.movie} />
    </Grid>
  );
};

export default MovieCard;

