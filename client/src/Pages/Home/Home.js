import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import BookPanel from '../../components/BookPanel/BookPanel';
import CapacityPanel from '../../components/CapacityPanel/CapacityPanel';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));
const Home = () => {
  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <div className={classes.root}>
          <Grid container spacing={1}>

            <Grid item xs={12}>
              <BookPanel />
            </Grid>

            <Grid item xs={12}>
              <CapacityPanel />
            </Grid>

          </Grid>
        </div>
      </Container>
    </>
  );
};

export default Home;