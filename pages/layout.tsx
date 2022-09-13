import { useContext } from "react";
import { IconSun, IconMoonStars, IconBrandTwitter } from "@tabler/icons";
import {
  AppShell,
  ActionIcon,
  Header,
  Button,
  Group,
  useMantineColorScheme,
  ThemeIcon,
} from "@mantine/core";
import SessionContext from "../context/Session";
import { supabase } from "../utils/supabase";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const session = useContext(SessionContext);

  async function signInWithTwitter() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "twitter",
    });

    console.log(data, error);
  }

  async function signout() {
    const { error } = await supabase.auth.signOut();
  }

  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
          <Group sx={{ height: "100%" }} px={20} position="apart">
            <Group sx={{ height: "100%" }} position="left">
              <ThemeIcon size={"xl"} radius={"xl"}>
                <IconBrandTwitter />
              </ThemeIcon>
            </Group>
            <Group sx={{ height: "100%" }}>
              {session === null ? (
                <Button
                  variant="outline"
                  leftIcon={<IconBrandTwitter />}
                  onClick={() => signInWithTwitter()}
                >
                  Sign In
                </Button>
              ) : (
                <Button variant="outline" color="red" onClick={() => signout()}>
                  Sign Out
                </Button>
              )}
              <ActionIcon
                variant="default"
                onClick={() => toggleColorScheme()}
                size={30}
              >
                {colorScheme === "dark" ? (
                  <IconSun size={16} />
                ) : (
                  <IconMoonStars size={16} />
                )}
              </ActionIcon>
            </Group>
          </Group>
        </Header>
      }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
};

export default Layout;
