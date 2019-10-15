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
    }>({
        vaccine: ""
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
                        initialValues={{ vaccine: "", date: "" }}
                        onSubmit={() => {
                            alert("Form is validated! Submitting the form...");
                            console.log(state);
                            console.log(selectedDate);
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
                                            name="vaccine"
                                            inputProps={{
                                                name: "vaccine",
                                                id: "outlined-age-native-simple"
                                            }}
                                        >
                                            <option value="" />
                                            <option value="Cholera">Cholera</option>
                                            <option value="Hib">Hib</option>
                                            <option value="dtap">dtap</option>
                                            <option value="dT">dT</option>
                                            <option value="BCG">BCG</option>
                                            <option value="Typ">Typ</option>
                                            <option value="TBE">TBE</option>
                                            <option value="JEV">JEV</option>
                                            <option value="Influ">Influ</option>
                                            <option value="HBV">HBV</option>
                                            <option value="HAV">HAV</option>
                                            <option value="HABV">HABV</option>
                                            <option value="MPR">MPR</option>
                                            <option value="IPV">IPV</option>
                                            <option value="Rabies">Rabies</option>
                                            <option value="Rota">Rota</option>
                                            <option value="Var">Var</option>
                                            <option value="YFV">YFV</option>
                                            <option value="HPV">HPV</option>
                                            <option value="DTaP-IPV">DTaP-IPV</option>
                                            <option value="DTaP-IPV-Hib">DTaP-IPV-Hib</option>
                                            <option value="DTaP-IPV-Hib-HBV">DTaP-IPV-Hib-HBV</option>
                                            <option value="dtap-IPV">dtap-IPV</option>
                                            <option value="PanInflu">PanInflu</option>
                                            <option value="Men">Men</option>
                                            <option value="Pneu">Pneu</option>
                                            <option value="Diphteria">Diphteria</option>
                                            <option value="DT">DT</option>
                                            <option value="DTP">DTP</option>
                                            <option value="Tetanus">Tetanus</option>
                                            <option value="Morbilli">Morbilli</option>
                                            <option value="Parotitis">Parotitis</option>
                                            <option value="Rubella">Rubella</option>
                                            <option value="Variola">Variola</option>
                                            <option value="DT-IPV">DT-IPV</option>
                                            <option value="Pestis">Pestis</option>
                                            <option value="Anthrax">Anthrax</option>
                                            <option value="T-IPV">T-IPV</option>
                                            <option value="Pertussis">Pertussis</option>
                                            <option value="DTP-Hib">DTP-Hib</option>
                                            <option value="DTP-IPV">DTP-IPV</option>
                                            <option value="MPRV">MPRV</option>
                                        </Select>
                                    </FormControl>
                                </div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container justify="space-around">
                                        <KeyboardDatePicker
                                            name={"date"}
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
                                    <Button
                                        type="submit"
                                        onClick={form.handleSubmit}
                                    >
                                        Save
                                    </Button>
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
