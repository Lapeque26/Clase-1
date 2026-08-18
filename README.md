# PLAleta — comparador de filamentos PLA

Aplicación web estática para buscar por color y comparar precios publicados de filamentos PLA y PLA+ de marcas argentinas.

## Estado de los datos

El catálogo **no contiene datos inventados ni estimados**. Los productos de Printalot cargados fueron verificados el 18 de agosto de 2026 en su publicación original con ayuda de capturas de la tienda. El precio registrado es el publicado para pago en una cuota y esta condición se muestra en cada resultado. El producto negro consultado de Proyecto Color no tenía stock, por lo que no se incorporó a la comparación. Las demás fuentes permanecen pendientes hasta que sus páginas puedan verificarse.

Los precios corresponden siempre a la **fecha de consulta indicada en cada producto** y pueden cambiar. Antes de comprar, se debe confirmar el precio final en el enlace original de la tienda.

## Funcionalidades

- Búsqueda de productos por nombre de color (sin distinguir mayúsculas ni tildes).
- Vista de marca, color, precio, URL original y fecha de consulta.
- Orden por menor precio, mayor precio o marca.
- Identificación automática de la opción más barata.
- Enlaces externos seguros a la publicación original.
- Panel transparente con el estado de cada fuente consultada.
- Exclusión de productos sin stock y detalle visible de condiciones de pago.
- Diseño adaptable para computadoras y teléfonos.

## Ver el sitio

Abrí `index.html` en un navegador. El proyecto no requiere instalación, terminal, dependencias ni compilación. También puede publicarse directamente con GitHub Pages desde la raíz del repositorio.

## Incorporar datos verificados

Los registros se administran en `data.js`. Un producto solo debe agregarse después de comprobar su publicación original y debe respetar esta estructura:

```js
{
  id: "identificador-unico",
  brand: "Marca",
  name: "Nombre publicado",
  material: "PLA+",
  color: "Rojo",
  hex: "#c73535",
  price: 12345,
  url: "https://tienda.example/producto",
  checkedAt: "AAAA-MM-DD"
}
```

No se deben incorporar resultados de buscadores, precios aproximados, publicaciones discontinuadas ni productos sin una URL verificable.

## Pruebas

```bash
node --test tests/catalog.test.js
```
