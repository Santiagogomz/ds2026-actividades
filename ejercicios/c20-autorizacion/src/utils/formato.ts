export function formatearPrecio(precio: number) {
  return `$${precio.toLocaleString('es-AR')}`;
}
