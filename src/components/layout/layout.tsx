import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Outlet } from "react-router-dom";
import { StorageService } from "services";

const Layout = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome {StorageService.get("user") ?? ""}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
