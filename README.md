# Blablacarro

> Frontend js app for blablacarro

## Descripción

Dado que se nos dió la posibilidad de implementar la aplicación en un lenguaje
parecido a React, decidí implementarla en Vue. En muchas cosas (como el uso de
*props*) es muy similar a React, sin embargo en otras, como los componentes 
autocontenidos en un documento, se asimila más a React.

### Requisitos obligatorios
En cuanto a la parte obligatoria, se han implementado las siguientes funcionalidades:

Listados públicos: 
 * Carros
 * Ciudades

Listados privados:
 * Viajes
    * Viajes creados por el usuario

Por otro lado, existen 3 formularios:
 * Inicio de sesión.
 * Cierre de sesión.
 * Registro de usuarios.
 * Creación de viajes.

Se ha implementado una vista de detalles dentro del mismo listado de viajes, 
donde se pueden ver los ocupantes del mismo.

Por último, también es posible borrar viajes.

### Requisitos opcionales

* Bootstrap 4
* Arquitectura Flux/Redux utilizando la librería ***Vuex*** para Vue.

Aunque no se pedía, también he implementado routing utilizando la librería
***Vue-router*** para navegar por la aplicación, de forma que es posible 
entrar a las páginas desde la barra de dirección.

## Observaciones

Puesto que en la parte anterior hice la parte opcional de subir la aplicación 
a Heroku, la aplicación utiliza los recursos de forma remota, por lo que hay 
que tener en cuenta los siguientes puntos:
 * La primera llamada tarda un poco más, al tener que levantar la instancia de Heroku.
 * Los datos no persisten. Cuando se está un tiempo considerable sin utilizar la 
 aplicación, los usuarios y viajes creados se borran.

Aún así, se adjuntará el código de la práctica anterior, por si hubiera problemas.

## Despliegue de la aplicación

``` bash
# Instalar dependencias
npm install

# alias para iniciar la aplicación
npm start

# comando para iniciar la aplicación
npm run dev
```
