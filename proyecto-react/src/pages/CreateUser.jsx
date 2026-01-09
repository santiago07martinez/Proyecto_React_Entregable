import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateUserMutation } from '../services/usersApi';
import { Card, CardHeader, CardBody, CardFooter, Button, Input, Loader, ErrorMessage } from '../components/common';

const CreateUser = () => {
  const navigate = useNavigate();
  const [createUser, { isLoading, error }] = useCreateUserMutation();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
  });

  const [formErrors, setFormErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error del campo al escribir
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'El nombre es obligatorio';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'El email no es válido';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'El teléfono es obligatorio';
    }

    if (!formData.companyName.trim()) {
      errors.companyName = 'La empresa es obligatoria';
    }
    
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      const payload = {
        ...formData,
        company: { name: formData.companyName },
        username: formData.email.split('@')[0] // Generar username automáticamente
      };
      delete payload.companyName;

      const result = await createUser(payload).unwrap();
      console.log('Usuario creado:', result);
      
      setSuccessMessage('¡Usuario creado exitosamente!');
      
      // Limpiar formulario después de 2 segundos
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          companyName: '',
        });
        setSuccessMessage('');
      }, 2000);
      
    } catch (err) {
      console.error('Error al crear usuario:', err);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      companyName: '',
    });
    setFormErrors({});
    setSuccessMessage('');
  };

  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <Button onClick={() => navigate('/')}>← Volver al inicio</Button>
      </div>

      <Card>
        <CardHeader>
          <h2 style={{ margin: 0 }}>Crear Nuevo Usuario</h2>
        </CardHeader>
        <CardBody>
          {successMessage && (
            <div style={{ 
              padding: '15px', 
              background: '#d4edda', 
              border: '1px solid #c3e6cb', 
              borderRadius: '8px', 
              color: '#155724',
              marginBottom: '20px'
            }}>
              ✅ {successMessage}
            </div>
          )}

          {error && (
            <ErrorMessage 
              message={
                error.status === 'FETCH_ERROR' 
                  ? "Sin conexión. Ejecuta: npx json-server --watch db.json --port 3000" 
                  : "Error al crear el usuario."
              }
            />
          )}

          <form onSubmit={handleSubmit}>
            <Input
              label="Nombre completo"
              name="name"
              type="text"
              placeholder="Ej: Juan Pérez"
              value={formData.name}
              onChange={handleChange}
              error={formErrors.name}
              required
            />

            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="Ej: juan@ejemplo.com"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              required
            />

            <Input
              label="Teléfono"
              name="phone"
              type="tel"
              placeholder="Ej: 123-456-7890"
              value={formData.phone}
              onChange={handleChange}
              error={formErrors.phone}
              required
            />

            <Input
              label="Empresa"
              name="companyName"
              type="text"
              placeholder="Ej: Nexus Inc."
              value={formData.companyName}
              onChange={handleChange}
              error={formErrors.companyName}
              required
            />

            <div style={{ 
              padding: '15px', 
              background: '#fff3cd', 
              border: '1px solid #ffeaa7', 
              borderRadius: '8px', 
              marginTop: '20px',
              fontSize: '14px'
            }}>
            </div>
          </form>
        </CardBody>
        <CardFooter>
          <Button variant="secondary" onClick={handleReset} disabled={isLoading}>
            Limpiar
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSubmit} 
            disabled={isLoading}
          >
            {isLoading ? 'Creando...' : 'Crear Usuario'}
          </Button>
        </CardFooter>
      </Card>

      {isLoading && <Loader text="Creando usuario..." />}
    </div>
  );
};

export default CreateUser;