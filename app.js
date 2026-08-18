const data = window.CATALOG_DATA;
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#color-search");
const sortSelect = document.querySelector("#sort-select");
const productList = document.querySelector("#product-list");
const emptyState = document.querySelector("#empty-state");
const resultsTitle = document.querySelector("#results-title");
const resultsSummary = document.querySelector("#results-summary");

let activeQuery = "";

function renderProducts() {
  const filtered = Catalog.filterByColor(data.products, activeQuery);
  const products = Catalog.sortProducts(filtered, sortSelect.value);
  const cheapest = Catalog.cheapestId(filtered);
  productList.innerHTML = "";

  resultsTitle.textContent = activeQuery ? `Filamentos en “${activeQuery}”` : "Productos publicados";
  resultsSummary.textContent = products.length
    ? `${products.length} ${products.length === 1 ? "producto verificado" : "productos verificados"}.`
    : "No encontramos publicaciones que podamos verificar para esta búsqueda.";
  emptyState.hidden = products.length > 0;

  products.forEach((product) => {
    const card = document.createElement("article");
    card.className = "product-card" + (product.id === cheapest ? " cheapest" : "");
    card.innerHTML = `
      ${product.id === cheapest ? '<span class="best-badge">Más barato</span>' : ""}
      <div class="color-swatch" style="--swatch:${product.hex || "#ddd"}" aria-label="Color ${product.color}"></div>
      <p class="product-brand">${product.brand}</p>
      <h3>${product.name}</h3>
      <p class="product-color">${product.color}</p>
      <strong class="price">${Catalog.formatARS(product.price)}</strong>
      ${product.pricingNote ? `<p class="pricing-note">${product.pricingNote}</p>` : ""}
      <p class="checked">Consultado el ${product.checkedAt}</p>
      <a href="${product.url}" target="_blank" rel="noopener noreferrer">Ver publicación original <span>↗</span></a>`;
    productList.append(card);
  });
}

function renderSuggestions() {
  const colors = [...new Set(data.products.map((product) => product.color))].slice(0, 8);
  const container = document.querySelector("#suggestions");
  container.innerHTML = colors.map((color) => `<button type="button" data-color="${color}">${color}</button>`).join("");
  if (!colors.length) container.innerHTML = '<span class="no-suggestions">Aún no hay colores con precios verificables.</span>';
  container.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    searchInput.value = button.dataset.color;
    activeQuery = button.dataset.color;
    renderProducts();
    document.querySelector("#resultados").scrollIntoView({ behavior: "smooth" });
  });
}

function renderSources() {
  const statusLabels = {
    verified: "Datos verificados",
    no_stock: "Sin stock",
    unavailable: "Pendiente"
  };
  document.querySelector("#source-grid").innerHTML = data.sources.map((source) => `
    <article class="source-card source-${source.status}">
      <div><span class="status-dot" aria-hidden="true"></span><strong>${source.brand}</strong></div>
      <span class="status-label">${statusLabels[source.status]}</span>
      <p>${source.detail}</p>
      <small>Consulta: ${source.checkedAt}</small>
    </article>`).join("");
}

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  activeQuery = searchInput.value.trim();
  renderProducts();
  document.querySelector("#resultados").scrollIntoView({ behavior: "smooth" });
});
sortSelect.addEventListener("change", renderProducts);

renderSuggestions();
renderSources();
renderProducts();
