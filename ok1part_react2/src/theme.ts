import { createTheme } from '@mui/material/styles';

export const globalTheme = createTheme({
  palette: {
    primary: {
      main: '#336677', // OK1st color '#ff3b3b', // red
    },
    ['theme1' as any]: {
      components1: '#1a746c', // dark grey
      components2: '#ffffff', // white
      components3: '#535353', // black
      components4: '#f2f2f2', // light grey
      special1: '#284852', // dark green
      special2: '#1a746c', // green
      special3: '#ed7575', // red
      //special: '#336677', // OK1st color //'#ff4c4c', // red
      links: '#0072e5', // blue
      gradientAngle: '139',
      darkBorder: '#c6c6c6',
      dashboardShadow:
        '0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)',
      dashboardWrapperShadow:
        '0 0 5px 0 rgb(43 43 43 / 10%), 0 11px 6px -7px rgb(43 43 43 / 10%)',
    },
  },
});

const theme = createTheme(
  {
    components: {
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: globalTheme.palette.primary.main,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            '&.secondary': {
              color: 'white',
            },
          },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            '&.secondary': {
              color: 'white',
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&.greyDisable.Mui-disabled .MuiInputBase-input': {
              backgroundColor: '#e8e8e8',
            },
            '&.lightGreyDisable.Mui-disabled .MuiInputBase-input': {
              backgroundColor: '#f5f5f5',
            },
          },
          input: {
            '&.Mui-disabled.greyDisable': {
              backgroundColor: '#e8e8e8',
            },
            '&.Mui-disabled.lightGreyDisable': {
              backgroundColor: '#f5f5f5',
            },
          },
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {
            fontSize: '1.2rem',
            color: 'black',
          },
        },
      },
    },
    /*
    typography: {
      body1: {
        '&.secondary': {
          color: 'white',
        },
      },
    },*/
  },
  globalTheme
);

export default theme;
