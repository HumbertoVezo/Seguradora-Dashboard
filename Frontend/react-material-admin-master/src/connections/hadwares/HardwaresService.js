import http from "../../http";

class HardwaresService {

    getAll() {

        return http.get("/had-wares");

    }

    get(id) {

        return http.get(`/had-wares/${id}`);

    }

    create(data) {

        return http.post("/had-wares", data);

    }

    update(id, data) {

        return http.put(`/had-wares/${id}`, data);

    }

    delete(id) {

        return http.delete(`/had-wares/${id}`);

    }

}

export default new HardwaresService();