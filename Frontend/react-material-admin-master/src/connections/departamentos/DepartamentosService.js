import http from "../../http";

class DepartamentosService {

    getAll() {

        return http.get("/departamentos");

    }

    get(id) {

        return http.get(`/departamentos/${id}`);

    }

    create(data) {

        return http.post("/departamentos", data);

    }

    update(id, data) {

        return http.put(`/departamentos/${id}`, data);

    }

    delete(id) {

        return http.delete(`/departamentos/${id}`);

    }

}

export default new DepartamentosService();