import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { libroSchema } from '../schemas/libroSchema';
import { apiFetch } from '../services/api';

type FormState = {
  titulo: string;
  autorId: string;
  descripcion: string;
  imagen: string;
  precio: string;
  disponible: boolean;
};

function LibroNuevo() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    titulo: '',
    autorId: '',
    descripcion: '',
    imagen: '',
    precio: '',
    disponible: true,
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;

    setForm((formActual) => ({
      ...formActual,
      [name]:
        type === 'checkbox'
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleFotoChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const archivo = event.target.files?.[0];

    if (!archivo) {
      setForm((formActual) => ({
        ...formActual,
        imagen: '',
      }));
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((formActual) => ({
        ...formActual,
        imagen: String(reader.result),
      }));
    };

    reader.readAsDataURL(archivo);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrores({});
    setErrorApi(null);

    const resultado = libroSchema.safeParse(form);

    if (!resultado.success) {
      const nuevosErrores: Record<string, string> = {};

      for (const issue of resultado.error.issues) {
        const campo = String(issue.path[0]);

        if (!nuevosErrores[campo]) {
          nuevosErrores[campo] = issue.message;
        }
      }

      setErrores(nuevosErrores);
      return;
    }

    try {
      await apiFetch('/libros', {
        method: 'POST',
        body: JSON.stringify(resultado.data),
      });

      navigate('/catalogo');
    } catch (errorDesconocido) {
      setErrorApi(
        errorDesconocido instanceof Error
          ? errorDesconocido.message
          : 'Error desconocido',
      );
    }
  };

  return (
    <section className="seccionLibros">
      <div className="container">
        <Form onSubmit={handleSubmit} className="formularioLibro">
          <h1>Nuevo libro</h1>

          {errorApi && <Alert variant="danger">{errorApi}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              isInvalid={!!errores.titulo}
            />
            <Form.Control.Feedback type="invalid">
              {errores.titulo}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ID del autor</Form.Label>
            <Form.Control
              type="number"
              name="autorId"
              value={form.autorId}
              onChange={handleChange}
              isInvalid={!!errores.autorId}
            />
            <Form.Control.Feedback type="invalid">
              {errores.autorId}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              isInvalid={!!errores.precio}
            />
            <Form.Control.Feedback type="invalid">
              {errores.precio}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              isInvalid={!!errores.descripcion}
            />
            <Form.Control.Feedback type="invalid">
              {errores.descripcion}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Foto</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFotoChange}
              isInvalid={!!errores.imagen}
            />
            <Form.Control.Feedback type="invalid">
              {errores.imagen}
            </Form.Control.Feedback>
          </Form.Group>

          {form.imagen && (
            <div className="previewLibro mb-3">
              <img src={form.imagen} alt="Vista previa del libro" />
            </div>
          )}

          <Form.Check
            className="mb-4"
            label="Disponible"
            name="disponible"
            checked={form.disponible}
            onChange={handleChange}
          />

          <Button type="submit" className="botonHero">
            Agregar libro
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default LibroNuevo;