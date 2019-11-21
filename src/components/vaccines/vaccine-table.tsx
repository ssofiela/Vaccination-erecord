import React from "react";
import { createStyles, makeStyles, styled, withStyles } from "@material-ui/core";
import MUITable from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Create";
import CheckIcon from "@material-ui/icons/Check";

import { Vaccine } from "../../interfaces/vaccine";

interface TableProps {
    vaccines: Vaccine[];
    editOnClick: (vaccine: Vaccine) => void;
    deleteOnClick: (id: number) => void;
}

const StyledCheckIcon = styled(CheckIcon)({
    color: "#13c200"
});

const useStyles = makeStyles(() =>
    createStyles({
        table: {
            minWidth: 650,
        },
        tableCell: {
            borderBottom: "1px solid #e0e0e080"
        },
        tableWrapper: {
            overflowX: "auto",
            overflowY: "auto",
            border: "1px solid #e0e0e080",
            maxHeight: 620
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

const Table: React.FC<TableProps> = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.tableWrapper}>
            <MUITable stickyHeader className={classes.table} aria-label="vaccine-table">
                <TableHead>
                    <StyledTableRow>
                        <TableCell>Vaccine</TableCell>
                        <TableCell>Abbreviation</TableCell>
                        <TableCell>Date taken</TableCell>
                        <TableCell>Booster due date</TableCell>
                        <TableCell>Reminder</TableCell>
                        <TableCell>Comment</TableCell>
                        <TableCell>Actions</TableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {props.vaccines.length > 0 ? (
                        props.vaccines.map((vaccine) => (
                            <StyledTableRow key={vaccine.id}>
                                <TableCell component="th" scope="row">
                                    {vaccine.vaccine_name}
                                </TableCell>
                                <TableCell size="small">{vaccine.vaccine_abbreviation}</TableCell>
                                <TableCell size="small">{vaccine.date_taken}</TableCell>
                                <TableCell size="small">{vaccine.booster_due_date}</TableCell>
                                <TableCell align="center" size="small">
                                    {vaccine.booster_email_reminder && <StyledCheckIcon />}
                                </TableCell>
                                <TableCell>{vaccine.comment}</TableCell>
                                <TableCell>
                                    <IconButton
                                        aria-label="edit"
                                        onClick={() => {
                                            props.editOnClick(vaccine)
                                        }}
                                    >
                                        <CreateIcon color="primary" fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        aria-label="delete"
                                        onClick={() => {
                                            props.deleteOnClick(vaccine.id);
                                        }}
                                    >
                                        <DeleteIcon color="primary" fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </StyledTableRow>
                        ))
                    ) : (
                        <StyledTableRow>
                            <TableCell colSpan={7}>{"No vaccines"}</TableCell>
                        </StyledTableRow>
                    )}
                </TableBody>
            </MUITable>
        </div>

    );
};

export { Table };
