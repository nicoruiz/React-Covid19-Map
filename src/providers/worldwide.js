import axios from "axios";

const API_URL = "https://corona.lmao.ninja/v2";

export async function get() {
    let all;
    try {
        all = await axios.get(`${API_URL}/all`);
    } catch (e) {
        console.log(`Failed to fetch total: ${e.message}`, e);
        return {};
    }
    return all.data;
}

