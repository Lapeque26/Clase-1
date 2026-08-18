const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadData() {
  const context = { window: {} };
  vm.runInNewContext(fs.readFileSync("data.js", "utf8"), context);
  return context.window.CATALOG_DATA;
}

test("todos los productos publicados tienen trazabilidad mínima", () => {
  const data = loadData();
  for (const product of data.products) {
    assert.ok(product.brand);
    assert.ok(product.color);
    assert.ok(product.price > 0);
    assert.match(product.url, /^https:\/\//);
    assert.match(product.checkedAt, /^\d{4}-\d{2}-\d{2}$/);
  }
});

test("no publica como producto una fuente sin stock", () => {
  const data = loadData();
  const noStockBrands = data.sources.filter((source) => source.status === "no_stock").map((source) => source.brand);
  assert.equal(data.products.some((product) => noStockBrands.includes(product.brand)), false);
});
