import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { styled, useTheme } from "@material-ui/core/styles";
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

import ReminderCheck from "./reminder-check";
import { storeUserId } from "../../redux/actions/user";
import { UserState } from "../../interfaces/user";
import { compose, Dispatch } from "redux";
import { connect } from "react-redux";

const StyledColorize = styled(Colorize)({
    marginRight: "10px"
});

interface VaccineOptions {
    value: number;
    label: string;
}

function createVaccineOptions(options: string[] ): VaccineOptions[] {
    return options.map((option) => ({ value: options.indexOf(option)+1, label: option}));
}

type Props = RouteComponentProps & MapStateToProps & DispatchProps

const NewVaccine: React.FC<Props> = (props) => {
    const classes = useStyles();
    const theme = useTheme();

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
    const [vaccineList, setVaccineList] = React.useState<string[]>([]);
    const [abbreviation, setAbbreviation] = React.useState<string[]>([]);

    const mappedVaccineOptions = createVaccineOptions(vaccineList);
    const mappedAbbserviationOptions = createVaccineOptions(abbreviation);


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
        fetch("https://vaccine-backend.herokuapp.com/api/vaccine", {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then(data => {
                let vaccines = [];
                let abb = [];
                for (let i = 0; i < data.length; i++) {
                    vaccines.push(data[i].name);
                    abb.push(data[i].abbreviation)

                }
                setVaccineList(vaccines);
                setAbbreviation(abb);
            });
        if (props.user.userId === undefined || props.user.userId < 1) {
            props.history.push("/login")
        }
        window.addEventListener("resize", handleMobile);
        () => window.removeEventListener("resize", handleMobile);
    }, [width]);

    //const initialValues = props.location.state.vaccine;
    console.log(props);

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
                        <Box display="flex" flexDirection="row" p={mobile() ? 3 : 5}>
                            <ComboBox
                                required
                                id="vaccineAbbreviation"
                                name="Abbreviation"
                                options={mappedAbbserviationOptions}
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
                <Panel.Footer justifyContent="flex-end">
                    <FilledButton
                        style={{ marginRight: theme.spacing(2)}}
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
interface DispatchProps {
    storeUserId: typeof storeUserId
}

interface MapStateToProps {
    user: UserState
}

const mapDispatchToProps = (dispatch: Dispatch):DispatchProps => {
    return {
        storeUserId: (payload: number) => dispatch(storeUserId(payload))
    }
};
function mapStateToProps(state: any):MapStateToProps {
    return {
        user: state.user
    }
};

export default compose(
    withRouter,
    connect( mapStateToProps, mapDispatchToProps)
)(NewVaccine);
