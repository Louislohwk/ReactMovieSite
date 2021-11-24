import Typography from '@mui/material/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
 
});

interface Props {
  value: string;
  size?: string;
  color?: string;
  includeSeparator?: boolean;
  separatorValue?:string;
  style?:string;
  weight?:string;
}

const Text = (props: Props) => {

  return (
    <Typography color={props.color}
                fontSize={props.size}
                fontStyle={props.style}
                fontWeight={props.weight}
    >
        {props.includeSeparator && props.separatorValue}{props.value}
    </Typography>
  );
}

export default Text;