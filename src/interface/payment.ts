export interface Payment {
    orderId:string,
    paymentKey:string,
    amount:string,
}

export interface PaymentResponse {
    paymentKey: string; // 결제 키
    orderId: string; // 주문 ID
    orderName: string; // 주문 이름
    requestedAt: string; // 결제 요청 시간
    approvedAt: string; // 결제 승인 시간
    provider?: string; // 간편결제 제공자 (nullable)
    easyPayAmount?: number; // 간편결제 금액 (nullable)
    easyPayDiscountAmount?: number; // 간편결제 할인 금액 (nullable)
    currency: string; // 통화 정보
    totalAmount: number; // 총 결제 금액
    vat: number; // 부가세
    method: string; // 결제 방식
    failReason?: string | null; // 실패 이유 (nullable)
    
  }
  