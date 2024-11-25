"use client";
import { useCreateOrder } from "@/hooks/useOrderQuery";
import { useCreateProduct, useProduct } from "@/hooks/useProductQuery";
import { CartItem, Product } from "@/interface/product";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";


export default function Pos() {

  const [cart, setCart] = useState<CartItem[]>([]);

  const [total, setTotal] = useState(0);
  const [checkoutMessage, setCheckoutMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, handleSubmit} = useForm<Product>({ mode: "onChange" });

  const {data: product} = useProduct();


  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.productId === product.productId);
      
      if (existingItem) {
        return prevCart.map((item) =>
          item.productId === product.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { productId: product.productId,
          name: product.productName,
          price: product.productPrice,
          quantity: 1 }];
      }
    });
    setTotal((prevTotal) => prevTotal + product.productPrice);
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.productId === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    const removedProduct = cart.find((item) => item.productId === id);
    if (removedProduct) {
      setTotal((prevTotal) => prevTotal - removedProduct?.price as number);
    }
  };
  const orderMuatation = useCreateOrder();
  
  const handleCheckout = () => {
    if (cart.length > 0) {
      // 기존 저장된 결제 내역 가져오기
      const previousTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");

      // 새로운 결제 내역 추가
      const newTransaction = [...previousTransactions, { cart, total, date:new Date().toISOString()}];
      localStorage.setItem("transactions", JSON.stringify(newTransaction));
      console.log(cart);
      const cartData = cart.map((e)=>({productId: e.productId, quantity:e.quantity}));
      orderMuatation.mutate({orderItems:cartData});

      setCart([]); 
      setTotal(0); 
      setCheckoutMessage("결제가 완료되었습니다."); 

      // 2초 후 메시지 숨기기
      setTimeout(() => {
        setCheckoutMessage(null);
      }, 2000);
    }
  };

  const closeModal = () => setIsModalOpen(false);

  const productMuatation = useCreateProduct();
  const onSubmit = (data: Product) => {
    productMuatation.mutate(data);
  }

  return (
    <div className=" flex flex-col overflow-y-auto p-10 justify-center max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">POS 시스템</h1>
        <Link
          href ={"/poslist"} className="p-2 rounded-md bg-slate-200">
            결제내역
        </Link>
      </div>

      <div className="flex mb-5 justify-center">
        <div className="grid grid-cols-2 gap-5 bg-gray-50 p-4 w-full">
          {product?.map((product: Product, i:number) => (
            <button
              key={i}
              onClick={() => addToCart(product)}
              className=" p-5 bg-white rounded-lg shadow text-center "
            >
              <h2 className="text-lg font-bold">{product?.productName}</h2>
              <p className="text-gray-500">{product?.productPrice.toLocaleString()}원</p>
            </button>
          ))}
          <button onClick={()=>{setIsModalOpen(true)}} className=" p-5 bg-white rounded-lg shadow text-center ">+</button>
        </div> 
      </div>

      <div>
        {/* Modal */}
        {isModalOpen && (
          <div
            className="fixed inset-0 flex items-end justify-center bg-black bg-opacity-30 z-10"
            onClick={closeModal}
          >
            <div
              className="bg-white rounded-t-3xl w-full max-w-lg p-10 text-center relative slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="text-gray-700 font-bold text-2xl absolute top-2 right-4"
              >
                &times;
              </button>
              <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col">
                <label className="text-xl font-medium text-gray-700 text-start ">상품명</label>
                <input
                  placeholder="상품명"
                  {...register("productName")}
                  className="mt-1 p-3 border border-gray-300 rounded"
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-xl font-medium text-gray-700 text-start">가격</label>
                <input
                  placeholder="가격"
                  {...register("productPrice")}
                  className="mt-1 p-3 border border-gray-300 rounded"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-500 text-xl font-normal rounded-lg h-16"
              >
                상품등록
              </button>
              </form>
            </div>
          </div>
        )}
      </div>

      
      <div className="bg-gray-100 p-4 ">
        <h2 className="text-lg font-bold mb-2">주문내역</h2>
          <ul className="space-y-2">
            {cart?.map((item) => (
              <li
                key={item.productId}
                className="flex justify-between items-center bg-white p-3 rounded-lg shadow"
              >
                <div>
                  <span className="font-bold">{item.name}</span>
                  <span className="ml-2 text-gray-500 text-xs">
                    {item?.price?.toLocaleString()}원
                  </span>
                  <span className="ml-2 text-gray-500 text-xs">x {item.quantity}</span>
                </div>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className="text-red-500 font-bold"
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        
        <div className="mt-4 flex justify-between items-center">
          <h3 className="text-xl font-bold">총합: {total.toLocaleString()}원</h3>
          <button
            onClick={handleCheckout}
            className="p-3 bg-emerald-500 text-white rounded-md shadow"
          >
            결제하기
          </button>
        </div>
      </div>
      {checkoutMessage && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2">
          {checkoutMessage}
        </div>
      )}
    </div>
  );
}
