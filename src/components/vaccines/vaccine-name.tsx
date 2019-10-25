import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import "date-fns";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

interface MainProps {
    sidebarOpen: boolean;
    children?: React.ReactNode;
    updateName: any;
    error: string;
}

interface VaccineOptions {
    value: string;
    label: string;
}

function createVaccineOptions(options: string[]): VaccineOptions[] {
    return options.map(option => ({ value: option, label: option }));
}

const vaccineOptions = [
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
        link: {
            display: "flex"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250
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
        errorMessage: {
            color: "red"
        }
    })
);

const VaccineName: React.FC<MainProps> = props => {
    const classes = useStyles();

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
            <FormControl className={classes.formControl}>
                {props.error === "name" ? (
                    <InputLabel
                        className={classes.errorMessage}
                        ref={inputLabel}
                        htmlFor="outlined-age-native-simple"
                    >
                        Select vaccine*
                    </InputLabel>
                ) : (
                    <InputLabel
                        ref={inputLabel}
                        htmlFor="outlined-age-native-simple"
                    >
                        Select vaccine*
                    </InputLabel>
                )}
                <Select
                    native
                    value={state.vaccine}
                    onChange={handleChange("vaccine")}
                    labelWidth={labelWidth}
                    name="vaccine"
                    required
                    inputProps={{
                        name: "vaccine",
                        id: "outlined-age-native-simple"
                    }}
                >
                    {mappedVaccineOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default VaccineName;
