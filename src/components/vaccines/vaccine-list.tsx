import React from "react";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {
    createStyles,
    makeStyles,
    styled,
    Theme,
    useTheme,
    withStyles
} from "@material-ui/core";
import Colorize from "@material-ui/icons/Colorize";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import AddIcon from "@material-ui/icons/Add";
import CheckIcon from "@material-ui/icons/Check";

interface VaccineData {
    vaccine: string;
    abbreviation: string;
    dateTaken: string;
    boosterDueDate: string;
    reminder: boolean;
    comment: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            borderLeft: `7px solid ${theme.palette.primary.main}`
        },
        container: {
            margin: theme.spacing(2, 4),
            overFlowX: "auto",
            minWidth: 800
        },
        table: {
            minWidth: 650,
            border: "1px solid #e0e0e080"
        },
        button: {
            backgroundColor: theme.palette.background.default,
            borderRadius: 0,
            borderWidth: "2px"
        },
        tableCell: {
            borderBottom: "1px solid #e0e0e080"
        }
    })
);

const StyledButton = withStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.default,
            borderRadius: 0,
            borderWidth: "2px",
            "&:hover": {
                borderWidth: "2px"
            }
        }
    })
)(Button);

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
const VaccineList: React.FC = () => {
    const theme = useTheme();
    const classes = useStyles();

    const tableRows = [
        createData(
            "Diphteria and tetanus",
            "dT",
            "21.08.2014",
            "21.08.2024",
            true,
            ""
        ),
        createData("Polip", "dT", "21.08.2014", "03.11.2002", false, ""),
        createData(
            "Measles, mumps and rubella",
            "MMR",
            "10.12.1998",
            "21.08.2024",
            false,
            ""
        ),
        createData("Influenza", "dT", "21.08.2014", "04.05.2019", false, "")
    ];
    return (
        <Paper square className={classes.container}>
            <Grid container>
                <Grid item xs={12}>
                    <Box
                        className={classes.header}
                        display="flex"
                        flexDirection="row"
                        bgcolor={theme.palette.secondary.main}
                        p={1.5}
                    >
                        <StyledColorize />
                        <Typography>My vaccines</Typography>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Box p={5}>
                        <Table
                            className={classes.table}
                            aria-label="vaccine-table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.tableCell}>
                                        Vaccine
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        Abbreviation
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        Date taken
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        Booster due date
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        Reminder
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        Comment
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {tableRows.map(row => (
                                    <StyledTableRow key={row.vaccine}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            className={classes.tableCell}
                                        >
                                            {row.vaccine}
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableCell}
                                        >
                                            {row.abbreviation}
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableCell}
                                        >
                                            {row.dateTaken}
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableCell}
                                        >
                                            {row.boosterDueDate}
                                        </TableCell>
                                        <TableCell
                                            align="center"
                                            className={classes.tableCell}
                                        >
                                            {row.reminder && (
                                                <StyledCheckIcon />
                                            )}
                                        </TableCell>
                                        <TableCell
                                            className={classes.tableCell}
                                        >
                                            {row.comment}
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Box>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Box
                        display="flex"
                        flexDirection="row"
                        bgcolor="#f9f9f9"
                        p={2}
                    >
                        <StyledButton
                            variant="outlined"
                            color="primary"
                            className={classes.button}
                            startIcon={<AddIcon />}
                        >
                            Add vaccine
                        </StyledButton>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default VaccineList;
