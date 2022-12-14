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
      <AppBar position="static" style={{ backgroundColor: "#336" }}>
        <Toolbar>
          <BiotechIcon />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">
              <div className="flex ml-2">
                <img src={require("../../logo.png")} height="20" width="20" />
                Ensembl Data LakeHouse
              </div>
            </Link>
          </Typography>

          {window.location.pathname !== "/status" && (
            <Button color="inherit">
              <Link to="/status">Status</Link>
            </Button>
          )}

          {window.location.pathname !== "/export" && (
            <Button color="inherit">
              <Link to="/export">Export</Link>
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default HeaderNav;
