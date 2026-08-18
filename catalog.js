(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  else root.Catalog = api;
}(typeof self !== "undefined" ? self : this, function () {
  const normalize = (value) => String(value || "").normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

  function filterByColor(products, query) {
    const needle = normalize(query);
    if (!needle) return products.slice();
    return products.filter((product) => normalize(product.color).includes(needle));
  }

  function sortProducts(products, order) {
    const copy = products.slice();
    if (order === "desc") return copy.sort((a, b) => b.price - a.price);
    if (order === "brand") return copy.sort((a, b) => a.brand.localeCompare(b.brand, "es"));
    return copy.sort((a, b) => a.price - b.price);
  }

  function cheapestId(products) {
    if (!products.length) return null;
    return products.reduce((best, product) => product.price < best.price ? product : best).id;
  }

  function formatARS(price) {
    return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(price);
  }

  return { normalize, filterByColor, sortProducts, cheapestId, formatARS };
}));
