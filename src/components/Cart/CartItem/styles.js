import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    minWidth: '20em'
  },
  media: {
    height: 260,
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));