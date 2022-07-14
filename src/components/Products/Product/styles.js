import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  root: {
    maxWidth: '100%'
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
    fontSize: '16px',
    fontFamily: 'sans-serif',
    color: '#111111'
  },
  stockDiv: {
    background: 'green',
    float: 'right',
    margin: '10px 15px',
    padding: '5px 8px',
    borderRadius: '50px',
    userSelect: 'none',
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: '14px'
  },
  desc: {
    overflow: 'hidden',
    maxHeight: '3.5em',
  }
}));