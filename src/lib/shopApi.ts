import { Item } from "@/interface/shop";

const enviroment = process.env.NODE_ENV;

let url = "http://localhost:8083/api/items";
if (enviroment === "production") {
  url = process.env.NEXT_PUBLIC_DOMAIN ? `http://${process.env.NEXT_PUBLIC_DOMAIN}/api` : `http://localhost:8083/api/items`;
}

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