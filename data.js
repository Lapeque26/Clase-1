/**
 * Catálogo verificado. No agregar registros sin confirmar la URL del producto,
 * el precio publicado, el color y la fecha de consulta.
 */
window.CATALOG_DATA = {
  lastAttempt: "2026-08-18",
  products: [
    {
      id: "printalot-pla-basico-negro-1kg",
      brand: "Printalot",
      name: "PLA – Colores básicos – 1.75 mm – 1 kg",
      material: "PLA",
      color: "Negro",
      hex: "#111111",
      price: 23500,
      pricingNote: "Precio publicado para pago en 1 cuota",
      url: "https://printalot.com.ar/productos/filamentos/pla/filamento-pla-1-75mm/",
      checkedAt: "2026-08-18"
    },
    {
      id: "printalot-pla-basico-azul-pal-1kg",
      brand: "Printalot",
      name: "PLA – Colores básicos – 1.75 mm – 1 kg",
      material: "PLA",
      color: "Azul PaL",
      hex: "#0870b9",
      price: 23500,
      pricingNote: "Precio publicado para pago en 1 cuota",
      url: "https://printalot.com.ar/productos/filamentos/pla/filamento-pla-1-75mm/",
      checkedAt: "2026-08-18"
    }
  ],
  sources: [
    {
      brand: "Printalot",
      status: "verified",
      checkedAt: "2026-08-18",
      detail: "Producto PLA de 1 kg, colores y precio para pago en 1 cuota verificados en la publicación original."
    },
    {
      brand: "Proyecto Color",
      status: "no_stock",
      checkedAt: "2026-08-18",
      detail: "El filamento PLA negro consultado, publicado a $16.990, no tenía stock y no se incluye en la comparación."
    },
    ...["Grilon3", "Plastar", "Freemover", "Filanova", "Hellbot", "Elemental"].map((brand) => ({
      brand,
      status: "unavailable",
      checkedAt: "2026-08-18",
      detail: "Pendiente de verificación confiable."
    }))
  ]
};
