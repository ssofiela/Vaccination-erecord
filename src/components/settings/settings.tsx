import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { createStyles, makeStyles, styled, Theme, useTheme } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import SettingsIcon from "@material-ui/icons/Settings";
import { RouteComponentProps, withRouter } from "react-router";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import { compose, Dispatch } from "redux";
import { connect } from "react-redux";

import { AccountSettingsFormState, UserState } from "../../interfaces/user";
import { storeUserId } from "../../redux/actions/user";
import * as Panel from "../common/panel";
import { FilledButton, OutlinedButton } from "../common/button";
import emailCheck from "../common/email-checker";
import TextInput from "../common/form-input/text-input";
import ComboBox from "../common/form-input/combo-box";

import Birthday, { mappedBirthdayOptions } from "./birthday";
import Reminder, { mappedReminderOptions } from "./reminder";
import { Formik } from "formik";
import { RESPONSE_STATUS } from "../../utils/constants";
import { createAccountSettingsInitialValues, mapToAccountSettingsFormState } from "../../utils/data-mapper";
import { Dialog } from "../common/dialog";

interface FormState {
    settings: AccountSettingsFormState
}

const StyledSettings = styled(SettingsIcon)({
    marginRight: "10px"
});

const StyledCreate = styled(CreateIcon)({
    marginRight: "10px"
});

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
        textFieldWithSpace2:{
            minWidth: 400,
        },
        textFieldWithSpaceMobile: {
            marginRight: theme.spacing(1),
            width: 150,
            marginTop: theme.spacing(2)
        },
        marginDouble: {
            marginBottom: theme.spacing(2),
            fontSize: 18
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

const Settings: React.FC<Props> = props => {
    const classes = useStyles();
    const theme = useTheme();
    const [accountSettings, setInitialAccountSettings] = React.useState<AccountSettingsFormState>(createAccountSettingsInitialValues());
    const [failedFetchDialogOpen, setFailedFetchDialogOpen] = React.useState<boolean>(false);
    const [failedRequestDialogOpen, setFailedRequestDialogOpen] = React.useState<boolean>(false);

    const [emailError, setEmailError] = React.useState<boolean>(false);
    const [email, setEmail] = React.useState<string>("");
    const [isEditable, setEditable] = React.useState<boolean>(false);

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

    const getData = () :void => {
        fetch("https://vaccine-backend.herokuapp.com/api/user", {
            method: "GET",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
        }).then(response => {
            switch (response.status) {
                case RESPONSE_STATUS.SUCCESS: {
                    response.json().then((data) => {
                        setInitialAccountSettings(mapToAccountSettingsFormState(data))
                    });
                    break;
                }
                case RESPONSE_STATUS.UNAUTHORIZED: {
                    props.history.push("/login");
                    break;
                }
                default: {
                    setFailedFetchDialogOpen(true);
                    break;
                }
            }
        })
    };

    const pushData = (values: AccountSettingsFormState) :void => {
        fetch("https://vaccine-backend.herokuapp.com/api/user", {
            method: "PUT",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                reminder_days_before_due: values.reminderDaysBeforeDue,
                year_born: values.birthYear,
                default_reminder_email: values.reminderEmail
            })
        }).then(response => {
            switch (response.status) {
                case RESPONSE_STATUS.SUCCESS: {
                    setInitialAccountSettings(values);
                    setEditable(false);
                    break;
                }
                case RESPONSE_STATUS.UNAUTHORIZED: {
                    props.history.push("/login");
                    break;
                }
                default: {
                    setFailedRequestDialogOpen(true);
                    break;
                }
            }
        })
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

    return (
        <>
            <Formik<FormState>
            initialValues={{ settings: accountSettings }}
            validationSchema={{}}
            onSubmit={(values, _formikActions) => {
                pushData(values.settings);
            }}
            enableReinitialize
            render={(form) => {
                return (
                    <Grid item xs={12} sm={11} md={10}>
                        <Panel.Container>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Panel.Header>
                                        <StyledSettings />
                                        <Typography>Settings</Typography>
                                    </Panel.Header>
                                </Grid>
                            </Grid>
                            <Panel.Body>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography variant="h6" className={classes.marginDouble}>Personal information</Typography>
                                        <ComboBox
                                            id="birthday"
                                            name="Year of birth"
                                            value={{
                                                label: form.values.settings.birthYear,
                                                value: form.values.settings.birthYear
                                            }}
                                            options={mappedBirthdayOptions}
                                            tooltip={isEditable ? "By giving your year of birth we can estimate what vaccines you should have." : undefined}
                                            placeholder="Select your birth year."
                                            isEditable={isEditable}
                                            onChange={(option) => {
                                                form.setFieldValue("settings.birthYear", option.value)
                                            }}
                                        />
                                        <div className={classes.dotted}/>
                                        <Typography variant="h6" className={classes.marginDouble}>Reminder settings</Typography>
                                        <ComboBox
                                            id="reminder"
                                            name="Reminder time"
                                            value={{
                                                value: form.values.settings.reminderDaysBeforeDue,
                                                label: form.values.settings.reminderDaysBeforeDue
                                            }}
                                            options={mappedReminderOptions}
                                            tooltip={isEditable ? "This option defined how many days prior to the vaccine booster due date you'd like to receive the reminder." : undefined}
                                            placeholder="Select when you want your reminder"
                                            isEditable={isEditable}
                                            onChange={((option) => {
                                                    form.setFieldValue("settings.reminderDaysBeforeDue", option.value)
                                                }
                                            )}
                                        />
                                        <Box
                                            display="flex"
                                            flexDirection="row"
                                            p={5}
                                            padding="0px 0px 0px 0px"
                                        >
                                            <TextInput
                                                error={emailError}
                                                errorMessage={"Invalid email address"}
                                                id="email"
                                                name="Email address for reminder"
                                                autoComplete="email"
                                                tooltip={isEditable ? "Email address is only for the reminders. It is the address where you will deserve a reminder." : undefined}
                                                className={!isEditable ? classes.textFieldWithSpace : classes.textFieldWithSpace2 }
                                                value={form.values.settings.reminderEmail}
                                                onChange={(event) => {
                                                    form.setFieldValue("settings.reminderEmail", event.target.value)
                                                }}
                                                disabled={!isEditable}
                                            />
                                        </Box>
                                    </Grid>
                                </Grid>
                            </Panel.Body>
                            <Grid item xs={12}>
                                {!isEditable ? (
                                    <Panel.Footer>
                                        <OutlinedButton
                                            onClick={() => {
                                                setEditable(true);
                                            }}
                                        >
                                            <StyledCreate />
                                            Edit
                                        </OutlinedButton>
                                    </Panel.Footer>
                                ) : (
                                    <Panel.Footer justifyContent="flex-end">
                                        <FilledButton
                                            style={{ marginRight: theme.spacing(2)}}
                                            onClick={() => {
                                                form.submitForm()
                                            }}
                                        >
                                            Save
                                        </FilledButton>
                                        <OutlinedButton
                                            onClick={() => {
                                                form.resetForm();
                                                props.history.push("/settings");
                                                setEditable(false);
                                            }}
                                        >
                                            Cancel
                                        </OutlinedButton>
                                    </Panel.Footer>
                                )}
                            </Grid>
                        </Panel.Container>
                    </Grid>
                );
            }}
        />
            {failedFetchDialogOpen &&
            <Dialog
                open={failedFetchDialogOpen}
                content="Could not fetch account settings."
                primaryAction="Ok"
                handleClose={() => {setFailedFetchDialogOpen(false)}}
            />
            }

            {failedRequestDialogOpen &&
            <Dialog
                open={failedRequestDialogOpen}
                content={"Could not save account settings"}
                primaryAction="Ok"
                handleClose={() => {setFailedRequestDialogOpen(false)}}
            />

            }
        </>

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
