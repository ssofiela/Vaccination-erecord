import React from "react";
import Dialog, { DialogProps } from "@material-ui/core/Dialog";
import { useMediaQuery, useTheme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Formik } from "formik";

import { Vaccine } from "../../interfaces/vaccine";
import * as Panel from "../common/panel";
import { ComboBox } from "../common/form-input";

interface OwnProps {
    handleClose: () => void
    initialValues?: Vaccine
}

type Props = OwnProps & DialogProps

const VaccineEntry: React.FC<Props> = props => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

    return (
        <Formik
            initialValues={props.initialValues ?  props.initialValues : {}}
            validationSchema={{}}
            onSubmit={() => {}}
            enableReinitialize
            render={(form) => {
                return (
                    <Dialog
                        fullScreen={fullScreen}
                        open={props.open}
                        onClose={props.handleClose}
                    >
                        <Panel.Header>

                        </Panel.Header>
                        <Panel.Body>
                            <Grid container>
                                <Grid item sm={12} md={6}>
                                    <ComboBox
                                        error
                                        required
                                        id="vaccine_name"
                                        name="Vaccine"
                                        options={[]}
                                        tooltip="Select vaccine from options."
                                        placeholder="Type to search..."
                                        editStatus={false}
                                    />
                                </Grid>
                                <Grid item sm={12} md={6}>

                                </Grid>
                            </Grid>
                        </Panel.Body>
                        <Panel.Footer></Panel.Footer>
                    </Dialog>
                )
            }}
        />
    );
};

export { VaccineEntry }