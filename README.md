# Registro de Dispositivos en Red — API REST

Microservicio Node.js + Express para gestionar dispositivos de red.

## Instalación y ejecución

```bash
# 1. Clonar, descomprimir el proyecto
cd dispositivos-api

# 2. Instalar dependencias
npm install

# 3. Correr el servidor (puerto 3000 por defecto)
node index.js
```

## Autenticación

Todos los endpoints requieren el siguiente header: Authorization: 1234

## Endpoints

GET | `/dispositivos` | Listar todos los dispositivos |
GET | `/dispositivos?estado=activo` | Filtrar por estado |
GET | `/dispositivos/:id` | Obtener dispositivo por ID |
POST | `/dispositivos` | Crear dispositivo | PUT | `/dispositivos/:id` | Actualizar dispositivo |
DELETE | `/dispositivos/:id` | Eliminar dispositivo |

## Pruebas

Cada endpoint fue probado individualmente en Postman, verificando que el método HTTP, el body y el header de autenticación fueran correctos, y que el status code y la respuesta devuelta coincidieran.

## Body para POST y PUT

```json
{
  "nombre": "Router",
  "ip": "192.168.0.1",
  "estado": "activo",
  "tipo": "router"
}
```

Validaciones:

- `nombre` — no vacío, obligatorio en POST
- `ip` — formato IPv4 válido, obligatorio en POST
- `tipo` — no vacío, obligatorio en POST

## Ejemplos con curl

```bash
# Listar todos
curl http://localhost:3000/dispositivos -H "Authorization: 1234"

# Filtrar por estado
curl "http://localhost:3000/dispositivos?estado=activo" -H "Authorization: 1234"

# Obtener por ID
curl http://localhost:3000/dispositivos/1 -H "Authorization: 1234"

# Crear
curl -X POST http://localhost:3000/dispositivos \
  -H "Authorization: 1234" \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Switch","ip":"192.168.0.2","estado":"activo","tipo":"switch"}'

# Actualizar
curl -X PUT http://localhost:3000/dispositivos/1 \
  -H "Authorization: 1234" \
  -H "Content-Type: application/json" \
  -d '{"estado":"inactivo"}'

# Eliminar
curl -X DELETE http://localhost:3000/dispositivos/1 -H "Authorization: 1234"
```

## Estructura del proyecto

```
dispositivos-api/
├── index.js
├── package.json
├── README.md
└── src/
    ├── data/
    │   └── dispositivos.js      <- array en memoria con funciones CRUD
    ├── middlewares/
    │   ├── logger.js            <- registra [METHOD] /ruta - timestamp
    │   ├── validacion.js        <- valida IP, nombre y tipo
    │   └── auth.js              <- verifica header Authorization
    └── routes/
        └── dispositivos.js      <- definicion de los endpoints
```

---

## Middlewares

Logger: se ejecuta en cada request e imprime en consola:

```
[GET] /dispositivos - 2025-04-13T14:22:01.123Z
```

Validacion: se aplica en POST y PUT. Verifica que el nombre no este vacio, que la IP tenga formato IPv4 valido y que el tipo este presente. Si falla, devuelve 400 con detalle del error.

Autenticacion: verifica que el header (Key) `Authorization: 1234` este presente en todos los requests. Si no esta, devuelve 401.