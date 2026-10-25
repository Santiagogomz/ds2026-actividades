import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from '../../lib/react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import type { Usuario } from '../../types/sesionType';
import Header from './Header';
function renderHeader(usuario: Usuario | null) {
  const logout = vi.fn();
  window.history.replaceState({}, '', '/');
  render(<BrowserRouter><AuthContext.Provider value={{ usuario, cargando: false,
    estaAutenticado: usuario !== null, tieneRol: rol => usuario?.rol === rol,
    login: vi.fn(), logout }}><Header /></AuthContext.Provider></BrowserRouter>);
  return logout;
}
describe('Header según el rol', () => {
  it('invitado ve Ingresar y no ve Nuevo libro', () => {
    renderHeader(null);
    expect(screen.getByRole('button', { name: 'Ingresar' })).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Nuevo libro' })).not.toBeInTheDocument();
  });
  it('CLIENTE ve su nombre y no puede crear libros', () => {
    renderHeader({ id: 2, nombre: 'Cliente', email: 'cliente@libreria.test', rol: 'CLIENTE' });
    expect(screen.getByText('Hola, Cliente')).toBeInTheDocument();
    expect(screen.queryByRole('link', { name: 'Nuevo libro' })).not.toBeInTheDocument();
  });
  it('ADMIN ve Nuevo libro y puede cerrar la sesión', () => {
    const logout = renderHeader({ id: 1, nombre: 'Admin', email: 'admin@libreria.test', rol: 'ADMIN' });
    expect(screen.getByRole('link', { name: 'Nuevo libro' })).toHaveAttribute('href', '/libros/nuevo');
    fireEvent.click(screen.getByRole('button', { name: 'Salir' }));
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
