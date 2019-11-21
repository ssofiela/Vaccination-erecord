import React from "react";
import Typography from "@material-ui/core/Typography";
import { styled } from "@material-ui/core";
import Colorize from "@material-ui/icons/Colorize";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import { withRouter, RouteComponentProps } from "react-router";

import { Vaccine } from "../../interfaces/vaccine";
import * as Panel from "../common/panel";
import { OutlinedButton } from "../common/button";
import { RESPONSE_STATUS } from "../../utils/constants";
import { mapToVaccineFormState } from "../../utils/data-mapper";

import { Table } from "./vaccine-table";
import { storeUserId } from "../../redux/actions/user";
import { UserState } from "../../interfaces/user";
import { compose, Dispatch } from "redux";
import { connect } from "react-redux";

interface State {
    vaccines: Vaccine[];
}

const StyledColorize = styled(Colorize)({
    marginRight: "10px"
});

/**
 * User's vaccine list
 * @param props
 * @constructor
 */

type Props = RouteComponentProps & MapStateToProps & DispatchProps
class VaccineList extends React.Component<Props, State> {
    readonly state = {
        vaccines: []
    };

    componentDidMount(): void {
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
                        this.setState({ vaccines: data.map(mapToVaccineFormState) });
                    });
                    break;
                }
                case RESPONSE_STATUS.UNAUTHORIZED: {
                    this.props.history.push("/login");
                    break;
                }
                default: {
                    // TODO Show generic dialog
                    break;
                }
            }
        });
        if (this.props.user.userId === undefined || this.props.user.userId < 1) {
            this.props.history.push("/login")
        }
    }

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
                    break;
                }
                case RESPONSE_STATUS.UNAUTHORIZED: {
                    this.props.history.push("/login");
                    break;
                }
                default: {
                    // TODO Show generic dialog
                    break;
                }
            }
        });
    };

    editVaccine = (id: number): void => {
        this.props.history.push("/add-vaccine", { id: id });
        // TODO pass vaccine data to add new vaccine page.
    };

    render(): React.ReactNode {
        const state = this.state;
        const props = this.props;

        return (
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
                                    props.history.push("/add-vaccine");
                                }}
                                startIcon={<AddIcon />}
                            >
                                Add vaccine
                            </OutlinedButton>
                        </Panel.Footer>
                    </Grid>
                </Grid>
            </Panel.Container>
        );
    }
}

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
)(VaccineList);
