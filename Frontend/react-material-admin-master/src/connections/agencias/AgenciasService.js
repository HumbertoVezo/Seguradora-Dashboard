import http from "../../http";

class AgenciasService {

    getAll() {

        return http.get("/agencias");

    }

    get(id) {

        return http.get(`/agencias/${id}`);

    }

    create(data) {

        return http.post("/agencias", data);

    }

    update(id, data) {

        return http.put(`/agencias/${id}`, data);

    }

    delete(id) {

        return http.delete(`/agencias/${id}`);

    }

}

export default new AgenciasService();