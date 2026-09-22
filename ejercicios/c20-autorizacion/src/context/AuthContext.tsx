/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { apiFetch } from '../services/api';
import {
  borrarToken,
  guardarToken,
  obtenerToken,
} from '../services/sesion';
import type {
  Credenciales,
  Rol,
  Sesion,
  Usuario,
} from '../types/sesionType';

type AuthContextType = {
  usuario: Usuario | null;
  cargando: boolean;
  estaAutenticado: boolean;
  tieneRol: (rol: Rol) => boolean;
  login: (credenciales: Credenciales) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(obtenerToken() !== null);

  const logout = useCallback(() => {
    borrarToken();
    setUsuario(null);
    setCargando(false);
  }, []);

  const login = useCallback(async (credenciales: Credenciales) => {
    const sesion = await apiFetch<Sesion>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credenciales),
    });

    guardarToken(sesion.token);
    setUsuario(sesion.usuario);
  }, []);

  useEffect(() => {
    if (!obtenerToken()) {
      return;
    }

    apiFetch<Usuario>('/auth/yo')
      .then(setUsuario)
      .catch(logout)
      .finally(() => setCargando(false));
  }, [logout]);

  useEffect(() => {
    window.addEventListener('sesion-expirada', logout);

    return () => window.removeEventListener('sesion-expirada', logout);
  }, [logout]);

  const value = useMemo<AuthContextType>(
    () => ({
      usuario,
      cargando,
      estaAutenticado: usuario !== null,
      tieneRol: (rol) => usuario?.rol === rol,
      login,
      logout,
    }),
    [usuario, cargando, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  }

  return context;
}
