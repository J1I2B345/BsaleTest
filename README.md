# BsaleTest

## Introducción

Este proyecto fue realizado como prueba técnica para la empresa Bsale. El objetivo era crear un E-commerce desde 0, tanto desde el servidor como el cliente, consumiendo una DB facilitada por la misma empresa.

En este sentido se debía crear el Frontend, Backend y la documentación pertinente.

## Tecnologías utilizadas

### Front End:

HTML, CSS, Vanilla Javascript

### Back End:

Node.js, Express, Sequelize.

### Database:

MySQL

## **Versiones**

- **Node** : 16.14.12
- **NPM** : 8.5.0

## BoilerPlate

El proyecto tiene dos carpetas: `api` and `client`.

Ambos estan deployados:

- api: [https://backend-ecommerce-bsale.herokuapp.com/](https://backend-ecommerce-bsale.herokuapp.com/ "https://backend-ecommerce-bsale.herokuapp.com/")
- client: [https://ecommerce-bsale-test.vercel.app/](https://ecommerce-bsale-test.vercel.app/ "https://ecommerce-bsale-test.vercel.app/")

# Si quiere probarse corriendo el proyecto en la PC debería realizar los pasos que se mencionan a continuación.

Dentro de `api` se debe crear un archivo llamado: `.env` el cual debe tener el siguiente formato:

```
DB_Name= bsale_test
DB_User=bsale_test
DB_Password=bsale_test
DB_Host= mdb-test.c6vunyturrl6.us-west-1.rds.amazonaws.com
PORT=3010
```

### _Instalando los paquetes necesarios_

- Abrir la consola a fin de ejecutar los siguientes comandos
  - En la carpeta `api`, ejecutar el comando `npm install`
  - Dentro de la carpeta `client`, ejecutar el comando, `npm install`

### _Utilizando la App_

- Abrir la consola en la carpeta del proyecto y luego:
  - Dentro de la `carpeta api`, ejecutar `npm start`
  - Dentro de la carpeta `client`, ejecutar el comando `npm start` (ir a la página [http://localhost:3000/](http://localhost:3000/) donde encontrará la página funcionando

## Backend

A fin de proporcionar la información necesaria en el Frontend se desarrollaron las siguientes rutas:

### _get /api/products_

Retornará todos los productos de la DB en un array de objetos, siguiendo la estructura:

```
[{
    "id": 5,
    "name": "ENERGETICA MR BIG",
    "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
    "price": 1490,
    "discount": 20,
    "category": 1
  },
  {
    "id": 6,
    "name": "ENERGETICA RED BULL",
    "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/redbull8381.jpg",
    "price": 1490,
    "discount": 0,
    "category": 1
  }]
```

![Backend  get products](https://user-images.githubusercontent.com/103390530/188425151-e1004506-ec72-4754-87aa-a901f2630704.png)

### _get /api/products?name=nameOfProduct_

Retornará los productos que coincidan con el nombre o un mensaje de error en caso de corresponder.
![Backend products name pisco](https://user-images.githubusercontent.com/103390530/188425253-8cb3529f-0789-42f8-b6af-3f0b01a10aec.png)

Será un array de objetos aunque sea un solo uno.

En el caso de no encontrar ningún producto con ese nombre devolvera un error:

```
{
  "error": "No hay productos con ese nombre"
}
```

### _get /api/products?category=categoryId_

Retornará todos los productos de la categoría solicitada. Se debe indicar el número de id de la categoría.

Devolverá un array de objetos como la ruta get /api/products.
![Backend get products category id](https://user-images.githubusercontent.com/103390530/188425237-49e7db86-025a-4874-ada3-86dd5801614f.png)

### _get /api/products/:id_

Retornará solo producto solicitado. Se debe ingresar el id del producto.

El resultado será un objeto en el caso de que el id sea válido. Caso contrarío devolverá un objeto de la siguiente estructura:

```
{
  "error": "No se encontró el producto"
}
```

![backend get product id](https://user-images.githubusercontent.com/103390530/188425342-5ae878b5-f904-4682-b7ec-e1fc9fd68455.png)

### _get /api/categories_

Retornará todas las categorías, siendo un arrayo de objetos con la siguiente estructura:

```
[{
    "id": 1,
    "name": "bebida energetica"
  },
  {
    "id": 2,
    "name": "pisco"
  },{id: 1, name: "bebida energetica"}, {
"id": 2,
"name": "pisco"
}, ....]
```

![Backend get categories](https://user-images.githubusercontent.com/103390530/188425358-ad449fd6-9ca6-4589-a971-4fa60cfebfc2.png)

## Frontend

Una vez realizado el Backend se comenzó a trabajar en el Frontend. Fue realizado completamente con Vanilla JS, HTML y CSS sin librerías, lo cual significó un desafío. Me nutrí mucho de información en internet para lograr este resultado. Realmente fue un desafío para mí porque nunca había hecho un Front sin React u otra librería del estilo. Me pareció un trabajo increíble para entender lo que hacen las librerías y como facilitan las cosas, pero esto sirvió para entender la lógica que tiene detrás.

### _Header:_

Contiene el Navbar. Tiene un botón que despliega el menú para seleccionar las categorías de los objetos y así mostrarlos. También tiene el logo de Bsale que redirige al home, un campo para ingresar palabras para buscar los productos por nombre, el correspondiente botón para buscar y el carrito para ver lo seleccionado.
![Frontend Header](https://user-images.githubusercontent.com/103390530/188424947-178cb6a3-62f7-4465-a451-e66cc8c3fc98.png)

### _Aside:_

Barra lateral que se muestra con las categorías que se pueden seleccionar.

![Frontend Aside](https://user-images.githubusercontent.com/103390530/188424969-0a848d0f-2709-49ea-9033-bf45b14eab12.png)

### _Zona donde se exhiben los productos:_

Muestra todos los productos, los que pertenezcan a la categoría seleccionada o los que se hayan buscado en el search bar.

Si se clickea sobre la imagen lo llevará a los detalles.

Junto al precio se encuentra un ícono de un carrito de compras desde donde se puede ir directamente a la sección de agregarlo al carrito y seleccionar la cantidad requerida.
![Frontend Productos](https://user-images.githubusercontent.com/103390530/188424997-6fa0f62c-50f8-43a2-8984-f6f5b5a6e4bd.png)

### _Detalles del producto:_

Aquí se puede ver una imagen más grande del producto y seleccionar agregar al carrito.
![Frontend Producto detalle](https://user-images.githubusercontent.com/103390530/188425021-cf0ba146-0d75-4581-b51a-f1c966425998.png)

### _Carrito de compras:_

Se puede ver la cantidad de productos solicitados y modificar la cantidad requerida o eliminar el producto de la lista.

Una vez finalizada la selección se puede clickear en el botón de checkout. Este botón llevaría al método de pago y limpia el carrito.
![Frontend Finalizando compra](https://user-images.githubusercontent.com/103390530/188425100-ebf0379d-db17-4c81-8d7d-c48697d2084d.png)
