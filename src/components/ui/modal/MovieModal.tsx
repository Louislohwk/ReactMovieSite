import Text from '../text/Text';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import { Movie } from '../../models/Movie';
import { Grid } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import NoMovie from '../../../assets/nomovie.jpg';
import TextLink from '../text/TextLink';
import React from 'react';
import { CastMember } from '../../models/CastMember';
import ProfileModal from './ProfileModal';
import { getPresonCredits, getPresonDetails } from '../../services/MovieService';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: '90vh',
    boxShadow: '24',
    '&:focus':{
      border: '0px'
    },
    overflowY:'scroll'
  },
  title: {
    color: '#e7e7e7',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: '1.5em !important'
  },
  overviewTitle: {
    fontSize: '1.1em !important',
    textAlign: 'left',
    color: 'lightgrey',
  },
  overview: {
    fontSize: '0.8em !important',
    textAlign: 'left',
    color: 'grey',
    paddingBottom: 10
  },
  releaseDate: {
    fontSize: '0.9em !important',
    textAlign: 'left',
    color: 'grey',
    paddingTop: 10,
    paddingBottom: 10,
    marginRight: 'auto'
  },
  votes: {
    fontSize: '0.9em !important',
    textAlign: 'right',
    color: 'grey',
    display: 'inline',
    marginLeft: 'auto'
  },
  count: {
    fontSize: '0.9em !important',
  },
  rvgrid: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infogrid: {
    display: 'flex',
    alignItems: 'left',
  },
  modalImage: {
    WebkitMaskImage: 'linear-gradient(0deg, transparent 16px, red 66px)'
  },
  modalCard: {
    background: 'rgb(30 27 38)',
  },
  webkitScrollbar: {
    width: '2px !important'
  },
  webkitScrollbarTrack: {
    boxShadow: 'inset 0 0 5px grey', 
    borderRadius: '10px'
  },
  webkitScrollbarThumb: {
    background: 'red', 
    borderRadius: '10px',
    '&:hover':{
      background: '#b30000' 
    },
  }
});

interface Props {
  handleClose: any;
  open: boolean;
  movie: Movie;
}

const MovieModal = (props: Props) => {
  const classes = useStyles();
  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w400"

  const imagePath = props.movie.poster_path != null ? baseImgUrl + '/' + size + props.movie.poster_path : NoMovie;

  const formatRuntime = (value:number | undefined) => {
    if(value == undefined) return "";
    const hrs = Math.floor(value / 60);
    const mins = value % 60;
    const results:string = hrs + 'h ' + mins + 'mins';
    return results;
  };

  //state for profile
  let _profile:CastMember = {
    id: 99999, name:"", gender:1
  };
  let _relatedMovies:Movie[] = [{
    id: 99999, title:"", poster_path:"", vote_count:0
  }];
  const [open, setOpen] = React.useState(false);
  const [member, setMember] = React.useState(_profile);
  const [relatedMovies, setRelatedMovies] = React.useState(_relatedMovies);
  
  const handleCastOpen = async (value:number) => {
    const profile = await getPresonDetails(value);
    const relatedMovies = await getPresonCredits(value);

    _relatedMovies = [...relatedMovies].map(({id,title,poster_path,vote_count}) => ({ id,title,poster_path,vote_count}));

    // sort and get the top 10 most liked movies
    _relatedMovies = _relatedMovies.sort( (a:Movie,b:Movie) => a.vote_count > b.vote_count ? -1:1 );
    _relatedMovies = _relatedMovies.slice(0,10);

    console.log(_relatedMovies.length);

    _profile.id = profile.id;
    _profile.name = profile.name;
    _profile.gender = profile.gender;
    _profile.birthday = profile.birthday;
    _profile.biography = profile.biography;
    _profile.profile_path = profile.profile_path;
    _profile.place_of_birth = profile.place_of_birth;
    setMember(_profile);
    setRelatedMovies(_relatedMovies);
    setOpen(true);
  };

  const handleCastClose = () => setOpen(false);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box className={classes.root}>
            <Card className={classes.modalCard}>
              <Box>
                <img src={`${imagePath}`} className={classes.modalImage}/>
              </Box>
              <CardContent>
                <Typography className={classes.title}>
                    {props.movie.title}
                </Typography>
                <Grid container className={classes.infogrid}>
                    <Text value={`${formatRuntime(props.movie.run_time)} / `} color='gray' size='0.9em'/>
                    {props.movie.genres?.map((genre, i) => <Text key={i}
                      value={`${genre.name}`}
                      color='gray'
                      size='0.9em'
                      includeSeparator={i != 0}
                      separatorValue={","}
                      />)}
                </Grid>
                <Grid container className={classes.rvgrid}>  
                  <Typography className={classes.releaseDate}>
                    Release Year: {props.movie.release_date}
                  </Typography>
                  <Box className={classes.votes}>
                    <ThumbUpIcon></ThumbUpIcon>
                    <Typography className={classes.count}>
                      {props.movie.vote_count}
                    </Typography>
                  </Box>
                  
                </Grid>
                <Box>
                    <Typography className={classes.overviewTitle}>
                        Overview
                    </Typography>
                    <Typography className={classes.overview}>
                        {props.movie.overview}
                    </Typography>
                </Box>

                
                <Grid container className={classes.infogrid}>
                    {props.movie.castMembers?.map((member, i) => <TextLink key={member.id}
                      value={`${member.name}`}
                      color='white'
                      size='0.75em'
                      includeSeparator={i != 0}
                      separatorValue={","}
                      style={"italic"}
                      weight={"lighter"}
                      onclick={() => { handleCastOpen(member.id) }}
                      />)}
                </Grid>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
      <ProfileModal handleClose={handleCastClose} profileOpen={open} profile={member} relatedMovies={relatedMovies}/>
    </div>
  );
}

export default MovieModal;