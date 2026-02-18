const steps = {
    1: {
        title: "Configuración del Receptor Alpha 5i (Base)",
        content: `
            <p>El Alpha 5i debe actuar como servidor de datos vía su modem interno. Inserte la SIM y siga estos parámetros:</p>
            <div class="config-box">
                > Modo de Trabajo: BASE<br>
                > Enlace de Datos: GSM/GPRS Interno<br>
                > Protocolo: NTRIP Server (Push)<br>
                > Baud Rate: 115200 (Serial interna)<br>
                > Servidor: tucors.tuservidor.com (O tu IP Cloudflare)<br>
                > Port: 2101<br>
                > Mountpoint: SURVSTAKE_CORS_01<br>
                > Contraseña: (Definida en SNIP)
            </div>
            <h4>Mensajes RTCM 3.2 Críticos:</h4>
            <ul>
                <li><strong>1005:</strong> Coordenadas de Referencia de la Antena.</li>
                <li><strong>1033:</strong> Descriptor de Antena y Receptor (IGAC requiere esto).</li>
                <li><strong>1074-1077:</strong> Mensajes MSM para constelación GPS.</li>
                <li><strong>1084-1087:</strong> Mensajes MSM para constelación GLONASS.</li>
                <li><strong>1094-1097:</strong> Mensajes MSM para constelación GALILEO.</li>
                <li><strong>1124-1127:</strong> Mensajes MSM para constelación BEIDOU.</li>
            </ul>
        `
    },
    2: {
        title: "Túnel Seguro (Cloudflare Tunnel)",
        content: `
            <p>Para no abrir puertos en tu router y ocultar tu IP real, usaremos Cloudflare Tunnel (Capa de Ciberseguridad).</p>
            <ol>
                <li>Instale <strong>cloudflared</strong> en su PC local (o Micro-PC).</li>
                <li>Autentique con: <code>cloudflared tunnel login</code></li>
                <li>Cree el túnel: <code>cloudflared tunnel create cors_tunnel</code></li>
                <li>Configure el flujo TCP para el puerto 2101:</li>
            </ol>
            <div class="config-box">
                cloudflared tunnel run --url tcp://localhost:2101 cors_tunnel
            </div>
            <p>Esto creará un puente encriptado. El receptor se conectará al host de Cloudflare y el tráfico llegará a tu Caster local de forma invisible para atacantes.</p>
        `
    },
    3: {
        title: "NTRIP Caster Profesional (SNIP)",
        content: `
            <p>Usaremos la versión gratuita de SNIP para gestionar los usuarios (Rovers).</p>
            <ul>
                <li><strong>Pestana "Indbound Streams":</strong> Configure el punto de entrada para el Alpha 5i usando el Mountpoint y clave definidos en el Paso 1.</li>
                <li><strong>Pestana "Client Accounts":</strong> Crea usuarios únicos para tus colegas o clientes. No uses el mismo usuario para todos.</li>
                <li><strong>Seguridad:</strong> SNIP filtrará cualquier conexión no autorizada antes de que toque tu red interna.</li>
            </ul>
            <div class="config-box">
                Puerto Local: 2101<br>
                Tipo de Flujo: Push-In (NTRIP Server)
            </div>
        `
    },
    4: {
        title: "Validación MAGNA-SIRGAS (Resolución 1468)",
        content: `
            <p>Para que tu estación sea legal en Colombia, las coordenadas deben estar amarradas al marco oficial.</p>
            <ol>
                <li><strong>Recolección:</strong> Graba datos crudos (.HCN o RINEX) durante al menos 24 horas continuas.</li>
                <li><strong>Procesamiento:</strong> Usa el servicio <a href="https://ggg.nrcan.gc.ca/tools-outils/ppp-ops/index-eng.php" target="_blank" style="color:var(--primary)">NRCan PPP</a> para obtener coordenadas ITRF actuales.</li>
                <li><strong>Transformación:</strong> Usa los parámetros del IGAC para pasar de ITRF (Época de medición) a <strong>MAGNA-SIRGAS (Época 2018.0)</strong>.</li>
            </ol>
            <p>Utiliza la altura elipsoidal y asegúrate de configurar el mensaje 1005 con los valores resultantes.</p>
        `
    },
    5: {
        title: "Gestión Comercial y Usuarios (Monetización)",
        content: `
            <p>Convierte tu CORS en un negocio rentable con cero costos operativos mensuales.</p>
            <div class="config-box">
                Motor: Survstake_Caster_Engine.py (Custom Python Caster)<br>
                Base de Datos: SQLite (survstake_users.db)<br>
                Puerto Clientes: 2102
            </div>
            <h4>Flujo de Automatización:</h4>
            <ul>
                <li><strong>Registro:</strong> El cliente paga en la Landing Page vía Wompi/ePayco.</li>
                <li><strong>Activación:</strong> El script 'Payment_Webhook.py' recibe la confirmación y crea/extiende el usuario en la DB.</li>
                <li><strong>Acceso:</strong> El usuario recibe un correo con sus credenciales (User/Pass).</li>
                <li><strong>Control:</strong> El Caster valida cada conexión en tiempo real contra la fecha de vencimiento.</li>
            </ul>
            <p>Consulta el archivo <strong>manage_users.py</strong> para crear usuarios manualmente o ver reportes.</p>
        `
    }
};

function showStep(n) {
    const content = document.getElementById('step-content');
    const stepData = steps[n];

    // Update Active Class
    document.querySelectorAll('.step').forEach((s, idx) => {
        if (idx + 1 === n) s.classList.add('active');
        else s.classList.remove('active');
    });

    content.style.opacity = '0';
    setTimeout(() => {
        content.innerHTML = `
            <h4>${stepData.title}</h4>
            ${stepData.content}
            <div style="margin-top:20px">
                <button class="btn-action" onclick="showStep(${n < 4 ? n + 1 : 1})">
                    ${n < 4 ? 'Siguiente Paso' : 'Reiniciar Asistente'}
                </button>
            </div>
        `;
        content.style.opacity = '1';
    }, 200);
}

// Inicializar primer paso
window.onload = () => showStep(1);
