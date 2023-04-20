npx create-react-app job3-client --template typescript

Atualização para React 18:
AppThemeProvider: tipar os { children } atraves de providers

Ex: interface IAppThemeProviderProps {
    children: React.ReactNode
}

export const AppThemeProvider: React.FC<IAppThemeProviderProps> = ({ children }) => {
    ...
}

