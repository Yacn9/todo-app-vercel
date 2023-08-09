import React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

interface IBar {
  text: string;
  variant: "success" | "error";
}

export default function CustomizedSnackBars(props: IBar) {
  const { text, variant } = props;
  const [open, setOpen] = React.useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  React.useEffect(() => {
    if (text) {
      setOpen(true);
    }
  }, [text]);

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Customize the position
      >
        <Alert onClose={handleClose} severity={variant} sx={{ width: "100%" }}>
          {text}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
