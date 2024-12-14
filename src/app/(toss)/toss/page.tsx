"use client";

// import { loadTossPayments } from "@tosspayments/payment-sdk";
import { ANONYMOUS, loadTossPayments, TossPaymentsPayment } from "@tosspayments/tosspayments-sdk";
import { useEffect, useMemo, useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

const enviroment = process.env.NODE_ENV;
const clientKey = process.env.NEXT_PUBLIC_TOSS_CLIENT as string;

const url = enviroment === "production" ? `http://${process.env.NEXT_PUBLIC_POS_URL}` : `http://localhost:8083`;


// 성공 버전 2
export default function Toss() {
  const searchParams = useSearchParams();
  const price = Number(searchParams.get("price"));
  const orderName = searchParams.get("orderName") || "";
  
  const [payment, setPayment] = useState<TossPaymentsPayment | null>(null);
  const [amount] = useState({
    currency: "KRW",
    value: price,
  });

const isRequestInProgress = useRef(false);

  const orderID = useMemo(() => {
    return window.btoa(Math.random().toString(36).substring(2));
  }, []);

  useEffect(() => {
    async function fetchPayment() {
      try {
        const tossPayments = await loadTossPayments(clientKey);

        // 비회원 결제
        const payment = tossPayments.payment({
          customerKey: ANONYMOUS,
        });

        setPayment(payment);
      } catch (error) {
        console.error("Error fetching payment:", error);
      }
    }

    fetchPayment();
  }, []);

  async function requestPayment() {
    console.log("결제 요청 시작");

    if (isRequestInProgress.current) {
      console.warn("결제 요청이 이미 진행 중입니다.");
      return;
    }

    if (!payment) {
      console.warn("결제 시스템이 초기화되지 않았습니다.");
      return;
    }

    isRequestInProgress.current = true; // 요청 시작
    try {
      // 결제 데이터를 서버에 저장
      const saveResponse = await fetch(`${url}/api/payments/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderID,
          amount: amount.value,
        }),
      });

      if (!saveResponse.ok) {
        throw new Error("결제 데이터를 저장하지 못했습니다.");
      }

      // 결제 요청
      await payment.requestPayment({
        method: "CARD", // 카드 및 간편결제
        amount: amount,
        orderId: orderID,
        orderName: orderName,
        successUrl: window.location.origin + "/success", // 결제 성공 시 이동 URL
        failUrl: window.location.origin + "/fail", // 결제 실패 시 이동 URL
        customerEmail: "customer123@gmail.com",
        customerName: "김토스",
        customerMobilePhone: "01012341234",
        card: {
          useEscrow: false,
          flowMode: "DEFAULT",
          useCardPoint: false,
          useAppCardOnly: false,
        },
      });
    } catch (error) {
      console.error("결제 처리 중 오류 발생:", error);
      // alert("결제 요청 중 문제가 발생했습니다. 다시 시도해주세요.");
    } finally {
      isRequestInProgress.current = false;
    }
  }

  return (
    <div className="container flex flex-col mx-auto justify-center space-y-6">
      <div className="text-center items-center flex flex-col space-y-3">
        <p>{orderName}</p>
        <p>{price} 원</p>
      </div>
      <button className="button bg-emerald-400 w-full rounded-md text-white h-12" onClick={() => requestPayment()}>

        결제하기
      </button>
    </div>
  );

}