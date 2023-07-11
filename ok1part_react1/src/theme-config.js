const themeConfig = {
  components: {
    MuiSelect: {
      styleOverrides: {
        root: {
          color: 'black',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#284852',
          },
          '&:focus .MuiOutlinedInput-notchedOutline': {
            borderColor: '#284852',
          },
          '&:focus-visible .MuiOutlinedInput-notchedOutline': {
            borderColor: '#284852',
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: 'black',
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          transition: 'border-bottom-color 200ms!important',
          transitionTimingFunction: 'none!important',
          '&:hover:before': {
            borderBottom: '1px solid black!important',
            transition: 'border-bottom-color 200ms!important',
            transitionTimingFunction: 'none!important',
          },
        },
        input: {
          color: 'black',
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        popper: {
          '& .MuiAutocomplete-option': {
            color: 'black',
          },
        },
        tag: {
          '& .MuiChip-label': {
            color: 'black',
          },
          '& .MuiChip-deleteIcon': {
            color: '#000000ad',
          },
          '& .MuiChip-deleteIcon:hover': {
            color: '#000000ad',
          },
        },
        option: {
          color: 'black',
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#336677', // OK1st color '#ff3b3b', // red
      components: '#1a746c', // dark grey
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
    },
    secondary: {
      main: '#3f51b5', // blue
    },
    black: '#000000', // black
    white: '#ffffff', // white
    text: {
      primary: '#ffffff', // white
      secondary: '#000000', // black
      special: '#1a746c', //green
      special_old: '#336677', //OK1st color '#ff4c4c', // red
    },
  },
};

export default themeConfig;
