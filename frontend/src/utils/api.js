class ApiService {
  constructor(baseUrl = "http://localhost:3000") {
    this.baseUrl = baseUrl;
  }

  // 🔹 Método genérico para manejar respuestas
  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
        },
        ...options,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error ${response.status}: ${errorText}`);
      }

      // Si hay contenido JSON
      if (response.status !== 204) {
        return await response.json();
      }
      return null;
    } catch (error) {
      console.error(`❌ Error en ${endpoint}:`, error);
      throw error;
    }
  }

  // =====================
  // 📄 TRÁMITES
  // =====================
  getTramites() {
    return this.request("/tramites");
  }

  getTramiteById(id) {
    return this.request(`/tramites/${id}`);
  }

  createTramite(data) {
    return this.request("/tramites", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  updateTramite(id, data) {
    return this.request(`/tramites/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  deleteTramite(id) {
    return this.request(`/tramites/${id}`, {
      method: "DELETE",
    });
  }

  // =====================
  // 📎 REQUISITOS
  // =====================
  getRequisitos() {
    return this.request("/requisitos");
  }

  getRequisitoById(id) {
    return this.request(`/requisitos/${id}`);
  }

  // =====================
  // 🔗 REQUISITOS-TRÁMITES
  // =====================
  getRequisitosPorTramite(tramiteId) {
    return this.request(`/requisitos-tramites/${tramiteId}`);
  }

  // =====================
  // 🏢 OFICINAS
  // =====================
  getOficinas() {
    return this.request("/oficinas");
  }

  getOficinaById(id) {
    return this.request(`/oficinas/${id}`);
  }

  createOficina(data) {
    return this.request("/oficinas", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  updateOficina(id, data) {
    return this.request(`/oficinas/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  deleteOficina(id) {
    return this.request(`/oficinas/${id}`, {
      method: "DELETE",
    });
  }

    // =====================
  // 🖼️ BANNERS
  // =====================
  getBanners() {
    return this.request("/banners");
  }

}

// Exporta una instancia lista para usar
const api = new ApiService();
export default api;
