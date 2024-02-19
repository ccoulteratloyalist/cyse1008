import PropTypes from 'prop-types';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import { useMemo, useEffect, useReducer, useCallback } from 'react';
import { AuthContext } from './auth-context';

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === 'ON_AUTH_STATE_CHANGED') {
    return {
      ...state,
      user: action.payload.user,
      loading: false,
    };
  }
  return state;
};


// ----------------------------------------------------------------------

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Initialize the authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({
        type: 'ON_AUTH_STATE_CHANGED',
        payload: { user },
      });
    });

    return () => unsubscribe();
  }, [auth]);

  // LOGIN
  const login = useCallback((email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }, [auth]);

  // REGISTER
  const register = useCallback((email, password, firstName, lastName) => {
    return createUserWithEmailAndPassword(auth, email, password);
  }, [auth]);

  // LOGOUT
  const logout = useCallback(() => {
    return auth.signOut().then(() => {
      dispatch({
        type: 'LOGOUT',
      });
    });
  }, [auth]);

  // ----------------------------------------------------------------------
  
  // Value memoization to avoid unnecessary re-renders
  const memoizedValue = useMemo(() => ({
    user: state.user,
    method: 'firebase',
    loading: state.loading,
    authenticated: !!state.user,
    login,
    register,
    logout,
  }), [state, login, register, logout]);

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
