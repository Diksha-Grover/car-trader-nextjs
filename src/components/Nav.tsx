import {
  AppBar,
  Button,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles((theme) => ({
// makeStyles is a function from Material-UI that allows us to create CSS classes and rules using JavaScript objects.
// makeStyles function returns a React hook that we can use in a functional component to access the styles and classes. 
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
  },
}));

export function Nav() {
  const classes = useStyles();

  return (
    <AppBar position="static">
    {/* AppBar component uses display: flex and flex-direction */}
      <Toolbar variant="dense">
      {/* Toolbar uses display: flex too, but doesn't set flex-direction, which means it uses its default value: row. */}
      {/* Dense, Reduces the height of the toolbar content to 48px  */}
        <Typography variant="h6" className={classes.title}>
          Cars and Only Cars
        </Typography>

        <Button color="inherit">
          <Link href="/">
            <a className={classes.link}>
              <Typography color="inherit">Home</Typography>
            </a>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/cars">
            <a className={classes.link}>
              <Typography color="inherit">Cars</Typography>
            </a>
          </Link>
        </Button>

        <Button color="inherit">
          <Link href="/faq">
            <a className={classes.link}>
              <Typography color="inherit">FAQ</Typography>
            </a>
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
