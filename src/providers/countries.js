import axios from "axios";

const API_URL = "https://corona.lmao.ninja/v2";

export async function get() {
    let countries;
    try {
        countries = await axios.get(`${API_URL}/countries`);
    } catch (e) {
        console.log(`Failed to fetch countries: ${e.message}`, e);
        return [];
    }
    return countries.data;
}

