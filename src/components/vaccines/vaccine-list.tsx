import React from "react";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core";
import Colorize from "@material-ui/icons/Colorize";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { withRouter, RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { User } from "../../interfaces/user";
import { Vaccine, VaccineType } from "../../interfaces/vaccine";
import { storeUser, UserActionTypes } from "../../redux/actions/user";
import { RootState } from "../../redux/reducers";
import { RESPONSE_STATUS } from "../../utils/constants";
import { mapToUser, mapToVaccinePayload, mapToVaccineType } from "../../utils/data-mapper";
import * as Panel from "../common/panel";
import { OutlinedButton } from "../common/button";
import { Dialog } from "../common/dialog";

import { Table } from "./vaccine-table";
import VaccineEntry from "./vaccine-entry";

interface State {
    vaccines: Vaccine[];
    deleteFailedDialogOpen: boolean;
    failedFetchDialogOpen: boolean;
    vaccineEntryOpen: boolean;
    vaccine?: Vaccine;
    vaccineTypes: VaccineType[];
}

interface MapStateToProps {
    user?: User;
}

interface MapDispatchToProps {
    storeUser: (user: User) => UserActionTypes;
}

const StyledColorize = styled(Colorize)({
    marginRight: "10px"
});

/**
 * User's vaccine list
 * @param props
 * @constructor
 */

type Props = RouteComponentProps & MapStateToProps & MapDispatchToProps;
class VaccineList extends React.Component<Props, State> {
    readonly state = {
        vaccines: [],
        deleteFailedDialogOpen: false,
        failedFetchDialogOpen: false,
        vaccineEntryOpen: false,
        vaccine: undefined,
        vaccineTypes: []
    };

    componentDidMount(): void {
        this.getVaccines();
        this.getUser();
    }

    getVaccines = (): void => {
        fetch("https://vaccine-backend.herokuapp.com/api/dose", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((response) => {
            switch (response.status) {
                case RESPONSE_STATUS.SUCCESS: {
                    response.json().then((data) => {
                        this.setState({ vaccines: data.map(mapToVaccinePayload) });
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

    getUser = (): void => {
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

    getVaccineTypeOptions = (): void => {
        fetch("https://vaccine-backend.herokuapp.com/api/vaccine", {
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
                        this.setState({ vaccineTypes: data.map(mapToVaccineType) });
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

    closeDeleteDialog = (): void => {
        this.setState({ deleteFailedDialogOpen: false });
    };

    closeFailedFetchDialog = (): void => {
        this.setState({ failedFetchDialogOpen: false });
    };

    closeVaccineEntry = (vaccineCreated: boolean): void => {
        this.setState({ vaccineEntryOpen: false });
        if (vaccineCreated) {
            this.getVaccines();
        }
    };

    deleteVaccine = (id: number): void => {
        fetch(`https://vaccine-backend.herokuapp.com/api/dose/${id}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            credentials: "include"
        }).then((response) => {
            switch (response.status) {
                case RESPONSE_STATUS.SUCCESS: {
                    response.json().then(() => {
                        // TODO show generic dialog of success
                    });
                    this.getVaccines();
                    break;
                }
                case RESPONSE_STATUS.UNAUTHORIZED: {
                    this.props.history.push("/login");
                    break;
                }
                default: {
                    this.setState({ deleteFailedDialogOpen: true });
                    break;
                }
            }
        });
    };

    editVaccine = (vaccine: Vaccine): void => {
        this.getVaccineTypeOptions();
        this.setState({ vaccineEntryOpen: true, vaccine: vaccine });
    };

    createNewVaccineEntry = (): void => {
        this.getVaccineTypeOptions();
        this.setState({ vaccineEntryOpen: true, vaccine: undefined });
    };

    render(): React.ReactNode {
        const props = this.props;
        const state = this.state;
        return (
            <>
                <Panel.Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <Panel.Header>
                                <StyledColorize />
                                <Typography>My vaccines</Typography>
                            </Panel.Header>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Panel.Body>
                                <Table
                                    vaccines={state.vaccines}
                                    editOnClick={this.editVaccine}
                                    deleteOnClick={this.deleteVaccine}
                                />
                            </Panel.Body>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12}>
                            <Panel.Footer>
                                <OutlinedButton
                                    onClick={() => {
                                        this.createNewVaccineEntry();
                                    }}
                                    startIcon={<AddIcon />}
                                >
                                    Add vaccine
                                </OutlinedButton>
                            </Panel.Footer>
                        </Grid>
                    </Grid>
                </Panel.Container>
                {state.deleteFailedDialogOpen && (
                    <Dialog
                        open={state.deleteFailedDialogOpen}
                        content="Vaccine entry could not be deleted."
                        primaryAction="Ok"
                        handleClose={this.closeDeleteDialog}
                    />
                )}
                {state.failedFetchDialogOpen && (
                    <Dialog
                        open={state.failedFetchDialogOpen}
                        content="Could not fetch vaccine entries."
                        primaryAction="Ok"
                        handleClose={this.closeFailedFetchDialog}
                    />
                )}
                {state.vaccineEntryOpen && (
                    <VaccineEntry
                        handleClose={this.closeVaccineEntry}
                        open={state.vaccineEntryOpen}
                        user={props.user}
                        vaccine={state.vaccine}
                        vaccineTypes={state.vaccineTypes}
                    />
                )}
            </>
        );
    }
}

function mapDispatchToProps(dispatch: Dispatch): MapDispatchToProps {
    return {
        storeUser: (user: User) => dispatch(storeUser(user))
    };
}

function mapStateToProps(state: RootState): MapStateToProps {
    return {
        user: state.user
    };
}

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(VaccineList)
);
