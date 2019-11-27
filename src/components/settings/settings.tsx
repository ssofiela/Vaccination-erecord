/* eslint-disable @typescript-eslint/camelcase */
import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import Grid from "@material-ui/core/Grid";
import { styled } from "@material-ui/core/styles";
import SettingsIcon from "@material-ui/icons/Settings";
import { RouteComponentProps, withRouter } from "react-router";
import Typography from "@material-ui/core/Typography";
import CreateIcon from "@material-ui/icons/Create";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Formik } from "formik";

import { AccountSettingsFormState, User } from "../../interfaces/user";
import { storeUser, UserActionTypes } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers";
import { RESPONSE_STATUS } from "../../utils/constants";
import { getSettingsValidationSchema } from "../../utils/field-validation";
import { hasFieldErrors } from "../../utils/form-utils";
import {
    createAccountSettingsInitialValues,
    mapToAccountSettingsFormState,
    mapToUser
} from "../../utils/data-mapper";
import * as Panel from "../common/panel";
import { FilledButton, OutlinedButton } from "../common/button";
import TextInput from "../common/form-input/text-input";
import ComboBox from "../common/form-input/combo-box";
import { Dialog } from "../common/dialog";
import { HR } from "../common/hr";

import { mappedBirthdayOptions } from "./birthday";
import { mappedReminderOptions } from "./reminder";

interface FormState {
    settings: AccountSettingsFormState;
}

interface State {
    settings?: AccountSettingsFormState;
    failedFetchDialogOpen: boolean;
    failedRequestDialogOpen: boolean;
    isEditable: boolean;
}

interface MapStateToProps {
    user?: User;
}

interface MapDispatchToProps {
    storeUser: (user: User) => UserActionTypes;
}

const StyledSettings = styled(SettingsIcon)({
    marginRight: "10px"
});

const StyledCreate = styled(CreateIcon)({
    marginRight: "10px"
});

type Props = RouteComponentProps & MapStateToProps & MapDispatchToProps;

class Settings extends React.Component<Props, State> {
    readonly state = {
        settings: createAccountSettingsInitialValues(),
        failedFetchDialogOpen: false,
        failedRequestDialogOpen: false,
        isEditable: false
    };

    componentDidMount(): void {
        this.getData();
    }

    getData = (): void => {
        fetch("https://vaccine-backend.herokuapp.com/api/user", {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            }
        }).then((response) => {
            switch (response.status) {
                case RESPONSE_STATUS.SUCCESS: {
                    response.json().then((data) => {
                        this.props.storeUser(mapToUser(data));
                        this.setState({ settings: mapToAccountSettingsFormState(data) });
                    });
                    break;
                }
                case RESPONSE_STATUS.UNAUTHORIZED: {
                    this.props.history.push("/login");
                    break;
                }
                default: {
                    this.setState({ failedFetchDialogOpen: true });
                    break;
                }
            }
        });
    };

    pushData = (values: AccountSettingsFormState): void => {
        fetch("https://vaccine-backend.herokuapp.com/api/user", {
            method: "PUT",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                reminder_days_before_due: values.reminderDaysBeforeDue,
                year_born: values.birthYear,
                default_reminder_email: values.reminderEmail
            })
        }).then((response) => {
            switch (response.status) {
                case RESPONSE_STATUS.SUCCESS: {
                    this.getData();
                    this.setState({ isEditable: false });
                    break;
                }
                case RESPONSE_STATUS.UNAUTHORIZED: {
                    this.props.history.push("/login");
                    break;
                }
                default: {
                    this.setState({ failedRequestDialogOpen: true });
                    break;
                }
            }
        });
    };

    render(): React.ReactNode {
        const state = this.state;
        return (
            <>
                <Formik<FormState>
                    initialValues={{ settings: state.settings }}
                    validationSchema={getSettingsValidationSchema()}
                    onSubmit={(values, _formikActions) => {
                        this.pushData(values.settings);
                    }}
                    enableReinitialize
                    render={(form) => {
                        return (
                            <Grid item xs={12} sm={10} md={10}>
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
                                                <Grid item xs={12} md={6}>
                                                    <Typography
                                                        variant="h6"
                                                        style={{
                                                            fontSize: 18,
                                                            marginBottom: "16px"
                                                        }}
                                                    >
                                                        Personal information
                                                    </Typography>
                                                    <ComboBox
                                                        error={Boolean(
                                                            (form.errors.settings || {}).birthYear
                                                        )}
                                                        errorMessage={
                                                            (form.errors.settings || {}).birthYear
                                                        }
                                                        id="birthday"
                                                        name="Year of birth"
                                                        value={{
                                                            label: form.values.settings.birthYear,
                                                            value: form.values.settings.birthYear
                                                        }}
                                                        options={mappedBirthdayOptions}
                                                        tooltip={
                                                            state.isEditable
                                                                ? "By giving your year of birth we can estimate what vaccines you should have."
                                                                : undefined
                                                        }
                                                        placeholder="Select your birth year."
                                                        isEditable={state.isEditable}
                                                        onChange={(option) => {
                                                            form.setFieldValue(
                                                                "settings.birthYear",
                                                                option.value
                                                            );
                                                        }}
                                                    />
                                                </Grid>
                                                <HR />
                                                <Grid item xs={12} md={6}>
                                                    <Typography
                                                        variant="h6"
                                                        style={{
                                                            fontSize: 18,
                                                            marginBottom: "16px"
                                                        }}
                                                    >
                                                        Reminder settings
                                                    </Typography>
                                                    <ComboBox
                                                        error={Boolean(
                                                            (form.errors.settings || {})
                                                                .reminderDaysBeforeDue
                                                        )}
                                                        errorMessage={
                                                            (form.errors.settings || {})
                                                                .reminderDaysBeforeDue
                                                        }
                                                        id="reminder"
                                                        name="Reminder time"
                                                        value={{
                                                            value:
                                                                form.values.settings
                                                                    .reminderDaysBeforeDue,
                                                            label:
                                                                form.values.settings
                                                                    .reminderDaysBeforeDue +
                                                                " days before"
                                                        }}
                                                        options={mappedReminderOptions}
                                                        tooltip={
                                                            state.isEditable
                                                                ? "This option defined how many days prior to the vaccine booster due date you'd like to receive the reminder."
                                                                : undefined
                                                        }
                                                        placeholder="Select when you want your reminder"
                                                        isEditable={state.isEditable}
                                                        onChange={(option) => {
                                                            form.setFieldValue(
                                                                "settings.reminderDaysBeforeDue",
                                                                option.value
                                                            );
                                                        }}
                                                    />
                                                    <TextInput
                                                        error={Boolean(
                                                            (form.errors.settings || {})
                                                                .reminderEmail
                                                        )}
                                                        errorMessage={
                                                            (form.errors.settings || {})
                                                                .reminderEmail
                                                        }
                                                        id="email"
                                                        name="Email address for reminder"
                                                        autoComplete="email"
                                                        tooltip={
                                                            state.isEditable
                                                                ? "Email address is only for the reminders. It is the address where you will deserve a reminder."
                                                                : undefined
                                                        }
                                                        value={form.values.settings.reminderEmail}
                                                        onChange={(event) => {
                                                            form.setFieldValue(
                                                                "settings.reminderEmail",
                                                                event.target.value
                                                            );
                                                        }}
                                                        disabled={!state.isEditable}
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Panel.Body>
                                    <Grid item xs={12}>
                                        {!state.isEditable ? (
                                            <Panel.Footer>
                                                <OutlinedButton
                                                    onClick={() => {
                                                        this.setState({ isEditable: true });
                                                    }}
                                                >
                                                    <StyledCreate />
                                                    Edit
                                                </OutlinedButton>
                                            </Panel.Footer>
                                        ) : (
                                            <Panel.Footer justifyContent="flex-end">
                                                <FilledButton
                                                    type="submit"
                                                    style={{ marginRight: "16px" }}
                                                    disabled={form.isSubmitting || !form.isValid}
                                                    onClick={() => {
                                                        form.validateForm().then((errors) => {
                                                            if (!hasFieldErrors(errors)) {
                                                                form.submitForm();
                                                            } else {
                                                                form.setErrors(errors);
                                                            }
                                                        });
                                                    }}
                                                >
                                                    Save
                                                </FilledButton>
                                                <OutlinedButton
                                                    onClick={() => {
                                                        form.resetForm();
                                                        this.setState({ isEditable: false });
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
                {state.failedFetchDialogOpen && (
                    <Dialog
                        open={state.failedFetchDialogOpen}
                        content="Could not fetch account settings."
                        primaryAction="Ok"
                        handleClose={() => {
                            this.setState({ failedFetchDialogOpen: false });
                        }}
                    />
                )}

                {state.failedRequestDialogOpen && (
                    <Dialog
                        open={state.failedRequestDialogOpen}
                        content={"Could not save account settings."}
                        primaryAction="Ok"
                        handleClose={() => {
                            this.setState({ failedRequestDialogOpen: false });
                        }}
                    />
                )}
            </>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToProps => {
    return {
        storeUser: (user: User) => dispatch(storeUser(user))
    };
};
function mapStateToProps(state: RootState): MapStateToProps {
    return {
        user: state.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(Settings)
);
