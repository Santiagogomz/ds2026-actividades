import { useState } from 'react';
import { Alert, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas/loginSchema';
import { apiFetch } from '../services/api';
import { guardarToken } from '../services/sesion';

type Sesion = {
  token: string;
  usuario: {
    id: number;
    email: string;
    nombre: string;
    rol: string;
  };
};

type FormState = {
  email: string;
  password: string;
};

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    email: '',
    password: '',
  });

  const [errores, setErrores] = useState<Record<string, string>>({});
  const [errorApi, setErrorApi] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    setErrores({});
    setErrorApi(null);

    const resultado = loginSchema.safeParse(form);

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
      const sesion = await apiFetch<Sesion>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(resultado.data),
      });

      guardarToken(sesion.token);

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
          <h1>Iniciar sesión</h1>

          {errorApi && (
            <Alert variant="danger">
              {errorApi}
            </Alert>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errores.email}
            />

            <Form.Control.Feedback type="invalid">
              {errores.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contraseña</Form.Label>

            <Form.Control
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              isInvalid={!!errores.password}
            />

            <Form.Control.Feedback type="invalid">
              {errores.password}
            </Form.Control.Feedback>
          </Form.Group>

          <Button type="submit" className="botonHero">
            Ingresar
          </Button>
        </Form>
      </div>
    </section>
  );
}

export default Login;