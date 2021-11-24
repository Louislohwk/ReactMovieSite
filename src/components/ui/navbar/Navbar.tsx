import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import SearchIcon from '@mui/icons-material/Search';
import React, { FunctionComponent, useEffect, useReducer } from 'react';
import { makeStyles } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { RootState } from '../../redux/reducers/rootReducer';
import { actionCreators } from '../../redux/rootActionCreators';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  //marginRight: theme.spacing(2),
  marginLeft: 'auto',
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: 'auto',
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    marginBottom: 64,
  },
  tablist: {
    marginLeft: '3vw',
    "& .MuiTabs-indicator": {
      display: "none"
    },
    "& .Mui-selected": {
      opacity: '1',
      color: 'white !important'
    },
  },
  tab: {
    color: '#D3D3D3 !important',
    opacity: '0.5'
  },
  appbar: {
    position: 'static',
    backgroundColor: '#050505 !important'
  },
  title: {
    color: 'red',
    fontSize: '1.5em !important',
  }
});

interface Props {
}

const Navbar: FunctionComponent<Props> = (props) => {

  const classes = useStyles();
  const navigate = useNavigate();

  const moviesState = useSelector((state:RootState) => state.movies);
  const dispatch = useDispatch();

  const {searchMovie, setSearch, setFilter} = bindActionCreators(actionCreators, dispatch);

  const tabChange = (event: any, newValue: string) => {
    setFilter(newValue);
    newValue = '/' + newValue;
    navigate(newValue);
  };

  const searchChange = (event: any) => {
    if(event.target.value != ""){
      setFilter("Browse");
      navigate("browse");
    }else{
      setFilter("Popular");
      navigate("popular");
    }
    setSearch(event.target.value);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      <AppBar
        className={classes.appbar}
      >
        <Toolbar>
          <Typography
            variant='h6'
            className={classes.title}
          >
            Movie Portal
          </Typography>

          <TabContext value={moviesState.filtername}>
          <TabList onChange={tabChange} className={classes.tablist} variant="scrollable" scrollButtons="auto">
            <Tab label="Popular" value="Popular" className={classes.tab} />
            <Tab label="Trending" value="Trending" className={classes.tab} />
            <Tab label="Browse" value="Browse" className={classes.tab} style={{ visibility: 'hidden' }}/>
          </TabList>
          </TabContext>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={searchChange}
              value={moviesState.search}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
