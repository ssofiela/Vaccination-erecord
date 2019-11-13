import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import {
    createStyles,
    makeStyles,
    styled,
    Theme,
    useTheme,
    withStyles
} from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import { Formik } from "formik";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Colorize from "@material-ui/icons/Colorize";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { RouteComponentProps, withRouter } from "react-router";
import Select from "@material-ui/core/Select";

const StyledColorize = styled(Colorize)({
    marginRight: "10px"
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            borderLeft: `7px solid ${theme.palette.primary.main}`
        },
        container: {
            margin: theme.spacing(2, 4),
            overFlowX: "auto",
            minWidth: 800
        },
        link: {
            display: "flex"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        },
        dropdown: {
            width: "100%",
            height: "45px"
        },
        menu: {
            width: 200
        }
    })
);

const StyledButton = withStyles((theme: Theme) =>
    createStyles({
        root: {
            borderRadius: 0
        },
        outlined: {
            backgroundColor: theme.palette.background.default,
            borderWidth: "2px",
            "&:hover": {
                borderWidth: "2px"
            }
        },
        contained: {
            marginRight: theme.spacing(2.5),
            color: "#fff"
        }
    })
)(Button);

interface VaccineOptions {
    value: string;
    label: string;
}

function createVaccineOptions(options: string[]): VaccineOptions[] {
    return options.map((option) => ({ value: option, label: option }));
}

const vaccineOptions = [
    "Cholera",
    "Hib",
    "dtap",
    "dT",
    "BCG",
    "Typ",
    "TBE",
    "JEV",
    "Influ",
    "HBV",
    "HAV",
    "HABV",
    "MPR",
    "IPV",
    "Rabies",
    "Rota",
    "Var",
    "YFV",
    "HPV",
    "DTaP-IPV",
    "DTaP-IPV-Hib",
    "DTaP-IPV-Hib-HBV",
    "dtap-IPV",
    "PanInflu",
    "Men",
    "Pneu",
    "Diphteria",
    "DT",
    "DTP",
    "Tetanus",
    "Morbilli",
    "Parotitis",
    "Rubella",
    "Variola",
    "DT-IPV",
    "Pestis",
    "Anthrax",
    "Pertussis",
    "DTP-Hib",
    "DTP-IPV",
    "MPRV"
];

/**
 * Adding a new vaccine entry
 * @param props
 * @constructor
 */
const NewVaccine: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();
    const theme = useTheme();

    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date("2019-10-16"));
    const handleDateChange = (date: Date | null): void => {
        setSelectedDate(date);
    };

    const [state, setState] = React.useState<{
        vaccine: string | number;
    }>({
        vaccine: ""
    });

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        if (inputLabel.current) {
            setLabelWidth(inputLabel.current.offsetWidth);
        }
    }, []);

    const handleChange = (name: keyof typeof state) => (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    const mappedVaccineOptions = createVaccineOptions(vaccineOptions);

    return (
        <Paper square className={classes.container}>
            <Grid container>
                <Grid item xs={12}>
                    <Box
                        className={classes.header}
                        display="flex"
                        flexDirection="row"
                        bgcolor={theme.palette.secondary.main}
                        p={1.5}
                    >
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link variant="body1" color="inherit" href="/" className={classes.link}>
                                <StyledColorize />
                                My vaccines
                            </Link>
                            <Typography color="inherit" variant="body1" className={classes.link}>
                                New vaccine entry
                            </Typography>
                        </Breadcrumbs>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Formik
                        initialValues={{ vaccine: "", date: "" }}
                        onSubmit={() => {
                            alert("Form is validated! Submitting the form...");
                        }}
                    >
                        {(form) => (
                            <Grid container>
                                <Grid item xs={12}>
                                    <Box display="flex" flexDirection="row" p={5}>
                                        <Grid item xs={6}>
                                            <FormControl className={classes.formControl}>
                                                <InputLabel
                                                    ref={inputLabel}
                                                    htmlFor="outlined-age-native-simple"
                                                >
                                                    Select vaccine
                                                </InputLabel>
                                                <Select
                                                    native
                                                    value={state.vaccine}
                                                    onChange={handleChange("vaccine")}
                                                    labelWidth={labelWidth}
                                                    name="vaccine"
                                                    inputProps={{
                                                        name: "vaccine",
                                                        id: "outlined-age-native-simple"
                                                    }}
                                                >
                                                    {mappedVaccineOptions.map((option) => (
                                                        <option
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                <Grid container justify="space-around">
                                                    <KeyboardDatePicker
                                                        name="date"
                                                        disableToolbar
                                                        variant="inline"
                                                        format="dd/MM/yyyy"
                                                        margin="dense"
                                                        id="date-picker"
                                                        label="Date"
                                                        value={selectedDate}
                                                        onChange={handleDateChange}
                                                        KeyboardButtonProps={{
                                                            "aria-label": "change date"
                                                        }}
                                                    />
                                                </Grid>
                                            </MuiPickersUtilsProvider>
                                        </Grid>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box
                                        display="flex"
                                        flexDirection="row"
                                        justifyContent="flex-end"
                                        bgcolor="#f9f9f9"
                                        p={2}
                                    >
                                        <StyledButton
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                props.history.push("/vaccines");
                                                form.resetForm();
                                            }}
                                        >
                                            Save
                                        </StyledButton>
                                        <StyledButton
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => {
                                                props.history.push("/vaccines");
                                                form.resetForm();
                                            }}
                                        >
                                            Cancel
                                        </StyledButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        )}
                    </Formik>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default withRouter(NewVaccine);
