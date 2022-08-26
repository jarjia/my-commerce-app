import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
    textAlign: 'center'
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
    marginLeft: '20px',
    '@media (max-width: 653px)': { marginTop: 10 }
  },
  link: {
    textDecoration: 'none',
  },
  noProduct: {
    textAlign: 'center'
  },
  cardDetails: {
    display: 'flex',
    marginTop: '10%',
    marginBottom: '3%',
    width: '100%',
    justifyContent: 'space-between',
    padding: '0 30px'
  },
}));