import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import logo from "../../assets/images/receipe-logo.svg";
import axiosInstance from "./axios";
import Button from "@mui/material/Button";
import { NavLink, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Typography from "@mui/material/Typography";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "50px",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "40%",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "dark",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
  },
}));

export default function Header({ searchQuery, setSearchQuery }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // user login status
  const [user, setUser] = useState({}); // user info
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      // Check if access token exists in local storage

      const accessToken = localStorage.getItem("access_token");
      if (accessToken) {
        setIsAuthenticated(true);

        try {
          const response = await axiosInstance.get("/users/users/current/");
          console.log(response, "response");

          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      } else {
        setIsAuthenticated(false);
        setUser({});
      }
    };

    // Check authentication on component mount
    checkAuthentication();

    console.log(isAuthenticated, "isAuthenticated");
  }, []);

  const handleLogout = () => {
    // Clear access token from local storage and reset state
    localStorage.removeItem("access_token");
    setIsAuthenticated(false);
    setUser({});
    navigate('/');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleSearch = (query) => {
    // Pass the search query to the parent component or perform search actions here
    console.log("Search query:", query);
    // For now, let's just log the search query
  };

  const handleProfileadmin = () => {
    navigate("/ManageAccounts");
  };
  const handleMyFavorites = () => {
    navigate("/favorites");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        style={{ backgroundColor: "transparent", boxShadow: "none" }} // Remove background color and shadow
      >
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <div style={{ display: "flex", alignItems: "center", marginRight: "2%" }}>
            <a href="/" style={{ textDecoration: "none" }}>
              <img
                src={logo}
                alt="Logo"
                style={{ width: 40, marginRight: 16 }}
              />
            </a>
            <Typography
              variant="h6"
              component="div"
              color="black"
              sx={{ fontFamily: "Raleway" }}
            >
              NutriMix
            </Typography>
          </div>
          <Search>
            <SearchIconWrapper>
              <SearchIcon style={{ color: "#306A09" }} />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch(searchQuery);
                }
              }}
              sx={{
                borderColor: "#306A09",
                borderWidth: "2px",
                borderStyle: "solid",
                borderRadius: "50px",
                paddingLeft: "8px",
                paddingRight: "8px",
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <div className="flex uppercase font-semibold">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="#306A09"
                >
                  <AccountCircle />
                  {user.user_name}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleProfile}>Profile</MenuItem>
                  <MenuItem onClick={handleMyFavorites}>My Favorites</MenuItem>
                  {user.is_superuser && (
                    <MenuItem onClick={handleProfileadmin}>
                      <NavLink
                        to="/ManageAccounts"
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        Manage Accounts
                      </NavLink>
                    </MenuItem>
                  )}
                  <MenuItem
                    onClick={handleLogout}
                    variant="contained"
                    sx={{
                      bgcolor: "#306A09",
                      color: "white",
                      textTransform: "capitalize",
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <>
                <Button
                  href="#"
                  color="primary"
                  variant="outlined"
                  sx={{
                    margin: "0 8px",
                    color: "#306A09",
                    borderColor: "#306A09",
                  }} // Set green color for text and border
                  component={NavLink}
                  to="/login"
                >
                  Login
                </Button>
                <Button
                  href="#"
                  color="primary"
                  variant="outlined"
                  sx={{
                    margin: "0 8px",
                    color: "#306A09",
                    borderColor: "#306A09",
                  }} // Set green color for text and border
                  component={NavLink}
                  to="/register"
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
