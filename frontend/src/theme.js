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
                    "&:disabled": {
                        opacity: "0.1",
                    }
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
                    "&:disabled": {
                        opacity: "0.3",
                    }
                },
                contained: {
                    background: "#111",
                    color: "#fff",
                    "&:hover": {
                        background: "#333",
                    },
                    "&:disabled": {
                        backgroundColor: "#111",
                        color: "#fff",
                    }
                },
                outlined: {
                    backgroundColor: "#fff",
                    borderColor: "#111",
                    paddingTop: "calc(0.5em - 1px)",
                    paddingBottom: "calc(0.5em - 1px)",
                    "&:hover": {
                        borderColor: "#333",
                    }
                }
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    fontWeight: "300",
                    background: "#fff",
                    borderColor: "none",
                },
                "&:hover": {
                    backgroundColor: "#fff",
                },
                "&:focus": {
                    backgroundColor: "#fff",
                }
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fontWeight: "300",
                }
            },
        }
    },
});

export default theme;