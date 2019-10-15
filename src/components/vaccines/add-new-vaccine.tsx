import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from "@material-ui/pickers";
import { Formik } from "formik";

interface NewVaccineProps {}

/**
 * Adding a new vaccine entry
 * @param props
 * @constructor
 */

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            flexWrap: "wrap"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250
        },
        selectEmpty: {
            marginTop: theme.spacing(2)
        }
    })
);

const NewVaccine: React.FC<NewVaccineProps> = props => {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date("2019-10-16")
    );
    const handleDateChange = (date: Date | null): void => {
        setSelectedDate(date);
    };

    const [state, setState] = React.useState<{
        vaccine: string | number;
        name: string;
    }>({
        vaccine: "",
        name: "hai"
    });

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const handleChange = (name: keyof typeof state) => (
        event: React.ChangeEvent<{ value: unknown }>
    ) => {
        setState({
            ...state,
            [name]: event.target.value
        });
    };

    return (
        <div style={{ backgroundColor: "#f9f9f9" }}>
            <div
                style={{
                    position: "absolute",
                    left: "40%",
                    top: "30%",
                    bottom: "30%"
                }}
            >
                <div
                    style={{
                        backgroundColor: "#CFEDF2",
                        borderWidth: 2,
                        justifyContent: "center"
                    }}
                >
                    <p style={{ margin: 10 }}>
                        My vaccines / Add vaccine entry
                    </p>
                    <div>{props.children}</div>
                </div>
                <div
                    style={{
                        borderWidth: 2,
                        borderColor: "f9f9f9"
                    }}
                >
                    <p style={{ margin: 5, display: "inline-block" }}>
                        Vaccine
                    </p>
                    <Formik
                        initialValues={{ vaccine: "", changeDate: "" }}
                        onSubmit={() => {
                            alert("Form is validated! Submitting the form...");
                        }}
                    >
                        {form => (
                            <div>
                                <div className={classes.root}>
                                    <FormControl
                                        variant="outlined"
                                        className={classes.formControl}
                                    >
                                        <InputLabel
                                            ref={inputLabel}
                                            htmlFor="outlined-age-native-simple"
                                        >
                                            Type to vaccine
                                        </InputLabel>
                                        <Select
                                            native
                                            value={state.vaccine}
                                            onChange={handleChange("vaccine")}
                                            labelWidth={labelWidth}
                                            inputProps={{
                                                name: "vaccine",
                                                id: "outlined-age-native-simple"
                                            }}
                                        >
                                            <option value="" />
                                            <option value={10}>Cholera</option>
                                            <option value={20}>Hib</option>
                                            <option value={30}>dtap</option>
                                            <option value={40}>dT</option>
                                            <option value={50}>BCG</option>
                                            <option value={60}>Typ</option>
                                            <option value={70}>TBE</option>
                                            <option value={80}>JEV</option>
                                            <option value={90}>Influ</option>
                                            <option value={100}>HBV</option>
                                            <option value={110}>HAV</option>
                                            <option value={120}>HABV</option>
                                            <option value={130}>MPR</option>
                                            <option value={140}>IPV</option>
                                            <option value={150}>Rabies</option>
                                            <option value={160}>Rota</option>
                                            <option value={170}>Var</option>
                                            <option value={180}>YFV</option>
                                            <option value={190}>HPV</option>
                                            <option value={200}>DTaP-IPV</option>
                                            <option value={210}>DTaP-IPV-Hib</option>
                                            <option value={220}>DTaP-IPV-Hib-HBV</option>
                                            <option value={230}>dtap-IPV</option>
                                            <option value={240}>PanInflu</option>
                                            <option value={250}>Men</option>
                                            <option value={260}>Pneu</option>
                                            <option value={270}>Diphteria</option>
                                            <option value={280}>DT</option>
                                            <option value={290}>DTP</option>
                                            <option value={300}>Tetanus</option>
                                            <option value={310}>Morbilli</option>
                                            <option value={320}>Parotitis</option>
                                            <option value={330}>Rubella</option>
                                            <option value={340}>Variola</option>
                                            <option value={350}>DT-IPV</option>
                                            <option value={360}>Pestis</option>
                                            <option value={370}>Anthrax</option>
                                            <option value={380}>T-IPV</option>
                                            <option value={390}>Pertussis</option>
                                            <option value={400}>DTP-Hib</option>
                                            <option value={410}>DTP-IPV</option>
                                            <option value={420}>MPRV</option>
                                        </Select>
                                    </FormControl>
                                </div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            disableToolbar
                                            variant="inline"
                                            format="dd/MM/yyyy"
                                            margin="normal"
                                            id="date-picker-inline"
                                            label="Date picker inline"
                                            value={selectedDate}
                                            onChange={handleDateChange}
                                            KeyboardButtonProps={{
                                                "aria-label": "changeDate"
                                            }}
                                        />
                                    </Grid>
                                </MuiPickersUtilsProvider>
                                <div>
                                    <Button onPress={form.handleSubmit} href="/vaccines">Save</Button>
                                    <Button>Cancel</Button>
                                </div>
                            </div>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

NewVaccine.propTypes = {
    children: PropTypes.any
};

export default NewVaccine;
