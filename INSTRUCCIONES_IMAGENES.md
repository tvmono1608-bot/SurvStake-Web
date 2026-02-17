# 📸 INSTRUCCIONES PARA GUARDAR IMÁGENES

## 🚨 ACCIÓN REQUERIDA: Guardar Logo desde el Chat

### Paso 1: Localizar la Imagen del Logo
En este chat, encontrarás la imagen del logo de SurvStake que compartiste.
Es la imagen que muestra:
- El texto "SURVSTAKE" 
- "Ingeniería & Topografía"
- Una estación total (teodolito) en el diseño
- Un casco espartano rojo en el medio

### Paso 2: Guardar la Imagen

**MÉTODO 1 (Recomendado):**
1. Haz **clic derecho** sobre la imagen del logo en el chat
2. Selecciona **"Guardar imagen como..."**
3. Navega a esta ubicación:
   ```
   c:\Users\PARODI\Desktop\SurvStake\SurvStake Ingeniería & Topografía WEB-APP\assets\
   ```
4. Guarda el archivo con el nombre exacto: **`logo.png`**
5. Haz clic en **Guardar**

**MÉTODO 2 (Alternativo):**
1. Haz clic derecho sobre la imagen en el chat
2. Selecciona **"Copiar imagen"**
3. Abre **Paint** (búscalo en Windows)
4. Presiona **Ctrl + V** para pegar
5. Ve a **Archivo → Guardar como**
6. Selecciona **PNG** como formato
7. Guarda en: `c:\Users\PARODI\Desktop\SurvStake\SurvStake Ingeniería & Topografía WEB-APP\assets\logo.png`

---

## 📁 Ubicación Exacta donde Guardar

```
c:\Users\PARODI\Desktop\SurvStake\
└── SurvStake Ingeniería & Topografía WEB-APP\
    └── assets\
        └── logo.png  ← AQUÍ DEBE GUARDAR EL LOGO
```

---

## ✅ Verificación

Una vez guardado el logo, abra el archivo **`index.html`** y debería ver:
- El logo de SurvStake en la esquina superior izquierda del header
- El logo se mostrará en todas las páginas automáticamente

---

## 🎨 Otras Imágenes Opcionales

Si desea agregar más imágenes profesionales al sitio (fotos de proyectos, equipos, etc.), 
puede guardarlas también en la carpeta `assets/` y luego editar el HTML para incluirlas.

**Formatos recomendados:**
- Logo: PNG (fondo transparente)
- Fotos: JPG (mejor compresión)
- Gráficos: PNG o SVG

---

## 🔧 Solución de Problemas

**Si el logo no aparece:**
1. Verifique que el archivo se llama exactamente: `logo.png` (minúsculas)
2. Verifique que está en la carpeta: `assets/`
3. Presione **Ctrl + F5** en el navegador para recargar completamente
4. Verifique el tamaño: idealmente entre 200-400px de ancho

**Si el logo está muy grande o pequeño:**
Edite el archivo `css/style.css`, busque:
```css
.logo-area img {
    height: 70px;  ← Cambie este valor
    width: auto;
}
```

---

## 💡 Consejo Profesional

Para mejor visualización en pantallas de alta resolución:
- Use una imagen del logo de **al menos 400px de ancho**
- Formato PNG con **fondo transparente**
- Resolución: **72 DPI para web**

---

**Una vez guardado el logo, todo el sitio estará 100% funcional.**
