# Documentación de la API

## Endpoints Principales

### 1. Generar Imagen OG

```
GET /api/og
```

Genera una imagen Open Graph para compartir en redes sociales.

**Parámetros de Consulta:**
- `text` (string): Texto del chiste a mostrar en la imagen

**Ejemplo de Respuesta Exitosa (200 OK):**
```
Imagen PNG
```

---

### 2. Enviar Notificación

```
POST /api/send-notification
```

Envía una notificación a los usuarios.

**Cuerpo de la Solicitud (JSON):**
```json
{
  "userId": "string",
  "message": "string",
  "type": "info|warning|error|success"
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "success": true,
  "messageId": "string"
}
```

---

### 3. Webhook de Farcaster

```
POST /api/webhook
```

Endpoint para recibir webhooks de Farcaster.

**Cuerpo de la Solicitud (JSON):**
```json
{
  "type": "MESSAGE_CREATED",
  "data": {
    "fid": "string",
    "username": "string",
    "text": "string"
  }
}
```

**Respuesta Exitosa (200 OK):**
```json
{
  "status": "received"
}
```

---

## Códigos de Estado HTTP

- `200 OK`: Solicitud exitosa
- `400 Bad Request`: Error en los parámetros de la solicitud
- `401 Unauthorized`: No autorizado
- `500 Internal Server Error`: Error del servidor

---

## Autenticación

Los endpoints protegidos requieren un token JWT en el encabezado `Authorization`:

```
Authorization: Bearer <token>
```

---

## Límites de Tasa

- Máximo 100 solicitudes por minuto por IP
- Tamaño máximo del cuerpo: 1MB

---

## Ejemplo de Uso con cURL

```bash
# Obtener imagen OG
curl -X GET "https://tudominio.com/api/og?text=Mi%20chiste%20divertido" \
  -H "Accept: image/png"

# Enviar notificación
curl -X POST "https://tudominio.com/api/send-notification" \
  -H "Content-Type: application/json" \
  -d '{"userId": "123", "message": "¡Nuevo chiste creado!", "type": "info"}'
```

---

## Errores Comunes

### 429 Too Many Requests
Demasiadas solicitudes. Por favor, espera antes de intentar de nuevo.

### 401 Unauthorized
Token de autenticación inválido o ausente.

### 400 Bad Request
La solicitud no pudo ser procesada debido a un error en los datos proporcionados.
