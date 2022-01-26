import http from "../../http";

class MedicosService {

    getAll() {

        return http.get("/medicos");

    }

    get(id) {

        return http.get(`/medicos/${id}`);

    }

    create(data) {

        return http.post("/medicos", data);

    }

    update(id, data) {

        return http.put(`/medicos/${id}`, data);

    }

    delete(id) {

        return http.delete(`/medicos/${id}`);

    }

}

export default new MedicosService();