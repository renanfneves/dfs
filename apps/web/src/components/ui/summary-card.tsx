import { CircleCheckBig } from 'lucide-react'

interface SummaryCardProps {
  title: string
  value: string
}
export function SummaryCard({ title, value }: SummaryCardProps) {
  return (
    <div className="relative w-full space-y-1 rounded-md border px-4 py-1">
      <h3 className="text-sm font-light">{title}</h3>
      <p className="font-medium">{value}</p>
      <CircleCheckBig
        size={15}
        className="absolute right-2 top-2 text-green-500"
      />
    </div>
  )
}
