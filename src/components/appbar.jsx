import useMediaQuery from "@mui/material/useMediaQuery";
import Addcard from "./addcard";
/////////////////////////////////////////export logo
import eara from "../imgs/eara.JPG";
///////////////mui components
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
///////////////////////////////////hooks and react components
import { useState } from "react";
import { useContext } from "react";
import { ProductContext } from "../contexts/productContext";
import { Link } from "react-router-dom";
///////////////////////////////////////////////////////////elements of the appbar menu and user settings
const pages = ["home", "products", "contact"];

export default function ResponsiveAppBar() {
  const isMobile = useMediaQuery("(max-width:700px)");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [underline, setinderline] = useState("home");
  const [card, setcard] = useState(false);
  const { chosen } = useContext(ProductContext);
  function handleopen() {
    setcard(true);
  }
  function handleclose() {
    setcard(false);
  }

  return (
    <>
      {!isMobile ? (
        <AppBar position="sticky" color="transparent" data-aos="fade-down">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar
                    alt="Eara"
                    src={eara}
                    sx={{
                      height: "40px",
                      width: "40px",
                      border: "0.5px purple solid ",
                      scale: 1.1,
                    }}
                  />
                  <Typography sx={{ color: "purple" }} variant="h6">
                    EARA
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    width: "50%",
                  }}
                >
                  {pages.map((e, i) => {
                    return (
                      <Typography
                        component={Link}
                        to={e === "home" ? "/" : `/${e}`}
                        onClick={() => {
                          setinderline(e);
                        }}
                        color="primary"
                        key={i}
                        variant="h6"
                        sx={{
                          borderBottom:
                            underline === e ? "3px solid blue" : "none",
                          textTransform: "capitalize",
                          transition: "0.5s all linear",
                          cursor: "pointer",
                          color: underline === e ? "primary.main" : "white",
                          p: 2,
                          textDecoration: "none",
                        }}
                      >
                        {e}
                      </Typography>
                    );
                  })}
                </Box>

                <Typography
                  variant="h3"
                  color="primary"
                  sx={{
                    textTransform: "capitalize",
                    cursor: "pointer",
                    border: "1px solid primary",
                    borderRadius: "50%",
                    height: "50px",
                    width: "50px",
                    textAlign: "center",
                    bgcolor: "rgb(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <ShoppingCartIcon
                    sx={{ height: "30px", width: "30px" }}
                    onClick={() => {
                      handleopen();
                    }}
                  />
                  <Typography
                    variant="h6"
                    color="error"
                    sx={{ position: "absolute", top: 0.2, right: 0.5 }}
                  >
                    {chosen.length}
                  </Typography>
                </Typography>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <AppBar position="sticky" color="primary" data-aos="fade-up">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Avatar alt="Eara" src={eara} />
                  <Typography variant="h6" color="white">
                    EARA
                  </Typography>
                </Box>
                <Box>
                  <MenuIcon
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                      color: "primary.white",
                      height: "40px",
                      width: "40px",
                      zIndex: 999999,
                      cursor: "pointer",
                    }}
                  />
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      )}

      {/* ***************************************************drawer********************************************************** */}
      <Drawer
        anchor={"top"}
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
            gap: 5,
            bgcolor: "transparent",
          }}
        >
          <CloseIcon
            onClick={() => {
              setDrawerOpen(false);
            }}
            sx={{
              height: "40px",
              width: "40px",
              color: "primary.main",
              position: "absolute",
              right: "10px",
              top: "5px",
              cursor: "pointer",
              "&:hover": {
                scale: 1.1,
              },
            }}
          ></CloseIcon>
          {pages.map((e, i) => {
            return (
              <Typography
                component={Link}
                to={e === "home" ? "/" : `/${e}`}
                key={i}
                variant="h6"
                sx={{
                  textTransform: "capitalize",
                  textDecoration:"none",
                  cursor: "pointer",
                  padding: 1,
                  borderRadius: 1,
                  textAlign: "center",
                  color: "primary.main",
                  "&:hover": {
                    scale: 1.1,
                  },
                }}
              >
                {e}
              </Typography>
            );
          })}
          <Box
            sx={{
              display: "flex",
            }}
          >
            <ShoppingCartIcon
              onClick={() => {
                handleopen(true);
              }}
              sx={{
                height: "40px",
                width: "40px",
                color: "primary.main",
                cursor: "pointer",
                padding: 1,
                borderRadius: 1,
              }}
            ></ShoppingCartIcon>
            <Typography variant="h6" color="error">
              {chosen.length}
            </Typography>
          </Box>
        </Box>
      </Drawer>
      {/* **********************************************************card********************************************* */}
      <Addcard handleopen={handleopen} handleclose={handleclose} card={card} />
    </>
  );
}
