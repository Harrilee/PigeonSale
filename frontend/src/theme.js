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
                    padding: "0.5em 1em",
                    color: "#000",
                },
                contained: {
                    background: "#111",
                    color: "#fff",
                    "&:hover": {
                        background: "#333",
                    }
                },
                outlined: {
                    borderColor: "#111",
                    "&:hover": {
                        borderColor: "#333",
                    }
                }
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    background: "#fff",
                    borderColor: "none",
                    "&:hover": {
                        background: "#fff",
                    },
                    "& label.Mui-focused": {
                        background: "#fff",
                    }
                }
            },
        }
    },
});

export default theme;