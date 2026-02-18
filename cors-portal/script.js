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
    },
    6: {
        title: "Sistema Financiero y Métodos de Pago",
        content: `
            <p>Configure sus datos bancarios para recibir transferencias directas y gestione el balance de ingresos.</p>
            <div class="financial-grid">
                <div class="config-box">
                    <h4>💰 Configuración de Cuentas</h4>
                    <label>BANCO / ENTIDAD:</label>
                    <input type="text" id="bank-name" placeholder="Ej: Bancolombia / Nequi" style="width:100%; margin-bottom:10px; background: rgba(0,0,0,0.2); border: 1px solid var(--glass-border); color: white; padding: 5px;">
                    <label>NÚMERO DE CUENTA:</label>
                    <input type="text" id="bank-acc" placeholder="Ej: 3101234567" style="width:100%; margin-bottom:10px; background: rgba(0,0,0,0.2); border: 1px solid var(--glass-border); color: white; padding: 5px;">
                    <button class="btn-action" onclick="saveFinancials()" style="padding: 8px 15px; font-size: 0.8rem;">Guardar Cambios</button>
                </div>
                
                <div class="config-box" style="border-left-color: var(--accent);">
                    <h4>📊 Balance General</h4>
                    <p>Total Ingresos: <strong id="total-income-val">$0.00 COP</strong></p>
                    <p>Pagos por Transferencia: <strong id="transfer-income-val">0</strong></p>
                    <button class="btn-action" style="background: var(--accent); padding: 8px 15px; font-size: 0.8rem;">Generar Reporte PDF</button>
                </div>
            </div>
            <h4>Historial de Transacciones Recientes</h4>
            <div class="legal-scroll" style="height: 120px; font-size: 0.8rem;">
                <p>[Automático] Venta Plan Mensual - User: Rover_01 - $350.000</p>
                <p>[Manual] Venta Plan Diario - User: Ing_Topo - $25.000</p>
            </div>
        `
    },
    "7": {
        title: "Supervisión IA y Gestión de PQRs",
        content: `
            <div class="rtcm-panel" style="background: rgba(15, 23, 42, 0.4);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
                    <p>PQRs Radicados mediante Inteligencia Artificial</p>
                    <button class="btn-action" style="font-size:0.7rem; padding: 5px 10px;" onclick="refreshPQRs()">Actualizar Lista</button>
                </div>
                <div id="pqr-list" style="max-height: 250px; overflow-y: auto;">
                    <p style="font-size: 0.8rem; color: #64748b; text-align: center;">Pulse el botón para cargar registros de atención...</p>
                </div>
                <div style="margin-top:20px; padding-top:15px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.8rem;">Estado del Asistente IA: <strong style="color:#00ff88;">ACTIVO (24/7)</strong></span>
                        <button class="btn-secondary" style="font-size:0.7rem; color:#ff4444;" onclick="alert('IA en modo Standby')">Pausar IA</button>
                    </div>
                </div>
            </div>
        `
    }
};

function refreshPQRs() {
    const list = document.getElementById('pqr-list');
    fetch('/api/pqrs')
        .then(res => res.json())
        .then(data => {
            if (!data || data.length === 0) {
                list.innerHTML = '<p style="font-size:0.8rem; color:#64748b; text-align:center;">No hay PQRs pendientes. La IA ha resuelto todas las dudas.</p>';
                return;
            }
            list.innerHTML = data.map(p => `
                <div class="config-box" style="margin:5px 0; padding:10px; font-size:0.75rem;">
                    <div style="display:flex; justify-content:space-between; color:var(--primary);">
                        <strong>${p.category}</strong>
                        <span>${p.created_at}</span>
                    </div>
                    <div style="margin-top:5px; color:#fff;">${p.description}</div>
                    <div style="margin-top:5px; color:#64748b; font-style:italic;">IA: ${p.ai_response}</div>
                </div>
            `).join('');
        });
}

function saveFinancials() {
    const bank = document.getElementById('bank-name').value;
    const acc = document.getElementById('bank-acc').value;
    alert('SURVSTAKE FINANCE: Datos de transferencia actualizados exitosamente.');
    // Aquí se guardaría en localstorage o base de datos
    localStorage.setItem('survstake_bank', bank);
    localStorage.setItem('survstake_acc', acc);
}

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

// Funciones del Wizard Inicial
function toggleStartBtn() {
    const isTermsChecked = document.getElementById('terms-check').checked;
    const isDataChecked = document.getElementById('data-check').checked;
    document.getElementById('start-btn').disabled = !(isTermsChecked && isDataChecked);
}

function initializeSystem() {
    const wizard = document.getElementById('setup-wizard');
    const app = document.getElementById('app-content');

    wizard.style.opacity = '0';
    wizard.style.transition = 'opacity 0.8s ease';

    setTimeout(() => {
        wizard.style.display = 'none';
        document.body.classList.remove('setup-mode');
        app.classList.remove('app-hidden');
        app.classList.add('app-visible');
        showStep(1); // Iniciar el asistente técnico
    }, 800);
}

// Inicializar primer paso solo si el wizard ya no está
window.onload = () => {
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";

    if (!isLocal) {
        // MODO CLIENTE: Ocultar pestañas administrativas en la Web Pública
        const adminSteps = [5, 6, 7]; // Índices de Finanzas, Mantenimiento e IA
        adminSteps.forEach(idx => {
            const stepEl = document.querySelector(`.step[onclick="showStep(${idx})"]`);
            if (stepEl) stepEl.style.display = 'none';
        });
        console.log("[SURVSTAKE-SECURITY] Modo Cliente Publicado: Funciones administrativas ocultas.");
    } else {
        console.log("[SURVSTAKE-SECURITY] Modo Administrador Local: Acceso total concedido.");
    }

    // Verificar si el sistema ya está instalado (Solo local)
    fetch('/api/status')
        .then(res => res.json())
        .then(data => {
            if (data.is_installed && isLocal) {
                document.getElementById('maintenance-options').style.display = 'block';
                document.getElementById('start-btn').innerText = "VINCULAR Y LANZAR SURVSTAKE";
            }
        })
        .catch(e => console.log("Servidor local no detectado (Modo Offline Web)"));
};

function uninstallSystem() {
    if (confirm("¿ESTÁ SEGURO? Esta acción borrará permanentemente la base de datos de usuarios y registros financieros de SURVSTAKE.")) {
        fetch('/api/uninstall', { method: 'POST' })
            .then(res => res.json())
            .then(data => {
                alert(data.message);
                location.reload();
            });
    }
}

function repairSystem() {
    alert("Iniciando modo de reparación... Verificando integridad del Caster y Base de Datos.");
    // Aquí se podrían añadir más comprobaciones
}

// ========================================
// FUNCIONES DEL CHATBOT IA SURVSTAKE
// ========================================

function toggleChat() {
    const chat = document.getElementById('ai-chat-widget');
    chat.classList.toggle('ai-chat-closed');
}

function sendToAI() {
    const input = document.getElementById('user-msg');
    const container = document.getElementById('chat-messages');
    const text = input.value.trim();

    if (!text) return;

    // Mostrar mensaje del usuario
    container.innerHTML += `<div class="msg user">${text}</div>`;
    input.value = '';
    container.scrollTop = container.scrollHeight;

    // Simular retraso de pensamiento de la IA
    const aiId = "msg-" + Date.now();
    container.innerHTML += `<div class="msg ai" id="${aiId}">Escribiendo...</div>`;
    container.scrollTop = container.scrollHeight;

    // Llamar a la API de la IA (Backend Flask en puerto 5006)
    fetch('http://localhost:5006/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, email: 'cliente@survstake.com' })
    })
        .then(res => res.json())
        .then(data => {
            const aiMsgDiv = document.getElementById(aiId);
            aiMsgDiv.innerText = data.reply;
            container.scrollTop = container.scrollHeight;
        })
        .catch(err => {
            const aiMsgDiv = document.getElementById(aiId);
            aiMsgDiv.innerText = "Lo siento, mi conexión cerebral está en mantenimiento. Inténtelo más tarde o contacte a soporte técnico directamente.";
        });
}


