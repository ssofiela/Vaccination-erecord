import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Colorize from "@material-ui/icons/Colorize";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { RouteComponentProps, withRouter } from "react-router";
import moment from "moment";

import * as Panel from "../common/panel";
import useStyles from "../common/styles";
import { FilledButton, OutlinedButton } from "../common/button";
import ComboBox from "../common/form-input/combo-box";
import TextInput from "../common/form-input/text-input";
import emailCheck from "../common/email-checker";

import { mappedVaccineOptions } from "./vaccine-name";
import ReminderCheck from "./reminder-check";

const StyledColorize = styled(Colorize)({
    marginRight: "10px"
});

const NewVaccine: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState<string>(moment().format());
    const [selectedBoosterDate, setSelectedBoosterDate] = React.useState<string>(moment().format());
    const [errors, setErrors] = React.useState<string[]>([]);

    const handleDateChange = (date: Date | null | any): void => {
        setSelectedDate(date);
        setErrors(errors.filter((err) => err != "date"));
    };
    const handleBoosterDateChange = (date: Date | null | any): void => {
        setSelectedBoosterDate(date);
    };

    const [name, setName] = React.useState<string>("");
    const [nickName, setNickName] = React.useState<string>("");
    const [emailReminder, setReminder] = React.useState<string>("No");
    const [email, setEmail] = React.useState<string>("");

    const [comment, setComment] = React.useState<string>("");
    const [width, setWidth] = React.useState<number>(0);

    const handleComment = (event: string): void => {
        setComment(event);
    };

    const handleErrors = (newErrors: string[]): void => {
        setErrors([...errors, ...newErrors]);
    };

    const deleteNameError = (): void => {
        setErrors(errors.filter((err) => err != "name"));
    };

    const mobile = (): boolean => {
        const isMobile = window.outerWidth <= 740;
        return isMobile;
    };
    const handleMobile = (): void => {
        if (window.outerWidth !== width) {
            setWidth(window.outerWidth);
            mobile();
        }
    };
    React.useEffect(() => {
        window.addEventListener("resize", handleMobile);
        () => window.removeEventListener("resize", handleMobile);
    }, [width]);

    return (
        // TODO add mobile support
        //<Paper square className={mobile() ? classes.mobileContainer : classes.container}>
        <Panel.Container>
            <Grid container>
                <Grid item xs={12}>
                    <Panel.Header>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link
                                variant="body1"
                                color="inherit"
                                href="/vaccines"
                                className={classes.breadcrumb}
                            >
                                <StyledColorize />
                                <Typography>My vaccines</Typography>
                            </Link>
                            <Typography>New vaccine entry</Typography>
                        </Breadcrumbs>
                    </Panel.Header>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={mobile() ? 12 : 6}>
                    <Panel.Body>
                        <Box display="flex" flexDirection="row" p={mobile() ? 3 : 5}>
                            <ComboBox
                                required
                                error={errors.includes("name")}
                                errorMessage={errors.includes("name") ? "name" : ""}
                                id="vaccineName"
                                name="Vaccine"
                                options={mappedVaccineOptions}
                                tooltip="Select vaccine from options."
                                placeholder="Type to search..."
                            />
                        </Box>
                        <Grid item xs={12}>
                            <Box display="flex" flexDirection="row">
                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container>
                                            <KeyboardDatePicker
                                                name="date"
                                                autoOk={!errors.includes("date")}
                                                error={errors.includes("date")}
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="dense"
                                                id="date-picker"
                                                label="Date*"
                                                value={selectedDate}
                                                className={classes.menu}
                                                onChange={(event) => handleDateChange(event)}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date"
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <Grid container>
                                            <KeyboardDatePicker
                                                name="date"
                                                autoOk={!errors.includes("date")}
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="dense"
                                                id="date-picker"
                                                label="Booster date"
                                                className={classes.menu}
                                                value={selectedBoosterDate}
                                                onChange={(event) => handleBoosterDateChange(event)}
                                                KeyboardButtonProps={{
                                                    "aria-label": "change date"
                                                }}
                                            />
                                        </Grid>
                                    </MuiPickersUtilsProvider>
                                </Grid>
                            </Box>
                        </Grid>
                        <Grid>
                            <Box display="flex" flexDirection="row" p={mobile() ? 3 : 5}>
                                <ReminderCheck
                                    sidebarOpen
                                    updateEmailRemainder={(emailReminder: string): void =>
                                        setReminder(emailReminder)
                                    }
                                    updateEmail={(email: string): void => setEmail(email)}
                                    error={errors.includes("email") ? "email" : ""}
                                    emailReminder={emailReminder}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextInput
                                multiline
                                onChange={(event) => handleComment(event.target.value)}
                                name="Comment"
                            />
                        </Grid>
                    </Panel.Body>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Panel.Footer>
                    <FilledButton
                        onClick={() => {
                            const invalidName: boolean = name === "";
                            const invalidEmail: boolean =
                                emailReminder === "Yes" && !emailCheck(email);
                            const invalidDate: boolean =
                                selectedDate.toString().split("T")[0] ===
                                moment()
                                    .format()
                                    .split("T")[0];
                            const invalid: boolean = invalidName || invalidEmail || invalidDate;
                            const newErrors: string[] = [];
                            if (invalidName) {
                                newErrors.push("name");
                            }
                            if (invalidEmail) {
                                newErrors.push("email");
                            }
                            if (invalidDate) {
                                newErrors.push("date");
                            }
                            handleErrors(newErrors);
                            if (!invalid) {
                                props.history.push("/vaccines");
                            }
                        }}
                    >
                        Save
                    </FilledButton>
                    <OutlinedButton
                        onClick={() => {
                            props.history.push("/vaccines");
                        }}
                    >
                        Cancel
                    </OutlinedButton>
                </Panel.Footer>
            </Grid>
        </Panel.Container>
    );
};
export default withRouter(NewVaccine);
