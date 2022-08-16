import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BiotechIcon from "@mui/icons-material/Biotech";
import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <BiotechIcon />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">Ensembl's lakehouse</Link>
          </Typography>

          {window.location.pathname !== "/status" && (
            <Button color="inherit">
              <Link to="/status">Status</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default HeaderNav;
