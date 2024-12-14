import { ProductRegi } from "@/interface/product";

const enviroment = process.env.NODE_ENV;

const url = enviroment === "production" ? `http://${process.env.NEXT_PUBLIC_POS_URL}` : `http://localhost:8083`;

export const getProduct = async () => {
    const response = await fetch(`${url}/all`, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();

    return data;
}

export const createProduct = async (data:ProductRegi) => {
    const response = await fetch(`${url}/api/products/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
}