import React, { useMemo, useState } from 'react'
import { ToastProps, ToastConfigProps } from '../Toast/Toast'
import ToastForm from '../ToastForm'
import ToastStack from '../ToastStack'

const ToastManager: React.FC = () => {
  const [toasts, setToasts] = useState<ToastConfigProps[]>([])

  /**
   * manages all toasts from all stacks
   * @param toastConfig toast props
   * could be a reducer hook too
   */
  const addToast = (toastConfig: ToastProps) => {
    setToasts([...toasts, toastConfig])
  }

  /**
   * removes a single toast from its stack
   * @param id toast unique identifier
   * could be a reducer hook too
   */
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  /**
   * Group toasts by position for rendering
   */
  const groupedToasts = useMemo(() => {
    return toasts.reduce<Record<string, ToastConfigProps[]>>((groups, toast) => {
      const position = toast.position;
      if (!groups[position]) {
        groups[position] = [];
      }
      groups[position].push(toast);
      return groups;
    }, {});
  }, [toasts]);

  console.log(`>>>>`, groupedToasts)

  return (
    <div className="toast-manager">
      {/* Form to add new Toasts */}
      <ToastForm onAdd={addToast} />
      {/* Stacks of toasts grouped by position */}
      {Object.entries(groupedToasts).map(([position, positionToasts]) => (
        <ToastStack
          key={position}
          position={position as ToastConfigProps["position"]}  // Pass position to determine styling
          toasts={positionToasts}
          onClose={removeToast}
        />
      ))}
    </div>
  )
}

export default ToastManager


