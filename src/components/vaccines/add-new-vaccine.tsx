import React from "react";
import PropTypes from "prop-types";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";

interface NewVaccineProps {}

/**
 * Adding a new vaccine entry
 * @param props
 * @constructor
 */
const NewVaccine: React.FC<NewVaccineProps> = props => {
    return (
        <div style={{ backgroundColor: "#f9f9f9" }}>
            <div style={{ position: "absolute", left: "50%", top: "50%" }}>
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
                            <InputLabel htmlFor="outlined-age-simple">
                                Type to select vaccine
                            </InputLabel>
                            <Select
                                inputProps={{
                                    name: "Type to select vaccine",
                                    id: "outlined-age-simple"
                                }}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Diphtheria</MenuItem>
                                <MenuItem value={20}>Polio</MenuItem>
                                <MenuItem value={30}>Chickenpox</MenuItem>
                            </Select>
                        </FormControl>
                    </form>
                    <form noValidate>
                        <TextField
                            id="date"
                            label="Date"
                            type="date"
                            defaultValue="2017-05-24"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

NewVaccine.propTypes = {
    children: PropTypes.any
};

export default NewVaccine;
