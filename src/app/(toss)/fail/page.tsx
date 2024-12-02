"use client";

import { useRouter } from "next/navigation";
// import "../../(toss)/toss.css";

export default function FailPage() {


  // const searchParams = useSearchParams();

  // const code = searchParams.get("code");
  // const message = searchParams.get("message");
  // const orderId = searchParams.get("orderId");

  const router = useRouter();

  return (
    <main className="flex items-center justify-center min-h-screen container">
      <div id="info" className="box_section flex flex-col items-center">
        <img width="100px" src="https://static.toss.im/lotties/error-spot-no-loop-space-apng.png" alt="에러 이미지" />
        <h2>결제를 실패했어요.</h2>

        <div className="p-6 w-full">
            <button className="button" onClick={()=>{router.push("/")}}>돌아가기</button>
        </div>

        {/* <div className="p-grid typography--p" style={{ marginTop: "50px" }}>
          <div className="p-grid-col text--left">
            <b>에러메시지</b>
          </div>
          <div className="p-grid-col text--right" id="message">
            {code ?? "UNKNOWN_ERROR"}
          </div>
        </div>
        <div className="p-grid typography--p" style={{ marginTop: "10px" }}>
          <div className="p-grid-col text--left">
            <b>에러코드</b>
          </div>
          <div className="p-grid-col text--right" id="code">
            {message ?? "알 수 없음"}
          </div>
        </div>

        <div className="p-grid-col">
          <Link href="https://docs.tosspayments.com/guides/payment-widget/integration">
            <button className="button p-grid-col5">연동 문서</button>
          </Link>
          <Link href="https://discord.gg/A4fRFXQhRu">
            <button className="button p-grid-col5" style={{ backgroundColor: "#e8f3ff", color: "#1b64da" }}>
              실시간 문의
            </button>
          </Link>
        </div>*/}
      </div> 
    </main>
  );
}