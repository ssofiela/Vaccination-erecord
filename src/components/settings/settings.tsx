import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, styled, Theme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SettingsIcon from "@material-ui/icons/Settings";
import { RouteComponentProps, withRouter } from "react-router";
import { TextField } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import CreateIcon from "@material-ui/icons/Create";

import * as Panel from "../common/panel";
import { FilledButton, OutlinedButton } from "../common/button";
import emailCheck from "../common/email-checker";
import TextInput from "../common/form-input/text-input";

import Birthday, { mappedBirthdayOptions } from "./birthday";
import Reminder, { mappedReminderOptions } from "./reminder";
import ComboBox from "../common/form-input/combo-box";
import { UserState } from "../../interfaces/user";
import { compose, Dispatch } from "redux";
import { storeUserId } from "../../redux/actions/user";
import { connect } from "react-redux";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            margin: theme.spacing(2, 4),
            overFlowX: "auto"
        },
        mobileContainer: {
            margin: theme.spacing(2, 0),
            overFlowX: "auto",
            minWidth: 250
        },
        link: {
            display: "flex",
            color: "black"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 200
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
        },
        inputField: {
            display: "flex",
            flexWrap: "wrap"
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        dotted: {
            width: "100%",
            borderWidth: 2,
            borderColor: theme.palette.secondary.main,
            borderStyle: "dashed",
            marginTop: 40,
            marginBottom: 40
        },
        textField2: {
            marginRight: theme.spacing(1),
            maxWidth: 300,
            marginTop: theme.spacing(2)
        },
        textFieldWithSpace: {
            marginRight: theme.spacing(1),
            width: 300,
        },
        textFieldWithSpaceMobile: {
            marginRight: theme.spacing(1),
            width: 150,
            marginTop: theme.spacing(2)
        },
        marginDouble: {
            marginBottom: theme.spacing(2)
        },
        margin: {
            margin: theme.spacing(3)
        },
        sameLine: {
            flexDirection: "row",
            display: "flex",
        },

    })
);
type Props = RouteComponentProps & MapStateToProps & DispatchProps

const Settings: React.FC<Props, > = props => {
    const classes = useStyles();

    const [emailError, setEmailError] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>("");
    const [editStatus, setEditStatus] = React.useState<boolean>(false);
    const [birthday, setBirthday] = React.useState<number>(0);
    const [reminder, setReminder] = React.useState<number>(0);
    const [oldReminder, setOldReminder] = React.useState<number>(0);
    const [oldReminderEmail, setOldReminderEmail] = React.useState<string>("");
    const [oldBirthday, setOldBirthday] = React.useState<number>(0);

    const [width, setWidth] = React.useState<number>(0);
    const moobile = (): boolean => {
        const isMobile = window.outerWidth <= 510;
        return isMobile;
    };
    const handleMobile = (): void => {
        if (window.outerWidth !== width) {
            setWidth(window.outerWidth);
            moobile();
        }
    };

    const getData = ():void => {
        fetch("https://vaccine-backend.herokuapp.com/api/user", {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }).then(response => response.json())
            .then(data => {
                if (data.default_reminder_email !== null) {
                    setOldReminderEmail(data.default_reminder_email);
                }
                if (data.year_born !== null) {
                    setOldBirthday(data.year_born)
                }
                if (data.reminder_days_before_due !== null) {
                    setOldReminder(data.reminder_days_before_due)
                }
            });
    };

    const pushData = ():void => {
         if (birthday !== oldBirthday && birthday !== 0) {
            fetch("https://vaccine-backend.herokuapp.com/api/user/update", {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({year_born: birthday}),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(response => {
                 response.json()
                getData()
            });
        }
        if (email !== oldReminderEmail && email !== "") {
            fetch("https://vaccine-backend.herokuapp.com/api/user/update", {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({default_reminder_email: email}),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(response => {
                response.json()
                getData()
            })
        }
        if (reminder !== 0) {
            fetch("https://vaccine-backend.herokuapp.com/api/user/update", {
                method: "PUT",
                credentials: "include",
                body: JSON.stringify({reminder_days_before_due: reminder}),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then(response => {
                response.json()
                getData()
            })
        }
    };

    React.useEffect(() => {
        getData()
    });

    React.useEffect(() => {
        if ( props.user.userId < 1){
            props.history.push("/login")
        }
        window.addEventListener("resize", handleMobile);
        //It is important to remove EventListener attached on window.
        () => window.removeEventListener("resize", handleMobile);
    }, [width]);

    const StyledSettings = styled(SettingsIcon)({
        marginRight: "10px"
    });

    const StyledCreate = styled(CreateIcon)({
        marginRight: "10px"
    });

    return (
        // TODO mobile support
        // <Paper square className={moobile() ? classes.mobileContainer : classes.container}>
        <Panel.Container>
            <Grid container>
                <Grid item xs={12}>
                    <Panel.Header>
                        <StyledSettings />
                        <Typography>Settings</Typography>
                    </Panel.Header>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Panel.Body>
                        <Box display="flex" flexDirection="column" p={5}>
                            <div className={classes.marginDouble}>Personal information</div>
                            {!editStatus ?
                                <TextInput
                                    name="Birth year"
                                    type="string"
                                    className={classes.textFieldWithSpace}
                                    id="birthday"
                                    value={oldBirthday === 0 || oldBirthday === undefined ? "Not selected" : oldBirthday}
                                    autoComplete="current-password"
                                    disabled
                                />
                            :
                                <ComboBox
                                    id="birthday"
                                    name="Birth year"
                                    options={mappedBirthdayOptions}
                                    tooltip={editStatus &&"By giving your birth year we can estimate what vaccines you should have."}
                                    placeholder="Select your birth year"
                                    editStatus={editStatus}
                                    onChange={(label, value) => {
                                        setBirthday((value.value))
                                    }}
                                />
                            }
                            <div className={classes.dotted}></div>
                            <div className={classes.marginDouble}>Reminder settings</div>
                            {!editStatus ?
                                <TextInput
                                    name="Reminder time"
                                    className={classes.textFieldWithSpace}
                                    type="string"
                                    id="reminder"
                                    value={oldReminder === 0 || oldReminder === undefined ? "Not selected" : oldReminder}
                                    disabled
                                />
                                :
                                <ComboBox
                                    id="reminder"
                                    name="Reminder time"
                                    options={mappedReminderOptions}
                                    tooltip={editStatus &&"You reserve reminder selected days before the actual date"}
                                    placeholder="Select when you want your reminder"
                                    editStatus={editStatus}
                                    onChange={(label, event) => {
                                        setReminder(event.value)
                                    }}
                                />
                            }
                            <Box
                                display="flex"
                                flexDirection="row"
                                p={5}
                                padding="0px 0px 0px 0px"
                            >

                                    <TextInput
                                        error={emailError}
                                        id="email"
                                        name="Email address for reminder"
                                        autoComplete="email"
                                        tooltip={editStatus ? "Email address is only for the reminders. It is the address where you will deserve a reminder." : undefined}
                                        className={!editStatus ? classes.textFieldWithSpace : undefined}
                                        value={
                                            email === "" && !editStatus
                                                ? "Not selected"
                                                : email
                                        }
                                        onChange={(event) => setEmail(event.target.value)}
                                        disabled={!editStatus}
                                    />
                            </Box>
                        </Box>
                    </Panel.Body>
                    <Grid item xs={12}>
                        {!editStatus ? (
                            <Panel.Footer>
                                <OutlinedButton
                                    onClick={() => {
                                        setEditStatus(true);
                                    }}
                                >
                                    <StyledCreate />
                                    Edit
                                </OutlinedButton>
                            </Panel.Footer>
                        ) : (
                            <Panel.Footer>
                                <FilledButton
                                    onClick={() => {
                                        /* states -> back-end */
                                        let value = true;
                                        if (email !== "") {
                                            value = emailCheck(email);
                                        }
                                        if (value) {
                                            props.history.push("/settings");
                                            setEditStatus(false);
                                            setEmailError(false);
                                            pushData();
                                        } else {
                                            setEmailError(true);
                                        }
                                    }}
                                >
                                    Save
                                </FilledButton>
                                <OutlinedButton
                                    onClick={() => {
                                        /* Get the old data from back-end */
                                        props.history.push("/settings");
                                        setEditStatus(false);
                                    }}
                                >
                                    Cancel
                                </OutlinedButton>
                            </Panel.Footer>
                        )}
                    </Grid>
                </Grid>
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
)(Settings);
