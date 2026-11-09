import { createContext, useContext, useEffect, useReducer } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "shop-user";

function getInitialState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      user: saved && typeof saved.username === "string" ? saved : null
    };
  } catch {
    return { user: null };
  }
}

function authReducer(state, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return { user: action.payload };
    case "LOGGED_OUT":
      return { user: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, undefined, getInitialState);

  useEffect(() => {
    try {
      if (state.user) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // Storage may be unavailable.
    }
  }, [state.user]);

  const value = {
    user: state.user,
    logIn: (user) => dispatch({ type: "LOGGED_IN", payload: user }),
    logOut: () => dispatch({ type: "LOGGED_OUT" })
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }

  return context;
}
