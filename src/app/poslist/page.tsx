"use client";
import { useOrder } from "@/hooks/useOrderQuery";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Transaction = {
  cart: { id: number; name: string; price: number; quantity: number }[];
  total: number;
  date: string;
};

export default function PosList() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const {data } = useOrder();
  console.log(data);

  useEffect(() => {
    // 로컬스토리지에서 결제 내역 불러오기
    const savedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(savedTransactions);
  }, []);

  return (
    <div className="min-h-screen p-4 mx-auto container">
      <div className="flex mb-5">
        <Link href={"/"}>
          <Image alt="back" src={'/icons/arrow.png'} width={25} height={25} className="mr-2" />
        </Link>
        <h1 className="text-2xl font-bold">결제내역</h1>
      </div>
      {transactions.length === 0 ? (
        <p className="text-gray-500">결제 내역이 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {transactions.map((transaction, index) => (
            <li key={index} className="bg-gray-100 p-4 rounded-lg shadow">
              <h2 className="font-bold mb-2">
                결제일: {new Date(transaction.date).toLocaleString()}
              </h2>
              <ul className="space-y-1 mb-2">
                {transaction.cart.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name} x {item.quantity}</span>
                    <span>{(item.price * item.quantity).toLocaleString()}원</span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end border-t pt-2">
                <p className="font-bold">총합: {transaction.total.toLocaleString()}원</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
