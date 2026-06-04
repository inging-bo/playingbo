import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

type InputProps = React.ComponentProps<"input"> & {
  /** 값이 있을 때 오른쪽에 전체 삭제 버튼 표시 */
  clearable?: boolean
}

function Input({
  className,
  type,
  clearable,
  value,
  onChange,
  disabled,
  readOnly,
  ...props
}: InputProps) {
  const showClear =
    clearable &&
    !disabled &&
    !readOnly &&
    value != null &&
    String(value).length > 0

  const handleClear = () => {
    onChange?.({
      target: { value: "" },
      currentTarget: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>)
  }

  const field = (
    <InputPrimitive
      type={type}
      data-slot="input"
      value={value}
      onChange={onChange}
      disabled={disabled}
      readOnly={readOnly}
      className={cn(
        "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        showClear && "pr-8",
        className
      )}
      {...props}
    />
  )

  if (!clearable) {
    return field
  }

  return (
    <div data-slot="input-group" className="relative w-full min-w-0">
      {field}
      {showClear ? (
        <button
          type="button"
          tabIndex={-1}
          aria-label="입력 지우기"
          onClick={handleClear}
          className="absolute top-1/2 right-1.5 flex size-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-3.5" />
        </button>
      ) : null}
    </div>
  )
}

export { Input }
