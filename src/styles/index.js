import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  header:{
    backgroundColor: '#000',
    color: '#F0E68C',
   },
   logo:{
     width: '100px'
   },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    maxWidth: 345,
  },
  cardMedia: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  footer: {
    backgroundColor: '#000',
    color: '#F0E68C',
    padding: theme.spacing(6),
  },
  copyright: {
    color: '#fff',
  },
  main:{
    color: '#000'
  }
}));


export default useStyles;