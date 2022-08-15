import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import BiotechIcon from "@mui/icons-material/Biotech";
import { Link } from "react-router-dom";

const title = "Ensembl's lakehouse";
const pages = ["Status", "Export"];

const HeaderNav = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <BiotechIcon />

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/">{title}</Link>
          </Typography>

          {pages.map((page) => (
            <Button color="inherit">{page}</Button>
          ))}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
export default HeaderNav;
