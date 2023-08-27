import { AppShell, Header, Grid, Button, Flex } from "@mantine/core";
import {
  createStyles,
  HoverCard,
  Group,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconNotification,
  IconCode,
  IconBook,
  IconChartPie3,
  IconFingerprint,
  IconCoin,
  IconChevronDown,
} from "@tabler/icons-react";
import iim from "./logo/png/logo-no-background.png";
import "./font.css";
import "./navbar.css";
import drivelogo from "./logo/logo_drive_2020q4_color_2x_web_64dp.png";
import signingwithgoogle from "./logo/btn_google_signin_light_normal_web@2x.png";
import cntimg from './logo/connect.png' 
import "./font.css";
import "./navbar.css";
const api_server = process.env.REACT_APP_API_SERVER;


const useStyles = createStyles((theme) => ({
  link: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,

    [theme.fn.smallerThan("sm")]: {
      height: rem(42),
      display: "flex",
      alignItems: "center",
      width: "100%",
    },

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    }),
  },

  subLink: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    borderRadius: theme.radius.md,

    ...theme.fn.hover({
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
    }),

    "&:active": theme.activeStyles,
  },

  dropdownFooter: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[7]
        : theme.colors.gray[0],
    margin: `calc(${theme.spacing.md} * -1)`,
    marginTop: theme.spacing.sm,
    padding: `${theme.spacing.md} calc(${theme.spacing.md} * 2)`,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1]
    }`,
  },

  hiddenMobile: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  hiddenDesktop: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
}));

export function NavBarTest({mainContent}) {
    const handleConnectNow = () => {
       window.location.href = `${api_server}/connect`;
    };
     const handleLoginNow = () => {
       window.location.href = `${api_server}/login`;
     };
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const { classes, theme } = useStyles();

  return (
    <>
      <Box pb={120}>
        <Header
          height={60}
          px="md"
          style={{ backgroundColor: "rgba(39, 245, 198, 1)" }}
        >
          <Group position="apart" sx={{ height: "100%" }}>
            {/* <MantineLogo size={30} /> */}
            <img
              src={iim}
              alt="logo"
              style={{
                maxHeight: "70%",
                maxWidth: "100%",
                alignSelf: "left",
              }}
            />
            <Group
              sx={{ height: "100%" }}
              spacing={0}
              className={classes.hiddenMobile}
            >
              <a href="/" className={classes.link}>
                Home
              </a>
              <a href="/features" className={classes.link}>
                Features
              </a>
              <a href="/privacypolicies" className={classes.link}>
                Privacy Policy
              </a>
              <a href="/aboutus" className={classes.link}>
                About
              </a>
            </Group>

            <Group className={classes.hiddenMobile}>
              <Button
                onClick={handleConnectNow}
                className="navbar-button-1"
                style={{
                  marginLeft: "50px",
                  marginButtom: "20px",
                  color: "gray",
                  backgroundColor: "white",
                }}
              >
                Connect
                <img
                  src={drivelogo}
                  alt="nan"
                  style={{ width: "20px", marginLeft: "10px" }}
                />
              </Button>{" "}
              <img
                src={signingwithgoogle}
                alt="nan"
                style={{
                  width: "170px",
                  marginLeft: "10px",
                  marginButtom: "20px",
                }}
                onClick={handleLoginNow}
              />
            </Group>

            <Burger
              opened={drawerOpened}
              onClick={toggleDrawer}
              className={classes.hiddenDesktop}
            />
          </Group>
        </Header>

        <Drawer
          opened={drawerOpened}
          onClose={closeDrawer}
          size="100%"
          padding="md"
          title="DBackUP"
          className={classes.hiddenDesktop}
          zIndex={1000000}
        >
          <ScrollArea h={`calc(100vh - ${rem(60)})`} mx="-md">
            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <a href="/" className={classes.link}>
              Home
            </a>
            <a href="/features" className={classes.link}>
              Features
            </a>
            <a href="/privacypolicies" className={classes.link}>
              Privacy Policy
            </a>
            <a href="/aboutus" className={classes.link}>
              About
            </a>

            <Divider
              my="sm"
              color={theme.colorScheme === "dark" ? "dark.5" : "gray.1"}
            />

            <Grid container direction="column" alignItems="center">
              <img
                src={cntimg}
                alt="nan"
                style={{
                  width: "200px", // Adjust the width as needed
                  height: "50px", // Adjust the height as needed
                  marginBottom: "20px", // Fix typo in marginBottom
                  marginLeft: "60px",
                }}
              />
              <img
                src={signingwithgoogle}
                alt="nan"
                style={{
                  width: "200px", // Adjust the width as needed
                  height: "50px", // Adjust the height as needed
                  marginBottom: "20px", // Fix typo in marginBottom
                  marginLeft: "60px",
                }}
              />
              {/* </Button> */}
            </Grid>
          </ScrollArea>
        </Drawer>
        {mainContent}
      </Box>
    </>
  );
}

export default NavBarTest;
