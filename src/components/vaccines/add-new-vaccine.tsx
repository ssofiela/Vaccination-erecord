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
        new Date("2019-10-18T21:11:54")
    );
    const handleDateChange = (date: Date | null): void => {
        setSelectedDate(date);
    };

    const [state, setState] = React.useState<{ vaccine: string | number; name: string }>({
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
                    top: "60%",
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
                                <option value={10}>Polio</option>
                                <option value={20}>MMR</option>
                                <option value={30}>Checker Pox</option>
                                <option value={40}>TD</option>
                                <option value={50}>Hepatitis A</option>
                                <option value={60}>Hepatitis B</option>
                                <option value={70}>Influenza</option>
                                <option value={80}>Rotavirus</option>
                            </Select>
                        </FormControl>
                    </div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="space-around">
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Date picker inline"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    "aria-label": "change date"
                                }}
                            />
                        </Grid>
                    </MuiPickersUtilsProvider>
                </div>
                <div>
                    <Button>Save</Button>
                    <Button>Cancel</Button>
                </div>
            </div>
        </div>
    );
};

NewVaccine.propTypes = {
    children: PropTypes.any
};

export default NewVaccine;
