import React from "react";
import Button from "@material-ui/core/Button";
import MuiDialog, { DialogProps } from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

interface OwnProps {
    title?: string
    content: string
    handleClose: () => void
    primaryAction: string
    secondaryAction?: string
}

type Props = OwnProps & DialogProps

const Dialog: React.FC<Props> = ({ title, content, handleClose, primaryAction, secondaryAction, ...props}) => {
    return (
        <MuiDialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            {...props}
        >
            {title &&
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            }
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {secondaryAction &&
                    <Button onClick={handleClose} color="primary">{secondaryAction}</Button>
                }
                <Button onClick={handleClose} color="primary">{primaryAction}</Button>
            </DialogActions>
        </MuiDialog>
    );
};

export default Dialog;