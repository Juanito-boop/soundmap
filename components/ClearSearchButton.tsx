import { Button } from "@/components/ui/button"

type ClearSearchButtonProps = {
  onClear: () => void
}

export function ClearSearchButton({ onClear }: ClearSearchButtonProps) {
  return (
    <div className="mt-8 text-center">
      <Button onClick={onClear} variant="outline">
        Clear Search
      </Button>
    </div>
  )
}

