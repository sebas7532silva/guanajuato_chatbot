import requests

BASE_URL = "http://localhost:3000/tramites"  # Cambia al URL de tu servicio

# -----------------------------
# CREATE: Agregar un nuevo trámite
# -----------------------------
nuevo_tramite = {
    "id": "999999",
    "tramiteIdSAP": "12345",
    "tramiteNombre": "Cambio de placas",
    "categoriaId": "01",
    "categoriaNombre": "Registro vehicular",
    "tipoTramite": "Presencial"
}

r = requests.post(BASE_URL, json=nuevo_tramite)
print("Trámite creado:", r.json())

# -----------------------------
# READ: Obtener todos los trámites
# -----------------------------
r = requests.get(BASE_URL)
tramites = r.json()
print("Trámites disponibles:")
for t in tramites:
    print(t)

# -----------------------------
# UPDATE: Modificar un trámite existente
# -----------------------------
if tramites:
    id_tramite = tramites[0]['id']
    datos_actualizados = {
        "tramiteNombre": "Actualización de placas",
        "tipoTramite": "En línea"
    }
    r = requests.put(f"{BASE_URL}/{id_tramite}", json=datos_actualizados)
    print(f"Trámite {id_tramite} actualizado:", r.json())

# -----------------------------
# DELETE: Eliminar un trámite
# -----------------------------
if tramites:
    id_tramite = tramites[0]['id']
    r = requests.delete(f"{BASE_URL}/{id_tramite}")
    print(f"Trámite {id_tramite} eliminado, status code:", r.status_code)
