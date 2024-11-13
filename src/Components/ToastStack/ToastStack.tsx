import React from 'react'
import Toast, { ToastConfigProps, ToastProps } from '../Toast/Toast'

export type ToastStackProps = {
  toasts: ToastProps[]
  position: ToastConfigProps["position"]
  onClose: ToastConfigProps["onClose"]
}

const ToastStack: React.FC<ToastStackProps> = ({ toasts, position, onClose }: ToastStackProps) => {

  return (
    <ul className={`toast-stack ${position}`}>
      {toasts.map(toast => (
        <li key={toast.id}>
          <Toast {...toast} onClose={onClose} />
        </li>
      ))}
    </ul>
  )
}

export default ToastStack
