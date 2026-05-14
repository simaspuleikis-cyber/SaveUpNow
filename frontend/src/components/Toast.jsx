import { useApp } from '../context/AppContext'

export default function Toast() {
  const { state } = useApp()
  const { toast } = state

  if (!toast) return null

  return (
    <div className={`toast show toast-${toast.type}`} role="status" aria-live="polite">
      {toast.msg}
    </div>
  )
}
