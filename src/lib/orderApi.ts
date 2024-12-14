import { CartData } from "@/interface/product";

const enviroment = process.env.NODE_ENV;

let url = enviroment === "production" ? `http://${process.env.NEXT_PUBLIC_POS_URL}` : `http://localhost:8083`;

export const getOrder = async () => {
    const response = await fetch(`${url}/all`, {
        method: 'GET',
        credentials: 'include'
    });

    const data = await response.json();

    return data;
}

interface Orderdata {
    orderItems: CartData[];
}

export const createOrder = async (data: Orderdata) => {
    const response = await fetch(`${url}/api/orders/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
    });

    return response.json();
}


