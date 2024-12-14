import { Payment } from "@/interface/payment";


const enviroment = process.env.NODE_ENV;

const url = enviroment === "production" ? `http://${process.env.NEXT_PUBLIC_POS_URL}` : `http://localhost:8083`;


export const setPayment = async(data:Payment) => {
    const response = await fetch(`${url}/api/payments/confirm`,{
      method:"POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      const errorData = await response.json(); // 오류 응답 JSON 파싱
      throw new Error(JSON.stringify(errorData)); // 오류 던지기
  }

    const responseData = await response.json();
    return responseData;

  }

  