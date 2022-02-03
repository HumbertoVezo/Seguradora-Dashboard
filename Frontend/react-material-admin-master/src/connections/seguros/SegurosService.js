import http from "../../http";

class SegurosService {

    getAll() {

        return http.get("/seguros");

    }

    get(id) {

        return http.get(`/seguros/${id}`);

    }

    create(data) {

        return http.post("/seguros", data);

    }

    update(id, data) {

        return http.put(`/seguros/${id}`, data);

    }

    delete(id) {

        return http.delete(`/seguros/${id}`);

    }

}

export default new SegurosService();