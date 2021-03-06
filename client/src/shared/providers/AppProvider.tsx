import { Accessor, Component, createContext, createSignal, useContext } from 'solid-js';
import { appStorage } from '@root/src/services/storage';
import { AlertProp } from '@root/src/shared/views/alerts/Alerts';

export type Theme = 'cupcake' | 'dark';

type AppContextType = {
    auth: Accessor<boolean>;
    setAuth: (isAuth: boolean) => void;
    theme: Accessor<Theme>;
    setTheme: (t: Theme) => void;
    alerts: Accessor<AlertProp[]>;
    setAlert: (a: AlertProp) => void;
}

export const AppContext = createContext<AppContextType>();

export const AppProvider: Component = (props) => {

    const [auth, setAuth] = createSignal(false);
    const [theme, setTheme] = createSignal<Theme>('dark');
    const [alerts, setAlerts] = createSignal<AlertProp[]>([]);

    const store: AppContextType = {
        auth,
        setAuth,
        theme,
        setTheme: updateTheme,
        alerts,
        setAlert: setAlertItem,
    };

    function updateTheme(t: Theme) {
        const html = document.documentElement;
        html.setAttribute('data-theme', t);
        appStorage.set('theme', t);
        setTheme(t);
    }

    function setAlertItem(a: AlertProp) {
        setAlerts([a]);
    }

    return (
        <AppContext.Provider value={store}>
            {props.children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext)!;
