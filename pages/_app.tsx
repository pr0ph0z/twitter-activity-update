import { useState, useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import SessionContext from "../context/Session";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import Layout from "./layout";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) setSession(session);

      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });
    };

    getSession().catch(console.error);
  }, []);

  return (
    <>
      <Head>
        <title>Twitter Activity Update</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme }}
        >
          <SessionContext.Provider value={session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionContext.Provider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
