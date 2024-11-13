import React, { useEffect } from 'react'
import { ToastIcons, ToastPositionsX, ToastPositionsY } from '../../constants'

const styles = {
  error: 'bg-red-100 border-red-500 text-red-700',
  warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
  info: 'bg-blue-100 border-yellow-500 text-yellow-700',
  success: 'bg-green-100 border-green-500 text-green-700',
}

export type ToastProps = {
  id: number
  title: string
  icon: string
  position: `${keyof typeof ToastPositionsY}-${keyof typeof ToastPositionsX}`
  duration?: number  // optional auto-dismiss
}

export type ToastConfigProps = ToastProps & {
  onClose?: (id: number) => void
}

const Toast: React.FC<ToastConfigProps> = ({ id, title, icon, duration, onClose = () => {} }) => {

  useEffect(() => {
    if (duration) {
      const timer = setTimeout(() => onClose(id), duration)
      return () => clearTimeout(timer)
    }
  }, [id, duration, onClose])

  // Determine the dynamic style based on the icon
  const toastStyle = styles[icon as string as keyof typeof styles]

  return (
    <div
      id={String(id)}
      className={`toast flex flex-auto gap-4 p-4 items-center border-1 rounded-md drop-shadow-md ${toastStyle}`}
      role='alert'
    >
      <span className='toast-icon inline-block text-2xl'>{ToastIcons[icon as keyof typeof ToastIcons]}</span>
      <span className='toast-title'>{title}</span>
      <button onClick={() => onClose(id)} className='toast-close text-2xl'>✖️</button>
      {duration && (
        <div
          className="toast-countdown w-full absolute bottom-0 left-0 h-1 bg-current transition-all"
          style={{
            animation: `countdown ${duration}ms linear forwards`,
          }}
        ></div>
      )}
    </div>
  )
}

export default Toast
