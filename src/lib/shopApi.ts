import { Item } from "@/interface/shop";

const enviroment = process.env.NODE_ENV;

let url = enviroment === "production" ? `http://${process.env.NEXT_PUBLIC_POS_URL}` : `http://localhost:8083`;

export const getItem = async () => {
    const response = await fetch(`${url}/all`, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();

    return data;
}

export const createItem = async (data:Item) => {
    const response = await fetch(`${url}/api/items/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
}