import Text from '../text/Text';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Card, CardContent, GridList, makeStyles } from '@material-ui/core';
import { Movie } from '../../models/Movie';
import { Container, Grid } from '@mui/material';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import NoMovie from '../../../assets/nomovie.jpg';
import TextLink from '../text/TextLink';
import { CastMember } from '../../models/CastMember';
import React from 'react';
import { truncate } from 'fs';
import HorizontalCard from '../card/HorizontalCard';

const useStyles = makeStyles({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
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
    WebkitMaskImage: 'linear-gradient(0deg, transparent 16px, red 66px)',
  },
  modalCard: {
    background: 'rgb(30 27 38)',
  },
  arrows: {
    cursor: 'pointer'
  },
  bio: {
    transition: 'transform .2s',
  },
  gridList: {
    flexWrap: 'nowrap'
  },
  rootGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  top10Title: {
    fontSize: '1em !important',
    textAlign: 'left',
    color: 'lightgrey',
    paddingTop: 10
  },
  imageBox: {
    display: 'flex',
    justifyContent: 'center',
  }
});

interface Props {
  handleClose: any;
  profileOpen: boolean;
  profile: CastMember;
  relatedMovies: Movie[];
}

const MovieModal = (props: Props) => {
  const classes = useStyles();
  const baseImgUrl = "https://image.tmdb.org/t/p"
  const size = "w500"
  const sizeMov = "w154"

  const [arrow, setArrow] = React.useState("down");

  const onArrowDownClicked = () => setArrow("up");
  const onArrowUpClicked = () => setArrow("down");

  const imagePath = props.profile.profile_path != null ? baseImgUrl + '/' + size + props.profile.profile_path : NoMovie;
  const rootMovpath = baseImgUrl + '/' + sizeMov;

  const _relatedMovies = props.relatedMovies.map((item: Movie) =>
    <HorizontalCard id={item.id} title={item.title} image={item.poster_path != null ? rootMovpath + item.poster_path : NoMovie}></HorizontalCard>
  );

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.profileOpen}
        onClose={props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.profileOpen}>
          <Box className={classes.root}>
            <Card className={classes.modalCard}>
              <Box className={classes.imageBox}>
                <img src={`${imagePath}`} className={classes.modalImage}/>
              </Box>
              <CardContent>
                <Typography className={classes.title}>
                    {props.profile.name}
                </Typography>


                <Grid container className={classes.rvgrid}>  
                  <Typography className={classes.releaseDate}>
                    Birthday: {props.profile.birthday}
                  </Typography>
                  <Box className={classes.votes}>
                    <Typography className={classes.count}>
                    Gender: {props.profile.gender === 1 ? "Female" : "Male"}
                    </Typography>
                  </Box>
                </Grid>

                <Box>
                    <Typography className={classes.releaseDate}>
                    Place of birth: {props.profile.place_of_birth}
                    </Typography>
                  </Box>

                  <Grid container className={classes.rvgrid}>  
                  <Typography className={classes.overviewTitle}>
                        Biography
                    </Typography>
                  <Box className={classes.votes}>
                      {
                          arrow == "down" ? <ArrowCircleDownIcon onClick={onArrowDownClicked} className={classes.arrows}></ArrowCircleDownIcon> :
                          <ArrowCircleUpIcon onClick={onArrowUpClicked} className={classes.arrows}></ArrowCircleUpIcon>
                      }
                  </Box>
                </Grid>
                <Box className={classes.bio} style={{ display: arrow == "down" ? "none" : "block" }}>
                    <Typography className={classes.overview}>
                        {props.profile.biography}
                    </Typography>
                </Box>
                
                <Typography className={classes.top10Title}>
                    Top 10 Movies
                </Typography>

                <Box className={classes.rootGrid}>
                    <GridList className={classes.gridList} cols={2}>
                        {_relatedMovies}
                    </GridList>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default MovieModal;