import socket
import threading
import time
import sqlite3
import base64
from datetime import datetime

class SurvstakeCaster:
    def __init__(self, port=2101):
        self.port = port
        self.base_data = b""
        self.clients = []
        self.mountpoint = "SURVSTAKE_CORS_01"
        self.is_running = True
        self.lock = threading.Lock()

    def log(self, message):
        print(f"[SURVSTAKE-CASTER] {time.strftime('%Y-%m-%d %H:%M:%S')} - {message}")

    def authenticate(self, auth_header):
        if not auth_header or not auth_header.startswith("Basic "):
            return False
        
        try:
            encoded = auth_header.split(" ")[1]
            decoded = base64.b64decode(encoded).decode('utf-8')
            username, password = decoded.split(":")
            
            conn = sqlite3.connect('survstake_users.db')
            cursor = conn.cursor()
            cursor.execute('SELECT id FROM users WHERE username=? AND password=? AND is_active=1 AND expires_at > ?', 
                           (username, password, datetime.now()))
            user = cursor.fetchone()
            conn.close()
            
            if user:
                return username
        except Exception as e:
            self.log(f"Error en autenticación: {e}")
        return False

    def handle_base(self):
        """ Gestiona la entrada de datos desde el Alpha 5i """
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            s.bind(('0.0.0.0', self.port))
            s.listen(5)
            self.log(f"Esperando Base SURVSTAKE en puerto {self.port}...")
            
            while self.is_running:
                conn, addr = s.accept()
                self.log(f"Base conectada desde {addr}")
                try:
                    while True:
                        data = conn.recv(2048)
                        if not data: break
                        with self.lock:
                            self.base_data = data
                            # Reenviar a todos los clientes conectados
                            current_clients = list(self.clients)
                            for client in current_clients:
                                try:
                                    client.sendall(data)
                                except:
                                    if client in self.clients:
                                        self.clients.remove(client)
                except Exception as e:
                    self.log(f"Conexión de base perdida: {e}")
                finally:
                    conn.close()

    def handle_rover_request(self, conn, addr):
        """ Gestiona la conexión de un Rover """
        try:
            request = conn.recv(1024).decode('utf-8')
            lines = request.split("\r\n")
            
            # Extraer Header de Autenticación
            auth_user = None
            for line in lines:
                if line.startswith("Authorization:"):
                    auth_user = self.authenticate(line)
            
            if not auth_user:
                self.log(f"Intento de conexión fallido desde {addr}")
                conn.sendall(b"HTTP/1.0 401 Unauthorized\r\nWWW-Authenticate: Basic realm=\"SURVSTAKE\"\r\n\r\n")
                conn.close()
                return

            self.log(f"Rover '{auth_user}' autenticado exitosamente.")
            conn.sendall(b"ICY 200 OK\r\n\r\n")
            
            with self.lock:
                self.clients.append(conn)
            
            # Mantener conexión viva y registrar sesión (simplificado)
            while self.is_running:
                time.sleep(1)
                if conn.fileno() == -1: break
        except Exception as e:
            self.log(f"Error con Rover {addr}: {e}")
        finally:
            if conn in self.clients:
                self.clients.remove(conn)
            conn.close()

    def start_rover_server(self, port=2102):
        """ Servidor para los clientes (Rovers) """
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            s.bind(('0.0.0.0', port))
            s.listen(10)
            self.log(f"Caster Rover activo en puerto {port}")
            while self.is_running:
                conn, addr = s.accept()
                threading.Thread(target=self.handle_rover_request, args=(conn, addr)).start()

    def run(self):
        # Hilos para Base y Rovers
        t_base = threading.Thread(target=self.handle_base)
        t_rovers = threading.Thread(target=self.start_rover_server)
        
        t_base.start()
        t_rovers.start()
        
        t_base.join()
        t_rovers.join()

if __name__ == "__main__":
    caster = SurvstakeCaster()
    caster.run()
