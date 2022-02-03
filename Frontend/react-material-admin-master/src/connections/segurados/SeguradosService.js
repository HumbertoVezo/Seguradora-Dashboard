import http from "../../http";

class SeguradosService {

    getAll() {

        return http.get("/segurados");

    }

    get(id) {

        return http.get(`/segurados/${id}`);

    }

    create(data) {

        return http.post("/segurados", data);

    }

    update(id, data) {

        return http.put(`/segurados/${id}`, data);

    }

    delete(id) {

        return http.delete(`/segurados/${id}`);

    }

}

export default new SeguradosService();