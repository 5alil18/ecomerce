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
        <AppBar
          position="sticky"
          color="transparent"
          data-aos="fade-down"
          sx={{
            backgroundColor: "rgba(250, 248, 245, 0.92)",
            borderBottom: "1px solid rgba(89, 43, 49, 0.1)",
            boxShadow: "none",
            backdropFilter: "blur(14px)",
          }}
        >
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
                      border: "1px solid #d7c5bb",
                    }}
                  />
                  <Typography
                    sx={{
                      color: "#70443f",
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                    }}
                    variant="h6"
                  >
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
                            underline === e ? "2px solid #70443f" : "2px solid transparent",
                          textTransform: "capitalize",
                          transition: "0.5s all linear",
                          cursor: "pointer",
                          color: underline === e ? "#70443f" : "#766a65",
                          px: 1.5,
                          py: 1.25,
                          textDecoration: "none",
                          fontWeight: underline === e ? 600 : 400,
                          "&:hover": {
                            color: "#70443f",
                          },
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
                    position: "relative",
                    border: "1px solid #e3d8d1",
                    borderRadius: "50%",
                    height: "50px",
                    width: "50px",
                    textAlign: "center",
                    bgcolor: "#fffdfa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#70443f",
                  }}
                >
                  <ShoppingCartIcon
                    sx={{ height: "30px", width: "30px" }}
                    onClick={() => {
                      handleopen();
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      top: -4,
                      right: -5,
                      display: "grid",
                      width: 20,
                      height: 20,
                      placeItems: "center",
                      borderRadius: "50%",
                      backgroundColor: "#70443f",
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    {chosen.length}
                  </Typography>
                </Typography>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      ) : (
        <AppBar
          position="sticky"
          color="transparent"
          data-aos="fade-up"
          sx={{
            backgroundColor: "rgba(250, 248, 245, 0.94)",
            borderBottom: "1px solid rgba(89, 43, 49, 0.1)",
            boxShadow: "none",
            backdropFilter: "blur(14px)",
          }}
        >
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
                    sx={{ border: "1px solid #d7c5bb" }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#70443f",
                      fontFamily: 'Georgia, "Times New Roman", serif',
                      fontWeight: 600,
                      letterSpacing: "0.16em",
                    }}
                  >
                    EARA
                  </Typography>
                </Box>
                <Box>
                  <MenuIcon
                    onClick={() => setDrawerOpen(true)}
                    sx={{
                      color: "#70443f",
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
        sx={{
          "& .MuiDrawer-paper": {
            minHeight: 300,
            justifyContent: "center",
            backgroundColor: "#fbf9f6",
          },
        }}
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
            bgcolor: "#fbf9f6",
          }}
        >
          <CloseIcon
            onClick={() => {
              setDrawerOpen(false);
            }}
            sx={{
              height: "40px",
              width: "40px",
              color: "#70443f",
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
                  color: "#70443f",
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
                color: "#70443f",
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
