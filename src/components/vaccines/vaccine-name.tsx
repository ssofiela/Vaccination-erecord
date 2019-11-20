import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
//eslint-disable-next-line import/no-unassigned-import
import "date-fns";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineOutlinedIcon from "@material-ui/icons/HelpOutlineOutlined";
import Tooltip from "@material-ui/core/Tooltip";

import useStyles from "../common/styles"

interface MainProps {
    sidebarOpen: boolean;
    children?: React.ReactNode;
    updateName: (name: string) => void;
    error: string;
    type: string;
}

interface VaccineOptions {
    value: number;
    label: string;
}

function createVaccineOptions(options: string[]): VaccineOptions[] {
    return options.map((option) => ({ value: options.indexOf(option)+1, label: option }));
}

export const vaccineOptions = [
    "",
    "Cholera",
    "Hib",
    "dtap",
    "dT",
    "BCG",
    "Typ",
    "TBE",
    "JEV",
    "Influ",
    "HBV",
    "HAV",
    "HABV",
    "MPR",
    "IPV",
    "Rabies",
    "Rota",
    "Var",
    "YFV",
    "HPV",
    "DTaP-IPV",
    "DTaP-IPV-Hib",
    "DTaP-IPV-Hib-HBV",
    "dtap-IPV",
    "PanInflu",
    "Men",
    "Pneu",
    "Diphteria",
    "DT",
    "DTP",
    "Tetanus",
    "Morbilli",
    "Parotitis",
    "Rubella",
    "Variola",
    "DT-IPV",
    "Pestis",
    "Anthrax",
    "Pertussis",
    "DTP-Hib",
    "DTP-IPV",
    "MPRV"
];

const useStyles2 = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            display: "flex",
        },
        inputArea: {
            minWidth: 200,
            marginTop: theme.spacing(0),
            marginBottom: theme.spacing(2)
        },
        sameLine: {
            display: "flex",
            marginLeft: theme.spacing(0)
        },
        margin: {
            marginLeft: theme.spacing(1),
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3)
        }
    })
);


const VaccineName: React.FC<MainProps> = (props) => {
    const classes = useStyles();
    const classes2 = useStyles2();

    const [state, setState] = React.useState<{
        vaccine: string | number;
    }>({
        vaccine: ""
    });

    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
    }, []);

    const handleChange = (name: keyof typeof state) => (
        event: React.ChangeEvent<{ value: string }>
    ) => {
        setState({
            ...state,
            [name]: event.target.value
        });
        props.updateName(event.target.value);
    };

    const mappedVaccineOptions = createVaccineOptions(vaccineOptions);

    return (
        <div>
            {/*<HelpOutlineOutlinedIcon /> */}
            <FormControl variant="outlined" >
                <div>
                    {props.error === "name" && props.type === "name" ? (
                        <InputLabel
                            className={classes.errorMessage}
                            ref={inputLabel}
                            htmlFor="outlined-age-native-simple"
                        >
                            Select vaccine*
                        </InputLabel>
                    ) : (
                        <InputLabel ref={inputLabel} htmlFor="outlined-age-native-simple">
                            {props.type === "name" ? "Select vaccine*" : "Select abbreviation"}
                        </InputLabel>
                    )}
                    <div className={classes2.sameLine}>
                        <Select
                            error={props.error === "name" && props.type === "name"}
                            native
                            variant="outlined"
                            value={state.vaccine}
                            onChange={handleChange("vaccine")}
                            name="vaccine"
                            className={classes2.inputArea}
                            inputProps={{
                                name: "vaccine",
                                id: "outlined-age-native-simple"
                            }}
                        >
                            {mappedVaccineOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </Select>
                        <Tooltip
                            title={props.type === "name" ? "Search the right vaccine name from the list or add own name.": "If you have selected the vaccine name, abbreviation will be the right automatically. "}>
                            <IconButton aria-label="delete" className={classes2.margin} size="small">
                                <HelpOutlineOutlinedIcon/>
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
            </FormControl>
        </div>
    );
};

export default VaccineName;
