import http from "../../http";

class EspecialidadesService {

    getAll() {

        return http.get("/especialidades");

    }

    get(id) {

        return http.get(`/especialidades/${id}`);

    }

    create(data) {

        return http.post("/especialidades", data);

    }

    update(id, data) {

        return http.put(`/especialidades/${id}`, data);

    }

    delete(id) {

        return http.delete(`/especialidades/${id}`);

    }

}

export default new EspecialidadesService();