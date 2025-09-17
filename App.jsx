import React, { useReducer, useState, useEffect } from "react";

const sampleProducts = [
  { id: "p1", title: "Wireless Bluetooth Headphones", price: 59.99, category: "Electronics", rating: 4.5, image: "https://picsum.photos/seed/headphones/400/300", stock: 12, description: "Comfortable over-ear Bluetooth headphones with long battery life." },
  { id: "p2", title: "Classic Leather Wallet", price: 24.5, category: "Fashion", rating: 4.1, image: "https://picsum.photos/seed/wallet/400/300", stock: 30, description: "Slim genuine leather wallet with multiple card slots." },
];

const currency = (n) => `₦${n.toFixed(2)}`;

function cartReducer(state, action) {
  switch (action.type) {
    case "add":
      return [...state, { ...action.payload, qty: 1 }];
    case "remove":
      return state.filter((i) => i.id !== action.payload.id);
    case "clear":
      return [];
    default:
      return state;
  }
}

export default function App() {
  const [products] = useState(sampleProducts);
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Jumia Clone</h1>
        <button className="px-3 py-1 border rounded">Cart ({cart.length})</button>
      </header>
      <main className="max-w-4xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border rounded p-3 bg-white shadow">
            <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded" />
            <h2 className="font-semibold mt-2">{p.title}</h2>
            <p className="text-sm text-gray-600">{p.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span className="font-bold text-indigo-600">{currency(p.price)}</span>
              <button onClick={() => dispatch({ type: "add", payload: p })} className="bg-indigo-600 text-white px-3 py-1 rounded">Add</button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
