import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
    KeyboardDatePickerProps
} from "@material-ui/pickers";
import Box from "@material-ui/core/Box";
import InputLabel from "@material-ui/core/InputLabel";
import Tooltip from "@material-ui/core/Tooltip";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import moment from "moment";
import { createStyles, fade, Theme, withStyles } from "@material-ui/core/styles/";
import { FormHelperText } from "@material-ui/core";

import { convertDotFormatToISO } from "../../../utils/date-utils";

import { useStyles } from "./form-styles";
import { isNonEmpty } from "../../../utils/field-validation";

interface OwnProps {
    error?: boolean
    errorMessage?: string
    tooltip?: string
    value: string
}

type Props = OwnProps & KeyboardDatePickerProps;

const StyledDatePicker = withStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            "& .MuiInput-root": {
                width: "100%",
                border: `1.5px solid ${theme.palette.secondary.main}`,
                padding: "4px 4px 4px 14px",
                transition: theme.transitions.create(["border-color"]),
            },
            "&  .Mui-focused": {
                boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
                borderColor: theme.palette.primary.main
            },
            "&.Mui-disabled": {
                backgroundColor: theme.palette.action.disabledBackground,
                borderColor: theme.palette.action.disabled
            },
        },
    })
)(KeyboardDatePicker);

const DatePicker: React.FC<Props> = props => {
    const classes = useStyles();

    const initialDate = isNonEmpty(props.value) ? new Date(convertDotFormatToISO(props.value)) : new Date((moment().format()));
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(initialDate);

    return (
        <Box className={classes.container}>
            <Box
                className={classes.labelContainer}
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
            >
                <InputLabel htmlFor={props.id} required={props.required}>
                    {props.name}
                </InputLabel>
                {props.tooltip && (
                    <Tooltip title={props.tooltip}>
                        <HelpOutlineOutlinedIcon
                            style={{ fontSize: "1.2rem", color: "rgba(0, 0, 0, 0.54)" }}
                        />
                    </Tooltip>
                )}
            </Box>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <StyledDatePicker
                    format="dd/MM/yyyy"
                    value={selectedDate}
                    onChange={(date) => {
                        setSelectedDate(date);
                        props.onChange(date.toLocaleDateString())
                    }}
                    InputProps={{ disableUnderline: true }}
                    KeyboardButtonProps={{ style: { padding: "8px" }, size: "small" }}
                />
            </MuiPickersUtilsProvider>
            {props.error && (
                <FormHelperText className={classes.errorMessage}>{props.errorMessage}</FormHelperText>
            )}
        </Box>

    );
};

export default DatePicker;