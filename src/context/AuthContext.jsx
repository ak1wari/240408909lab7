import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext(null);

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
  const [state, dispatch] = useReducer(authReducer, { user: null });
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