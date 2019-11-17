import React from "react";
import Typography from "@material-ui/core/Typography";
import { createStyles, makeStyles, styled, withStyles } from "@material-ui/core";
import Colorize from "@material-ui/icons/Colorize";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";
import { withRouter, RouteComponentProps } from "react-router";

import * as Panel from "../common/panel";
import { OutlinedButton } from "../common/button";

interface VaccineData {
    vaccine: string;
    abbreviation: string;
    dateTaken: string;
    boosterDueDate: string;
    reminder: boolean;
    comment: string;
}

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            minWidth: 650,
            border: "1px solid #e0e0e080"
        },
        tableCell: {
            borderBottom: "1px solid #e0e0e080"
        }
    })
);

const StyledTableRow = withStyles(() =>
    createStyles({
        root: {
            "&:nth-of-type(odd)": {
                backgroundColor: "#f9f9f9"
            }
        }
    })
)(TableRow);

const StyledCheckIcon = styled(CheckIcon)({
    color: "#13c200"
});

const StyledColorize = styled(Colorize)({
    marginRight: "10px"
});

// TODO remove after demo
function createData(
    vaccine: string,
    abbreviation: string,
    dateTaken: string,
    boosterDueDate: string,
    reminder: boolean,
    comment: string
): VaccineData {
    return {
        vaccine,
        abbreviation,
        dateTaken,
        boosterDueDate,
        reminder,
        comment
    };
}

/**
 * User's vaccine list
 * @param props
 * @constructor
 */
const VaccineList: React.FC<RouteComponentProps> = (props) => {
    const classes = useStyles();

    const tableRows = [
        createData("Diphteria and tetanus", "dT", "21.08.2014", "21.08.2024", true, ""),
        createData("Polip", "dT", "21.08.2014", "03.11.2002", false, ""),
        createData("Measles, mumps and rubella", "MMR", "10.12.1998", "21.08.2024", false, ""),
        createData("Influenza", "dT", "21.08.2014", "04.05.2019", false, "")
    ];
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
                        <Table className={classes.table} aria-label="vaccine-table">
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>Vaccine</TableCell>
                                    <TableCell className={classes.tableCell}>
                                        Abbreviation
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>Date taken</TableCell>
                                    <TableCell className={classes.tableCell}>
                                        Booster due date
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>Reminder</TableCell>
                                    <TableCell className={classes.tableCell}>Comment</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableRows.map((row) => (
                                    <StyledTableRow key={row.vaccine}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            className={classes.tableCell}
                                        >
                                            {row.vaccine}
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            {row.abbreviation}
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            {row.dateTaken}
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            {row.boosterDueDate}
                                        </TableCell>
                                        <TableCell align="center" className={classes.tableCell}>
                                            {row.reminder && <StyledCheckIcon />}
                                        </TableCell>
                                        <TableCell className={classes.tableCell}>
                                            {row.comment}
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
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
};

export default withRouter(VaccineList);
