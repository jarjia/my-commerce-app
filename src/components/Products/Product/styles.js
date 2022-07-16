import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    maxHeight: '99%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid lightgray',
  },
  link: {
    cursor: 'pointer',
    fontSize: '18px',
    fontFamily: 'sans-serif',
    color: '#111111',
  },
  stockDiv: {
    background: 'green',
    float: 'right',
    margin: '10px 15px',
    padding: '6px 10px',
    borderRadius: '50px',
    userSelect: 'none',
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: '15px'
  },
  desc: {
    overflow: 'hidden',
    maxHeight: '3.6em',
    padding: '0 5px'
  }
}));