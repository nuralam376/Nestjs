import { ReactElement } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import darkTheme from "./dark.theme";

interface ProviderProps {
    children: ReactElement[];
}

export default function Providers({children} : ProviderProps) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={darkTheme}>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}