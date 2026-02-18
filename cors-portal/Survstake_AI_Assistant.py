from flask import Flask, request, jsonify
import sqlite3
import datetime

app = Flask(__name__)

# Base de conocimientos de la IA SURVSTAKE
KNOWLEDGE_BASE = {
    "conexion": "Para conectar un Rover, use el puerto 2102, mountpoint SURVSTAKE_CORS_01 y sus credenciales de pago.",
    "pago": "Los pagos se procesan via Wompi/ePayco. Una vez aprobado, su acceso es instantaneo.",
    "rtcm": "Emitimos en formato RTCM 3.3 (MSM7), compatible con receptores de triple frecuencia.",
    "coordenadas": "Nuestra base esta referenciada al marco MAGNA-SIRGAS epoch 2018.0.",
    "admin": "Puede contactar al soporte humano en el WhatsApp +57 3178623774."
}

def analyze_intent(text):
    text = text.lower()
    if "conectar" in text or "puerto" in text or "mountpoint" in text:
        return "conexion"
    if "pagar" in text or "precio" in text or "wompi" in text or "pago" in text:
        return "pago"
    if "formato" in text or "msm" in text or "rtcm" in text:
        return "rtcm"
    if "cota" in text or "magna" in text or "sirgas" in text:
        return "coordenadas"
    return "general"

@app.route('/api/ai-chat', methods=['POST'])
def ai_chat():
    data = request.json
    message = data.get('message', '')
    email = data.get('email', 'anonimo@survstake.com')
    
    intent = analyze_intent(message)
    response = KNOWLEDGE_BASE.get(intent, "Soy el asistente IA de SURVSTAKE. ¿En qué puedo ayudarle con su estación CORS?")
    
    # Si el mensaje suena a queja, lo registramos como PQR automáticamente
    if any(word in message.lower() for word in ["falla", "error", "no sirve", "queja", "reclamo", "malo"]):
        save_pqr(email, "Queja/Falla", message, response)
        response = "He detectado una inconformidad. He registrado esto como un PQR oficial en nuestro sistema y un técnico revisará su caso. " + response

    return jsonify({"reply": response, "intent": intent})

def save_pqr(email, category, desc, ai_resp):
    try:
        conn = sqlite3.connect('survstake_users.db')
        cursor = conn.cursor()
        cursor.execute('''
            INSERT INTO pqrs (user_email, category, description, ai_response)
            VALUES (?, ?, ?, ?)
        ''', (email, category, desc, ai_resp))
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"[AI-ERROR] No se pudo guardar PQR: {e}")

if __name__ == "__main__":
    print("--- ASISTENTE IA SURVSTAKE ACTIVO ---")
    app.run(port=5006)
