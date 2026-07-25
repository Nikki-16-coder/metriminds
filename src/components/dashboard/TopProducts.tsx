const products = [
  {
    name: "Laptop Pro X",
    sales: "₹72,000",
  },
  {
    name: "Wireless Mouse",
    sales: "₹41,500",
  },
  {
    name: "Mechanical Keyboard",
    sales: "₹35,900",
  },
];

export default function TopProducts() {
  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-md">
      <h2 className="mb-6 text-xl font-semibold">
        🏆 Top Products
      </h2>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.name}
            className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
          >
            <span className="font-medium">
              {product.name}
            </span>

            <span className="font-bold text-green-600">
              {product.sales}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}