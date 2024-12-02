
import { Payment } from "@/interface/payment";
import { setPayment } from "@/lib/paymentApi";
import { useMutation } from "@tanstack/react-query"

export const usePayment = () => {
    return useMutation({
        mutationFn: (data:Payment) => setPayment(data),
        onError: (error) => console.error("결제 오류:", error),
    });
};
