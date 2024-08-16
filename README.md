# Mente Migrante

## [See the App!](https://mentemigrante.netlify.app/)

## Description

**NOTE -** Describe your project in one/two lines.
#### [Client Repo](https://github.com/michsredni/mentemigrante-client)
#### [Server Repo here](https://github.com/michsredni/mentemigrante-server)

## Technologies & Libraries used

HTML, CSS, Javascript, React, Axios, Bootstrap, Cloudinary, React Sketch Canvas, React DOM.

## Backlog Functionalities

Apply Socket io for all users to be able to chat between them.
Users could rate the 'tableros' of other users
Users could leave a comment to other user's 'tableros'

# Server Structure

## Models

User model

```javascript
{
    email: {type: String, required: [true, 'Email es un campo obligatorio.'], unique: true, lowercase: true, trim: true},
    contraseña: {type: String, required: [true, 'Contraseña es un campo obligatorio.']},
    nombreCompleto: String,
    nacionalidad: String,
    residencia: String,
    imagen: String,
    tiempoNuevoPais: String,
    especializacion: String,
    rol: {type: String, enum: ["user", "psicologo", "admin"], default: "user"}
  },
  
```

Taller model

```javascript
 {
    nombre: {type: String, trim: true},
    descripcion: String,
    duracion: String,
    imagen: String,
    creador: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    usuarios: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}]
},
```

Tablero model

```javascript
{
    titulo: String,
    imagen: String,
    descripcion: String,
    creador: {type: mongoose.Schema.Types.ObjectId, ref: "User"} 
}
```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/api/auth/registro-usuario` | {email, contraseña, nombreCompleto, nacionalidad, residencia, especializacion}  | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/iniciar-sesion`        | {email, contraseña}         | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| GET         | `/usuarios/propio`           |                              | 200            | 400          | User can see their own profile  |
| PUT        | `/usuarios/propio`            |  {contrasena,nombreCompleto, nacionalidad,residencia, tiempoNuevoPais, imagen, especializacion}                   | 200            | 400          | User can edit their own profile                                   |
| GET         | `/usuarios`             |                              | 200            | 400, 401     | Gets all users data                                         |
| GET         | `/usuarios/:tipoRol`             |                              | 200            | 400, 401     | Gets data from a user with the desired role                                            |
| GET      | `/usuarios/:usuarioId/id`             |                              | 200            | 401          | Gets data from one user by it's id |
| POST         | `/talleres`                  | {nombre, descripcion, duracion, imagen, psicologo, usuario}                 | 200            | 401          | Creates a workshop                                     |
| GET         | `/talleres`                  |                              | 200            | 400, 401     | Gets data from all workshops                                         |
| GET       | `/talleres/:tallerId`          |                              | 200            | 401          | Gets data from one workshop by it's id                                         |
| PUT         | `/talleres/:tallerId`                  |    {nombre, descripcion, duracion, imagen, psicologo, usuario }                          | 200            | 401          | Edit one workshop                               |
| GET         | `/talleres/:usuarioId`           |          | 200            | 401          | Gets data by the users id of all the workshops the user created      |
| PATCH         | `/talleres/:tallerId/duracion`           |   {duracion}        | 200           | 401          | Edit the duration of one workshop                                     |
| PATCH         | `/talleres/:tallerId/asistencia`   |          | 200            | 401          | Adds user to the workshop's attendace                                     |
| GET         | `/api/talleres/:tallerId/remover-asistencia`           |     | 200            | 401          |  Removes user from the workshop's attendace                              |
| DELETE         | `/talleres/:tallerId`           |       | 200            | 401          |  Deletes one workshop                                     |
| POST         | `/tableros`           |  {titulo, descripcion imagen}       | 200            | 401          |  Creates one creative table       |
| DELETE         | `/tableros/:tableroId`           |        | 200            | 401          | Deletes one creative table                                     |
| GET         | `/tableros/:usuarioId`           |              | 200            | 401          | Gets details of creative tables from user by it's id              |
| PUT         | `/tableros/:usuarioId`      | {titulo, descripcion imagen}       | 200   | 401          | Edit one creative table from the user                                     |
| POST         | `/api/upload`           |  {imagen}                            | 200            | 401          |  Uploads image to Cloudinary                         |
  
## Links

### Collaborators

[Sheyla Arellano](https://github.com/Sheylare)

[Michelle Sredni](https://github.com/michsredni)

### Project

[Deploy Link](https://mentemigrante.netlify.app/)

### Slides

[Slides Link](https://www.canva.com/design/DAGN8-XsAFk/m5cMPF7_xI_PmznKVofV0Q/view?utm_content=DAGN8-XsAFk&utm_campaign=designshare&utm_medium=link&utm_source=editor)