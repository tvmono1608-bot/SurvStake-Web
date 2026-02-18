from flask import Flask, request, jsonify
import sqlite3
from datetime import datetime, timedelta

app = Flask(__name__)

# NOTA: En un entorno real, debes validar el hash/firma de la pasarela para evitar fraudes.
@app.route('/webhook/payment', methods=['POST'])
def handle_payment():
    data = request.json
    # Estructura típica de Wompi/ePayco
    status = data.get('status') # 'APPROVED' o 'success'
    transaction_id = data.get('id')
    user_email = data.get('customer_email')
    plan_days = 30 # Por defecto 1 mes
    
    if status in ['APPROVED', 'success']:
        conn = sqlite3.connect('survstake_users.db')
        cursor = conn.cursor()
        
        # Buscar usuario por email o crear uno nuevo basado en el pago
        username = user_email.split('@')[0]
        password = transaction_id[:8] # Generar clave temporal
        expiry = datetime.now() + timedelta(days=plan_days)
        
        try:
            # Si el usuario ya existe, extendemos su suscripción
            cursor.execute('''
                INSERT INTO users (username, password, email, expires_at) 
                VALUES (?, ?, ?, ?)
                ON CONFLICT(username) DO UPDATE SET 
                expires_at = datetime(expires_at, '+30 days'),
                is_active = 1
            ''', (username, password, user_email, expiry))
            
            # Registrar el pago
            cursor.execute('SELECT id FROM users WHERE username=?', (username,))
            user_id = cursor.fetchone()[0]
            cursor.execute('INSERT INTO payments (user_id, amount, transaction_id) VALUES (?, ?, ?)',
                           (user_id, data.get('amount_in_cents', 0)/100, transaction_id))
            
            conn.commit()
            print(f"[WEBHOOK] Pago aprobado: Acceso concedido a {username} hasta {expiry}")
            return jsonify({"status": "delivered"}), 200
        except Exception as e:
            print(f"[WEBHOOK] Error procesando pago: {e}")
            return jsonify({"status": "error"}), 500
        finally:
            conn.close()
    
    return jsonify({"status": "ignored"}), 400

if __name__ == "__main__":
    print("--- INICIANDO RECEPTOR DE PAGOS SURVSTAKE ---")
    print("Escuchando webhooks en: http://tu-servidor:5000/webhook/payment")
    app.run(port=5000)
