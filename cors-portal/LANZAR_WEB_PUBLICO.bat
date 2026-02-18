@echo off
TITLE SURVSTAKE WEB CORS - SERVIDOR PUBLICO
COLOR 0D
echo =======================================================
echo      INICIANDO PLATAFORMA WEB SURVSTAKE CORS
echo =======================================================
echo.
echo [1/2] Iniciando Caster Engine (Pto 2101/2102)...
start python Survstake_Caster_Engine.py
echo.
echo [2/2] Iniciando Receptor de Pagos y Web (Pto 5000)...
echo.
echo >>> LA WEB ESTA LISTA EN http://localhost:5000
echo >>> EL CASTER ESTA LISTO EN PUERTO 2102
echo.
python Payment_Webhook.py
pause
