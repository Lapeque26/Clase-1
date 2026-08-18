const test = require("node:test");
const assert = require("node:assert/strict");
const Catalog = require("../catalog.js");

const products = [
  { id: "red-expensive", brand: "Beta", color: "Rojo", price: 150 },
  { id: "blue", brand: "Gamma", color: "Azul petróleo", price: 120 },
  { id: "red-cheap", brand: "Alfa", color: "Rojo fuego", price: 100 }
];

test("busca colores sin distinguir mayúsculas ni tildes", () => {
  assert.deepEqual(Catalog.filterByColor(products, "PETROLEO").map((p) => p.id), ["blue"]);
});

test("ordena precios de menor a mayor sin mutar el catálogo", () => {
  assert.deepEqual(Catalog.sortProducts(products, "asc").map((p) => p.price), [100, 120, 150]);
  assert.equal(products[0].price, 150);
});

test("identifica la opción más barata", () => {
  assert.equal(Catalog.cheapestId(products), "red-cheap");
  assert.equal(Catalog.cheapestId([]), null);
});
