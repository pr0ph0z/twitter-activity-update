import { createContext } from "react";
import type { Session } from "@supabase/supabase-js";

const SessionContext = createContext<Session | null>(null);

export default SessionContext;
