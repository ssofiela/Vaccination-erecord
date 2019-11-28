import React from "react";
import MuiDialog, { DialogProps } from "@material-ui/core/Dialog";
import { createStyles, makeStyles, Theme, useMediaQuery, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ArrowBack from "@material-ui/icons/ArrowBack";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";
import { Formik } from "formik";
import { RouteComponentProps, withRouter } from "react-router";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { createNewVaccineEntry, updateVaccineEntry } from "../../utils/requests";
import { hasFieldErrors } from "../../utils/form-utils";
import { Vaccine, VaccineFormState, VaccineType } from "../../interfaces/vaccine";
import { User } from "../../interfaces/user";
import { storeUser, UserActionTypes } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers";
import { createVaccineEntryInitialValues, mapToVaccineFormState } from "../../utils/data-mapper";
import { RESPONSE_STATUS } from "../../utils/constants";
import { getNewVaccineValidationSchema } from "../../utils/field-validation";
import * as Panel from "../common/panel";
import { ComboBox, DatePicker, TextInput } from "../common/form-input";
import { FilledButton, OutlinedButton } from "../common/button";
import { Dialog } from "../common/dialog";

import ReminderCheck from "./reminder-check";

interface OwnProps {
    handleClose: (vaccineCreated: boolean) => void;
    vaccine?: Vaccine;
    vaccineTypes: VaccineType[];
    user?: User;
}

interface FormState {
    vaccine: VaccineFormState;
}

interface MapStateToProps {
    user?: User;
}

interface MapDispatchToProps {
    storeUser: (user: User) => UserActionTypes;
}

type Props = OwnProps & DialogProps & RouteComponentProps & MapStateToProps & MapDispatchToProps;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialog: {
            "& .MuiDialog-paper": {
                width: "100%",
                maxWidth: "750px",
                [theme.breakpoints.down("xs")]: {
                    height: "100%",
                    justifyContent: "space-between"
                }
            }
        },
        backButton: {
            padding: "8px",
            marginRight: theme.spacing(1)
        },
        leftInputContainer: {
            [theme.breakpoints.up("md")]: {
                marginRight: theme.spacing(3)
            },
            [theme.breakpoints.only("sm")]: {
                marginRight: theme.spacing(2)
            }
        },
        rightInputContainer: {
            [theme.breakpoints.up("md")]: {
                marginLeft: theme.spacing(3)
            },
            [theme.breakpoints.only("sm")]: {
                marginLeft: theme.spacing(2)
            }
        }
    })
);

const VaccineEntry: React.FC<Props> = (props) => {
    const classes = useStyles();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("xs"));
    const initialValues = props.vaccine
        ? { vaccine: mapToVaccineFormState(props.vaccine) }
        : {
              vaccine: createVaccineEntryInitialValues(
                  (props.user || {}).default_reminder_email || ""
              )
          };
    const isNewVaccineEntry = !props.vaccine;

    const [failedFetchDialogOpen, setFailedFetchDialogOpen] = React.useState<boolean>(false);
    const [failedRequestDialogOpen, setFailedRequestDialogOpen] = React.useState<boolean>(false);

    const findVaccineTypeById = (id: string): VaccineType | undefined => {
        return props.vaccineTypes.find((vaccineType) => vaccineType.id === id);
    };

    return (
        <>
            <Formik<FormState>
                initialValues={initialValues}
                validationSchema={getNewVaccineValidationSchema()}
                onSubmit={(values, formikActions) => {
                    if (isNewVaccineEntry) {
                        createNewVaccineEntry(values.vaccine).then((status) => {
                            switch (status) {
                                case RESPONSE_STATUS.SUCCESS: {
                                    props.handleClose(true);
                                    break;
                                }
                                case RESPONSE_STATUS.UNAUTHORIZED: {
                                    props.history.push("/login");
                                    break;
                                }
                                default: {
                                    setFailedRequestDialogOpen(true);
                                    formikActions.setSubmitting(false);
                                    break;
                                }
                            }
                        });
                    } else {
                        updateVaccineEntry(values.vaccine).then((status) => {
                            switch (status) {
                                case RESPONSE_STATUS.SUCCESS: {
                                    props.handleClose(true);
                                    break;
                                }
                                case RESPONSE_STATUS.UNAUTHORIZED: {
                                    props.history.push("/login");
                                    break;
                                }
                                default: {
                                    setFailedRequestDialogOpen(true);
                                    formikActions.setSubmitting(false);
                                    break;
                                }
                            }
                        });
                    }
                }}
                enableReinitialize
                render={(form) => {
                    return (
                        <MuiDialog
                            disableEscapeKeyDown
                            disableBackdropClick
                            fullScreen={fullScreen}
                            className={classes.dialog}
                            open={props.open}
                        >
                            <Grid container>
                                <Grid item xs={12}>
                                    <Panel.Header p={fullScreen ? 0.5 : 1.5}>
                                        {fullScreen && (
                                            <IconButton className={classes.backButton}>
                                                <ArrowBack />
                                            </IconButton>
                                        )}
                                        <Typography>
                                            {isNewVaccineEntry
                                                ? "New vaccine entry"
                                                : "Update vaccine entry"}
                                        </Typography>
                                    </Panel.Header>
                                </Grid>
                            </Grid>
                            <Panel.Body>
                                <Grid container>
                                    <Grid item xs={12} sm={5}>
                                        <Box className={classes.leftInputContainer}>
                                            <ComboBox
                                                error={Boolean(
                                                    ((form.errors.vaccine || {}).vaccineType || {})
                                                        .name
                                                )}
                                                errorMessage={
                                                    ((form.errors.vaccine || {}).vaccineType || {})
                                                        .name
                                                }
                                                isEditable={true}
                                                required
                                                id="name"
                                                name="Vaccine name"
                                                value={{
                                                    label: form.values.vaccine.vaccineType.name,
                                                    value: form.values.vaccine.vaccineType.id
                                                }}
                                                options={props.vaccineTypes.map((type) => {
                                                    return {
                                                        value: type.id,
                                                        label: type.name
                                                    };
                                                })}
                                                tooltip="Select vaccine name from options."
                                                placeholder="Type to search..."
                                                onChange={(option) => {
                                                    const chosenType = findVaccineTypeById(
                                                        option.value
                                                    );
                                                    if (chosenType) {
                                                        form.setFieldValue(
                                                            "vaccine.vaccineType",
                                                            chosenType
                                                        );
                                                        form.setFieldTouched("vaccine.vaccineType");
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            style={{ height: "100%" }}
                                        >
                                            <Typography color="textSecondary">OR</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={5}>
                                        <Box className={classes.rightInputContainer}>
                                            <ComboBox
                                                error={Boolean(
                                                    ((form.errors.vaccine || {}).vaccineType || {})
                                                        .abbreviation
                                                )}
                                                errorMessage={
                                                    ((form.errors.vaccine || {}).vaccineType || {})
                                                        .abbreviation
                                                }
                                                required
                                                isEditable={true}
                                                id="abbreviation"
                                                name="Vaccine abbreviation"
                                                value={{
                                                    label:
                                                        form.values.vaccine.vaccineType
                                                            .abbreviation,
                                                    value: form.values.vaccine.vaccineType.id
                                                }}
                                                options={props.vaccineTypes.map((type) => {
                                                    return {
                                                        value: type.id,
                                                        label: type.abbreviation
                                                    };
                                                })}
                                                tooltip="Select vaccine abbreviation from options."
                                                placeholder="Type to search..."
                                                onChange={(option) => {
                                                    const chosenType = findVaccineTypeById(
                                                        option.value
                                                    );
                                                    if (chosenType) {
                                                        form.setFieldValue(
                                                            "vaccine.vaccineType",
                                                            chosenType
                                                        );
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box className={classes.leftInputContainer}>
                                            <DatePicker
                                                error={Boolean(
                                                    (form.errors.vaccine || {}).dateTaken
                                                )}
                                                errorMessage={(form.errors.vaccine || {}).dateTaken}
                                                required
                                                id="dateTaken"
                                                onDateChange={(value) => {
                                                    form.setFieldValue("vaccine.dateTaken", value);
                                                }}
                                                value={form.values.vaccine.dateTaken}
                                                name="Date"
                                                tooltip="Insert the date when the vaccine was taken."
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Box className={classes.rightInputContainer}>
                                            <DatePicker
                                                error={Boolean(
                                                    (form.errors.vaccine || {}).boosterDate
                                                )}
                                                errorMessage={
                                                    (form.errors.vaccine || {}).boosterDate
                                                }
                                                id="boosterDate"
                                                onDateChange={(value) => {
                                                    form.setFieldValue(
                                                        "vaccine.boosterDate",
                                                        value
                                                    );
                                                }}
                                                value={form.values.vaccine.boosterDate}
                                                name="Booster due date"
                                                tooltip="Insert the date when the booster shot is due."
                                            />
                                        </Box>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ReminderCheck
                                            onChangeRadio={(value) => {
                                                form.setFieldValue("vaccine.reminder", value);
                                                if (value) {
                                                    if (props.user) {
                                                        form.setFieldValue(
                                                            "vaccine.reminderEmail",
                                                            (props.vaccine || {})
                                                                .booster_reminder_address ||
                                                                props.user.default_reminder_email
                                                        );
                                                    }
                                                    form.setFieldTouched(
                                                        "vaccine.reminderEmail",
                                                        true
                                                    );
                                                }
                                            }}
                                            onChangeEmail={(value) => {
                                                form.setFieldValue("vaccine.reminderEmail", value);
                                                form.setFieldTouched("vaccine.reminderEmail", true);
                                            }}
                                            error={Boolean(
                                                (form.errors.vaccine || {}).reminderEmail
                                            )}
                                            errorMessage={(form.errors.vaccine || {}).reminderEmail}
                                            radioValue={form.values.vaccine.reminder}
                                            inputValue={form.values.vaccine.reminderEmail}
                                            name="Turn on email reminders"
                                            id="reminder"
                                            tooltip="Opt-in for email reminders when your booster shot is due."
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextInput
                                            multiline
                                            value={form.values.vaccine.comment}
                                            onChange={(event) =>
                                                form.setFieldValue(
                                                    "vaccine.comment",
                                                    event.target.value
                                                )
                                            }
                                            name="Comment"
                                        />
                                    </Grid>
                                </Grid>
                            </Panel.Body>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Panel.Footer
                                        justifyContent={fullScreen ? "space-between" : "flex-end"}
                                    >
                                        <FilledButton
                                            type="submit"
                                            disabled={form.isSubmitting || !form.isValid}
                                            style={{ marginRight: theme.spacing(2) }}
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
                                                props.handleClose(false);
                                            }}
                                        >
                                            Cancel
                                        </OutlinedButton>
                                    </Panel.Footer>
                                </Grid>
                            </Grid>
                        </MuiDialog>
                    );
                }}
            />
            {failedFetchDialogOpen && (
                <Dialog
                    open={failedFetchDialogOpen}
                    content="Could not fetch vaccine types."
                    primaryAction="Ok"
                    handleClose={() => {
                        setFailedFetchDialogOpen(false);
                    }}
                />
            )}
            {failedRequestDialogOpen && (
                <Dialog
                    open={failedRequestDialogOpen}
                    content={
                        isNewVaccineEntry
                            ? "Could not save vaccine entry."
                            : "Could not update vaccine entry."
                    }
                    primaryAction="Ok"
                    handleClose={() => {
                        setFailedRequestDialogOpen(false);
                    }}
                />
            )}
        </>
    );
};

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
    )(VaccineEntry)
);
