import { makeStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';

const useStyles = makeStyles({
  card: {
    
  },
});

interface Props {
 id: number;
 title: string;
 image: string;
}

const HorizontalCard = (props: Props) => {
  const classes = useStyles();

  return (
      <GridListTile key={props.id} className={classes.card}>
        <img src={props.image} alt={props.title} />            
        <GridListTileBar
          title={props.title}
        />
      </GridListTile>
  );
}

export default HorizontalCard;