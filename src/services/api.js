import axios from "axios";

export async function fetchProducts() {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
  } catch (err) {
    throw new Error("Error al cargar los productos.");
  }
}
