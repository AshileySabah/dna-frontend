import * as React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Box } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";

interface IOpenStateProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IAlertDialogProps {
  component?: React.ReactNode | JSX.Element | React.ReactElement;
  setOption?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  openState: IOpenStateProps;
  dialogProps?: DialogProps;
  close?: boolean;
}

const AlertDialog: React.FC<IAlertDialogProps> = ({
  component,
  setOption,
  openState,
  dialogProps,
  close = true,
}) => {
  const handleClose = (_event: object, reason?: string) => {
    if (reason !== "backdropClick" && reason !== "escapeKeyDown")
      openState.setOpen(false);
  };

  return (
    <Dialog
      {...dialogProps}
      disableEscapeKeyDown
      open={openState.open}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      onClose={handleClose}
    >
      <Box id="alert-dialog-title" display="flex" justifyContent="flex-end">
        {!setOption && close && (
          <IconButton
            aria-label="close"
            onClick={() => openState.setOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        )}
      </Box>

      {component}
    </Dialog>
  );
};

export { AlertDialog };
export type { IAlertDialogProps };
