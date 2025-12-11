import React, { useState } from 'react';
import { Button, Card, CardHeader, CardBody, CardFooter, Input, Loader, ErrorMessage } from './components/common';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [showError, setShowError] = useState(false);

  return (
    <div className="app-container">
      <h1>🧪 Prueba de Componentes Reutilizables</h1>

      {/* Sección: Botones */}
      <section className="test-section">
        <h2>🔘 Botones</h2>
        <div className="buttons-test">
          <Button variant="primary" size="small">Small Primary</Button>
          <Button variant="primary" size="medium">Medium Primary</Button>
          <Button variant="primary" size="large">Large Primary</Button>
        </div>
        <div className="buttons-test">
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      {/* Sección: Tarjetas */}
      <section className="test-section">
        <h2>🃏 Tarjetas (Cards)</h2>
        <div className="cards-test">
          <Card>
            <CardHeader>
              <h3>Usuario: Leanne Graham</h3>
            </CardHeader>
            <CardBody>
              <p><strong>Email:</strong> leanne@example.com</p>
              <p><strong>Teléfono:</strong> 1-770-736-8031</p>
              <p><strong>Empresa:</strong> Romaguera-Crona</p>
            </CardBody>
            <CardFooter>
              <Button variant="primary" size="small">Ver detalle</Button>
              <Button variant="secondary" size="small">Favorito ⭐</Button>
            </CardFooter>
          </Card>

          <Card onClick={() => alert('¡Tarjeta clickeable!')}>
            <CardHeader>
              <h3>Tarjeta Clickeable</h3>
            </CardHeader>
            <CardBody>
              <p>Haz click en esta tarjeta para ver el efecto hover</p>
            </CardBody>
          </Card>
        </div>
      </section>

      {/* Sección: Inputs */}
      <section className="test-section">
        <h2>📝 Inputs</h2>
        <div className="inputs-test">
          <Input
            label="Nombre completo"
            type="text"
            placeholder="Escribe tu nombre"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            required
          />
          
          <Input
            label="Email"
            type="email"
            placeholder="ejemplo@correo.com"
          />
          
          <Input
            label="Password"
            type="password"
            placeholder="Tu contraseña"
          />
          
          <Input
            label="Campo con error"
            type="text"
            placeholder="Este campo tiene un error"
            error="Este campo es obligatorio"
          />
          
          <Input
            label="Campo deshabilitado"
            type="text"
            value="No puedes editar esto"
            disabled
          />
        </div>
        <p>Valor del input: <strong>{inputValue}</strong></p>
      </section>

      {/* Sección: Loader */}
      <section className="test-section">
        <h2>⏳ Loader (Cargando)</h2>
        <Button onClick={() => setShowLoader(!showLoader)}>
          {showLoader ? 'Ocultar Loader' : 'Mostrar Loader'}
        </Button>
        
        {showLoader && (
          <div style={{ marginTop: '20px' }}>
            <Loader size="small" text="Loader pequeño" />
            <Loader size="medium" text="Loader mediano" />
            <Loader size="large" text="Cargando usuarios..." />
          </div>
        )}
      </section>

      {/* Sección: Error */}
      <section className="test-section">
        <h2>❌ Mensaje de Error</h2>
        <Button variant="danger" onClick={() => setShowError(!showError)}>
          {showError ? 'Ocultar Error' : 'Mostrar Error'}
        </Button>
        
        {showError && (
          <div style={{ marginTop: '20px' }}>
            <ErrorMessage 
              message="No se pudieron cargar los usuarios. Verifica tu conexión a internet." 
              onRetry={() => alert('Reintentando...')}
            />
          </div>
        )}
      </section>

      {/* Sección: Combinación */}
      <section className="test-section">
        <h2>🎨 Ejemplo Combinado</h2>
        <Card>
          <CardHeader>
            <h3>Formulario de Usuario</h3>
          </CardHeader>
          <CardBody>
            <Input
              label="Nombre"
              type="text"
              placeholder="Tu nombre"
              required
            />
            <Input
              label="Email"
              type="email"
              placeholder="tu@email.com"
              required
            />
            <Input
              label="Teléfono"
              type="tel"
              placeholder="123-456-7890"
            />
          </CardBody>
          <CardFooter>
            <Button variant="secondary">Cancelar</Button>
            <Button variant="primary">Guardar Usuario</Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
}

export default App;