# Guía de Despliegue Estación SURVSTAKE CORS - Colombia (Alpha 5i)

Esta guía detalla la implementación de una estación de referencia de operación continua (CORS) cumpliendo con la normativa técnica colombiana (**IGAC**) y estándares de ciberseguridad industrial.

## 1. Configuración del Receptor GNSS Alpha 5i
El receptor Alpha 5i será el corazón de la estación base. 

### Parámetros de Comunicación
- **SIM Card:** Debe tener un plan de datos activo con APN configurado (ej: `internet.movistar.com.co` o `internet.comcel.com.co`).
- **NTRIP Server:** Configure el receptor para que "empuje" (Push) los datos hacia su Caster.
- **Intervalo de Salida:** 1Hz (recomendado para RTK estándar).

### Mensajes RTCM v3.3 (Multiconstelación)
Para cumplir con la Res. 1468 del IGAC, active:
- **1005:** Coordenadas de la estación (Antenna Reference Point).
- **1033:** Receptor y Antena (crítico para vinculación a MAGNA-SIRGAS).
- **1074-1077 (GPS):** Full MSM para máxima compatibilidad.
- **1084-1087 (GLONASS)**
- **1094-1097 (Galileo)**
- **1124-1127 (BeiDou)**

---

## 2. Arquitectura de Red y Ciberseguridad (Túnel Cloudflare)
Para evitar que su ubicación física (IP) sea rastreada o que su router sea atacado por bots, utilizaremos un túnel de capa 7/4.

### Ventajas:
1. **Ocultamiento de IP:** El rover se conecta a una URL de Cloudflare (ej: `cors.minegocio.com`).
2. **Cifrado:** Los datos viajan encriptados hasta su red local.
3. **Sin Puertos Abiertos:** No necesita configurar "Port Forwarding" en su router.

### Instalación en Micro-PC:
1. Instale `cloudflared` en un computador local que estará encendido 24/7.
2. Comando de ejecución: `cloudflared tunnel run --url tcp://localhost:2101 [ID_DEL_TUNEL]`

---

## 3. Esquema de Soporte y Continuidad (Hardware de Bajo Costo)
Para garantizar el **99.9% de disponibilidad**, se propone:

*   **Micro-PC (Gateway):** Una Raspberry Pi 4 o un Lenovo Tiny/Dell Micro usado (i3/4GB RAM). Consume menos de 15W.
*   **UPS con Gestión:** Una UPS de 500VA/750VA. Configure el apagado automático del PC, pero lo más importante: **conecte la base Alpha 5i directamente a la salida de batería de la UPS**.
*   **Internet Redundante:** El Alpha 5i usa la SIM, pero el Micro-PC puede usar la red WiFi/Ethernet local para el túnel.

---

## 4. Validación de Coordenadas (Marco MAGNA-SIRGAS)
La precisión de su CORS depende de su coordenada base.

1. **Grabación de Datos Raw:** Configure el Alpha 5i para grabar archivos RINEX internamente durante 24 horas.
2. **Procesado NRCan PPP:** Suba el archivo a [NRCan PPP](https://ggg.nrcan.gc.ca/tools-outils/ppp-ops/index-eng.php). Obtendrá una precisión centimétrica.
3. **Transformación:** Las coordenadas de NRCan están en ITRF (época actual). Use la calculadora del IGAC o los parámetros de transformación para llevarlas a **MAGNA-SIRGAS Época 2018.0**. 

---

## 5. Marco Legal (Resoluciones IGAC)
- **Res. 1468 de 2021:** Define los estándares de calidad de levantamientos.
- **Res. 1562 de 2018:** Establece el sistema de referencia oficial para Colombia.
- **Formato:** RTCM 3.3 es el estándar aceptado para correcciones diferenciales.

---
*Documento generado por Antigravity AI - Experto en Infraestructura GNSS.*
