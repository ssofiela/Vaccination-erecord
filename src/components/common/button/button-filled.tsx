import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { createStyles, withStyles } from "@material-ui/core";

const StyledButton = withStyles(() =>
    createStyles({
        root: {
            borderRadius: 0,
            color: "#fff",
            boxShadow: "none",
            "&:hover": {
                boxShadow: "none"
            },
            "&:active": {
                boxShadow: "none"
            }
        }
    })
)(Button);

const FilledButton: React.FC<ButtonProps> = (props) => {
    return (
        <StyledButton variant="contained" color="primary" onClick={props.onClick} {...props}>
            {props.children}
        </StyledButton>
    );
};

export default FilledButton;
