import { Item } from "@/interface/shop";

const enviroment = process.env.NODE_ENV;

const url = enviroment === "production" ? `${process.env.NEXT_PUBLIC_POS_URL}/api/items` : `http://localhost:8083/api/items`;

export const getItem = async () => {
    const response = await fetch(`${url}/all`, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();

    return data;
}

export const createItem = async (data:Item) => {
    const response = await fetch(`${url}/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
}