import { createTheme } from '@mui/material/styles';

const fonts = [
    '"Public Sans"',
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
        fontSize : "1em",
        fontFamily: fonts,
    },
    components: {
        MuiTypography: {
            styleOverrides: {
                root: {
                    fontWeight: "300",
                }
            }
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    fontSize: "1.5em",
                }
            }
        },
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
                    fontSize: "1em",
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