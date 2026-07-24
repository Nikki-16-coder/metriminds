type KPICardProps = {
  title: string;
  value: string;
};

export default function KPICard({
  title,
  value,
}: KPICardProps) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md border border-gray-200">
      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-bold">
        {value}
      </p>
    </div>
  );
}