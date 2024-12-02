"use client";

import { usePayment } from "@/hooks/usePaymentQuery";
import { PaymentResponse } from "@/interface/payment";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Success() {
  const searchParams = useSearchParams();

  const [params] = useState({
    paymentKey: searchParams.get("paymentKey") || "",
    orderId: searchParams.get("orderId") || "",
    amount: searchParams.get("amount") || "",
  });

  const [paymentResponse, setPaymentResponse] = useState<PaymentResponse | null>(null);

  const mutation = usePayment();

  const handleMutation = () => {

  mutation.mutate(params, {
    onSuccess: (data) => setPaymentResponse(data),
  });
};

  return (
    <div className="container mx-auto flex flex-col items-center justify-center">
      {!paymentResponse ? (
        <button
          onClick={handleMutation}
          className="w-full rounded bg-emerald-500 text-white font-bold p-4"
        >
          결제 완료
        </button>
      ) : (
        <div className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-md w-full">
          <h1 className="text-xl font-bold text-blue-600 mb-6 text-center">결제 성공</h1>
          <div className="space-y-2 text-md text-gray-700 p-4">
            <p className="font-semibold p-1">주문 ID: {paymentResponse?.orderId}</p>
            <p className="font-semibold p-1">주문 이름: {paymentResponse?.orderName}</p>
            <p className="font-semibold p-1">결제 금액: {paymentResponse?.totalAmount} KRW</p>
            <p className="font-semibold p-1">부가세: {paymentResponse?.vat} KRW</p>
            <p className="font-semibold p-1">결제 승인 시간: {paymentResponse?.approvedAt}</p>
            <p className="font-semibold p-1">결제 수단: {paymentResponse?.method}</p>
            <p className="font-semibold p-1">결제 제공자: {paymentResponse?.provider}</p>
            {/* {paymentResponse?.easyPayAmount && (
              <p className="font-semibold p-1">간편결제 금액: {paymentResponse.easyPayAmount} KRW</p>
            )} */}
            {paymentResponse?.easyPayDiscountAmount as number > 0 && (
              <p className="font-semibold p-1">간편결제 할인 금액: {paymentResponse.easyPayDiscountAmount} KRW</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
