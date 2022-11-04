import axios from "axios";
export default axios.create({
    baseURL: "https://localhost:7265/Customer/",
    headers: {
        "Content-type": "application/json"
    }
});
