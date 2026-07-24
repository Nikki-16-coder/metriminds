import KPICard from "./KPICard";

export default function KPICards() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">

      <KPICard
        title="Revenue"
        value="₹214,100"
      />

      <KPICard
        title="Profit"
        value="₹50,100"
      />

      <KPICard
        title="Margin"
        value="23.40%"
      />

    </div>
  );
}