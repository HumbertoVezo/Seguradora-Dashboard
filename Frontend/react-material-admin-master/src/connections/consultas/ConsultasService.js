import http from "../../http";

class ConsultasService {

    getAll() {

        return http.get("/consultas");

    }

    get(id) {

        return http.get(`/consultas/${id}`);

    }

    create(data) {

        return http.post("/consultas", data);

    }

    update(id, data) {

        return http.put(`/consultas/${id}`, data);

    }

    delete(id) {

        return http.delete(`/consultas/${id}`);

    }

}

export default new ConsultasService();