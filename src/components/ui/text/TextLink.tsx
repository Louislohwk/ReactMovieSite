import Typography from '@mui/material/Typography';
import { Link, makeStyles } from '@material-ui/core';

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
  onclick?:any;
}

const TextLink = (props: Props) => {

  return (
    <Typography color={props.color}
                fontSize={props.size}
                fontStyle={props.style}
                fontWeight={props.weight}
    >
        {props.includeSeparator && props.separatorValue}
        <Link href="#"
              underline="hover"
              style={{ color: `${props.color}` }}
              onClick={props.onclick}
        >
            {props.value}
        </Link>
    </Typography>
  );
}

export default TextLink;