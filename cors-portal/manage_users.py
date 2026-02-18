import sqlite3
from datetime import datetime, timedelta

def init_db():
    conn = sqlite3.connect('survstake_users.db')
    cursor = conn.cursor()
    
    # Tabla de Clientes
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        email TEXT,
        plan_type TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP,
        is_active INTEGER DEFAULT 1
    )
    ''')
    
    # Tabla de Pagos
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS payments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        amount REAL,
        transaction_id TEXT,
        payment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users (id)
    )
    ''')
    
    # Tabla de Logs de Conexión
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS sessions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT,
        mountpoint TEXT,
        ip_address TEXT,
        connected_at TIMESTAMP,
        disconnected_at TIMESTAMP,
        bytes_transferred INTEGER
    )
    ''')
    
    conn.commit()
    conn.close()
    print("[DB] Base de datos de SURVSTAKE CORS inicializada.")

def add_user(username, password, days=30):
    conn = sqlite3.connect('survstake_users.db')
    cursor = conn.cursor()
    expiry = datetime.now() + timedelta(days=days)
    try:
        cursor.execute('INSERT INTO users (username, password, expires_at) VALUES (?, ?, ?)',
                       (username, password, expiry))
        conn.commit()
        print(f"[DB] Usuario {username} creado con éxito hasta {expiry}")
    except sqlite3.IntegrityError:
        print(f"[DB] Error: El usuario {username} ya existe.")
    conn.close()

if __name__ == "__main__":
    init_db()
    # Usuario de prueba
    add_user("test_rover", "pass123")
