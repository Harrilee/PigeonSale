import { createTheme } from '@mui/material/styles';

const fonts = [
    '"Rubik"',
    'Helvetica Neue',
    'Arial',
    'sans-serif'
].join(',');

const theme = createTheme({
    palette: {
        primary: {
            main: "#2120ba"
        },
        secondary: {
            main: "#eee"
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    typography: {
        fontSize : 12.5,
        fontFamily: fonts,
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableElevation: true
            },
            styleOverrides: {
                root: {
                    fontFamily: fonts,
                    fontWeight : "normal",
                    textTransform: "capitalize",
                    background: "#111",
                    padding: "0.5em 1em",
                    color: "#fff",
                    "&:hover": {
                        background: "#333",
                    }
                }
            },
        },
    },
});

export default theme;