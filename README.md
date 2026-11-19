# Bolo's · Landing de helados de bolsita

Sitio web estático (HTML + CSS + JavaScript, sin dependencias ni instalación) para vender bolos: helados de fruta congelados en bolsita, con más fruta y más jugo que el bolo promedio. Muestra los sabores, arma packs, calcula el envío gratis y envía el pedido por WhatsApp.

## Ver la página

- Haz doble clic en `index.html` (se abre en tu navegador).
- Si las tipografías no cargan, revisa tu conexión: se traen de Google Fonts. Sin internet, el sitio usa tipografías del sistema y sigue funcionando.

## Personalizar en 5 minutos

### 1. Tu número de WhatsApp (lo más importante)

Abre `script.js` y cambia la primera configuración:

```js
const CONFIG = {
  marca: "Bolo's",
  whatsapp: '51904647219', // ← pon tu número: código de país + número, sin +, espacios ni guiones
  locale: 'es-Pe',
  moneda: 'PEN',
  envioGratisDesde: 25,
  costoEnvio: 5, // delivery en pedidos menores al envío gratis
};
```

Ejemplo Perú (904 647 219): `51904647219`.

### 2. Nombre de la marca y logo

- El nombre aparece en `index.html` (título, logo, footer, textos) y en `script.js` (`CONFIG.marca`).
- El logo es una bola de boliche: un círculo oscuro con tres agujeros. Está repetido en el header, el footer y el `favicon` del `<head>`. Si cambias la marca, actualiza también el texto del anillo del sello del hero (`BOLO'S · FRUTA DE VERDAD`).

### 3. Sabores y precios

En `script.js`, dentro de `FLAVORS`, cada producto tiene:

```js
{
  id: 'lucuma',              // no lo cambies si ya hay pedidos guardados
  nombre: 'Lúcuma',
  leche: true,               // true = con leche, false = sin leche
  desc: 'Lúcuma peruana de verdad...',
  precio: 3.5,
  badge: 'Insignia',         // opcional
  tint: '#FFF1DC',           // fondo de la tarjeta
  light: '#FFD98F',          // brillo del jugo
  base: '#F5A623',           // color principal del bolo
  dark: '#B86B00',           // sombra del jugo
  bit: '#FFEBC4',            // pedacitos de fruta
  sealLight: '#FFC46B',      // sellado superior
  seal: '#A85C00',           // sombra del sellado
}
```

El campo `leche` pinta la etiqueta **Con leche / Sin leche** de cada tarjeta y te sirve para mantener el catálogo en 3 y 3.

Los colores pintan la ilustración SVG de la bolsita. Si más adelante tienes fotos reales, se pueden reemplazar por imágenes.

### 4. Packs y envío gratis

- Packs: array `COMBOS` en `script.js` (nombre, cantidad, precio, precio anterior y features).
- Envío gratis: `CONFIG.envioGratisDesde`. El aviso del carrito y la barra de progreso se actualizan solos.
- Delivery: `CONFIG.costoEnvio`. Se suma al total solo si el pedido no llega al envío gratis y el cliente elige envío a domicilio. Con retiro en tienda no se cobra.
- El texto “Envío gratis desde S/ 25” de la página también se actualiza solo con ese valor.

### 5. Opiniones y datos de contacto

- Testimonios: array `QUOTES` en `script.js`.
- Teléfono, dirección y horarios: sección `<footer>` de `index.html`.
- Instagram: reemplaza el `href="#"` del ícono en el footer por tu perfil.

## Cómo funciona el pedido

1. El cliente agrega bolos sueltos o packs.
2. El carrito se guarda en el navegador (`localStorage`), así no pierde el pedido si cierra la página.
3. Completa nombre, tipo de entrega y dirección.
4. Al confirmar, se abre WhatsApp con el resumen del pedido y el total ya escrito.

No hace falta servidor, base de datos ni pasarela de pago: la venta se cierra por WhatsApp.

## Publicar online gratis

- **Netlify Drop** (lo más simple): entra a `app.netlify.com/drop` y arrastra la carpeta completa. Te da una URL al instante.
- **Vercel**: importa la carpeta como proyecto estático.
- **GitHub Pages**: sube los archivos a un repositorio y activa Pages.
- Después puedes conectar un dominio propio (ej. `bolos.pe`) desde el panel del hosting.

## Estructura

```
index.html   → contenido y secciones
styles.css   → diseño, animaciones y responsive
script.js    → productos, carrito, WhatsApp y configuración
```

## Ideas para la próxima iteración

- Reemplazar las ilustraciones por fotos reales de los bolos (venden mucho más).
- Confirmar sabores, precios y zona de entrega reales.
- Sumar Instagram con fotos del proceso y del freezer.
- Conectar Google Analytics o Meta Pixel para medir campañas.
