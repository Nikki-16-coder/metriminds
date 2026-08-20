type KPICardProps = {
  title: string;
  value: string;
};

export default function KPICard({
  title,
  value,
}: KPICardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-sm font-medium text-gray-500">
        {title}
      </h3>

      <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
        {value}
      </p>
    </div>
  );
}