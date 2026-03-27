import {
  Box,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import iim from "./logo/png/logo-no-background.png";
import "./auth-shell.css";
import { clearSessionValues } from "./utils/sessionStore";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/features", label: "Features" },
  { href: "/privacypolicies", label: "Privacy Policy" },
  { href: "/aboutus", label: "About" },
];

export function MainAppTest(props) {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);
  const accessToken = props.accessToken;
  const [email, setEmail] = useState("");

  const handleLogout = () => {
    clearSessionValues();
    window.location.href = "/";
  };

  useEffect(() => {
    const fetchUserName = async () => {
      if (!accessToken) {
        setEmail("");
        return;
      }

      try {
        const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          setEmail("");
          return;
        }

        const data = await response.json();
        setEmail(data.email || "");
      } catch (error) {
        setEmail("");
      }
    };

    fetchUserName();
  }, [accessToken]);

  const accountLabel = email || "Connected account";

  return (
    <Box className="auth-shell">
      <header className="auth-shell__header">
        <Container size="xl" className="auth-shell__header-inner">
          <a
            href="/"
            className="auth-shell__brand"
            aria-label="Go to dBackUp homepage"
          >
            <img src={iim} alt="dBackUp" className="auth-shell__logo" />
          </a>

          <nav className="auth-shell__nav auth-shell__desktop">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="auth-shell__link">
                {link.label}
              </a>
            ))}
          </nav>

          <Group spacing="sm" className="auth-shell__actions auth-shell__desktop">
            {accessToken ? (
              <>
                <Text className="auth-shell__account" title={accountLabel}>
                  {accountLabel}
                </Text>
                <Button
                  className="auth-shell__logout"
                  variant="white"
                  color="dark"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component="a"
                href="/backup"
                className="auth-shell__connect"
                variant="white"
                color="dark"
              >
                Connect Drive
              </Button>
            )}
          </Group>

          <Burger
            opened={drawerOpened}
            onClick={toggleDrawer}
            className="auth-shell__mobile-toggle"
            size="sm"
            color="#0f302b"
            aria-label="Toggle navigation"
          />
        </Container>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="dBackUp"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)">
          <Stack spacing="xs" className="auth-shell__drawer-links">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="auth-shell__drawer-link"
                onClick={closeDrawer}
              >
                {link.label}
              </a>
            ))}
          </Stack>

          <Box className="auth-shell__drawer-footer">
            {accessToken ? (
              <>
                <Text className="auth-shell__drawer-account" title={accountLabel}>
                  {accountLabel}
                </Text>
                <Button fullWidth variant="filled" color="teal" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component="a"
                href="/backup"
                fullWidth
                variant="filled"
                color="teal"
                onClick={closeDrawer}
              >
                Connect Drive
              </Button>
            )}
          </Box>
        </ScrollArea>
      </Drawer>

      <main className="auth-shell__content">{props.mainAppContent}</main>
    </Box>
  );
}

export default MainAppTest;
