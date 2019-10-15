import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Button } from "@material-ui/core";
import "date-fns";
import Grid from "@material-ui/core/Grid";
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

const NewVaccine: React.FC<NewVaccineProps> = props => {
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(
        new Date("2019-10-18T21:11:54")
    );

    const handleDateChange = (date: Date | null): void => {
        setSelectedDate(date);
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
                    <form autoComplete="off">
                        <FormControl
                            variant="outlined"
                            style={{ minWidth: 250 }}
                        >
                            <InputLabel
                                htmlFor="outlined-age-simple"
                                defaultValue={"sfa"}
                            ></InputLabel>
                            <Select
                                inputProps={{
                                    name: "vaccine",
                                    id: "outlined-age-simple"
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Diphtheria">
                                    Diphtheria
                                </MenuItem>
                                <MenuItem value="Polio">Polio</MenuItem>
                                <MenuItem value="Chickenpox">
                                    Chickenpox
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </form>
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
