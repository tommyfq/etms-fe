/* eslint-disable react-refresh/only-export-components */
import {FC, useState, useEffect, createContext, useContext, Dispatch, SetStateAction} from 'react'
import {LayoutSplashScreen} from '../../../../_metronic/layout/core'
import {AuthModel, AuthModelUser} from './_models'
import * as authHelper from './AuthHelpers'
import {getUserByToken} from './_requests'
import {WithChildren} from '../../../../_metronic/helpers'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: AuthModelUser | undefined
  setCurrentUser: Dispatch<SetStateAction<AuthModelUser | undefined>>
  logout: () => void
  isAuthInitialized : boolean
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: undefined,
  setCurrentUser: () => {},
  logout: () => {},
  isAuthInitialized : false
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC<WithChildren> = ({children}) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<AuthModelUser | undefined>();
  const [isAuthInitialized, setAuthInitialized] = useState(false);

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };

  // Effect to initialize currentUser when auth changes
  useEffect(() => {
    const initializeAuth = async () => {
      if (auth?.data.token) {
        try {
          const { data } = await getUserByToken(auth.data.token);
          setCurrentUser(data);
        } catch (error) {
          console.error('Error fetching user:', error);
          logout();
        }
      } else {
        logout();
      }
      setAuthInitialized(true);
    };

    if (auth) {
      initializeAuth();
    }
  }, [auth]); // Trigger this whenever `auth` changes

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, logout, isAuthInitialized }}>
      {isAuthInitialized ? children : <LayoutSplashScreen />}
    </AuthContext.Provider>
  );
}

const AuthInit: FC<WithChildren> = ({children}) => {
  const {auth, currentUser, logout, setCurrentUser} = useAuth()
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
  useEffect(() => {
    const requestUser = async (apiToken: string) => {
      try {
        if (!currentUser) {
          const {data} = await getUserByToken(apiToken)
          if (data) {
            setCurrentUser(data)
          }
        }
      } catch (error) {
        console.error(error)
        if (currentUser) {
          logout()
        }
      } finally {
        setShowSplashScreen(false)
      }
    }

    if (auth && auth.data.token) {
      requestUser(auth.data.token)
    } else {
      logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export {AuthProvider, AuthInit, useAuth}
