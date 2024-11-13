import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ToastIcons, ToastPositionsX, ToastPositionsY } from '../../constants'
import { ToastConfigProps } from '../Toast/Toast'
import { debounce } from '../../utils'
import styles from './styles'
import { getPositionOptions } from './utils'

export type ToastFormProps = {
  onAdd?: (toast: ToastConfigProps) => void
}

const formDefaults = {
  title: '',
  icon: 'error',
  positionY: ToastPositionsY.top,
  positionX: ToastPositionsX.left,
  duration: "",
}

const ToastForm: React.FC<ToastFormProps> = ({ onAdd }) => {

  const [title, setTitle] = useState<string>(formDefaults.title)
  const [debouncedTitle, setDebouncedTitle] = useState<string>(formDefaults.title)
  const [icon, setIcon] = useState<string>(formDefaults.icon)
  const [positionY, setPositionY] = useState<ToastPositionsY>(formDefaults.positionY)
  const [positionX, setPositionX] = useState<ToastPositionsX>(formDefaults.positionX)
  const [duration, setDuration] = useState<string>(formDefaults.duration)
  
  const durations = Array.from({ length: 10 }, (_, i) => (i + 1) * 1000)

  const debouncedSetTile = useRef(debounce((value: string) => {
    setDebouncedTitle(value)
  }))
  const onChangeTitle = (event: React.SyntheticEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const onChangePositionY = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setPositionY(event.currentTarget.value as ToastPositionsY)
  }

  const onChangePositionX = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setPositionX(event.currentTarget.value as ToastPositionsX)
  }

  const onChangeIcon = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setIcon(event.currentTarget.value)
  }

  const onChangeDuration = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    setDuration(event.currentTarget.value)
  }

  const resetForm = () => {
    setTitle(formDefaults.title)
    setIcon(formDefaults.icon)
    setPositionY(formDefaults.positionY)
    setPositionX(formDefaults.positionX)
    setDuration(formDefaults.duration)
  }

  const onSubmit = useCallback((event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAdd?.({
      id: Date.now(),
      title: debouncedTitle,
      icon,
      position: `${positionY}-${positionX}`,
      duration: duration ? Number(duration) : undefined,
    })
    resetForm()
  }, [debouncedTitle, icon, positionY, positionX, duration, onAdd])

  useEffect(() => debouncedSetTile.current(title), [title])

  return (
    <div className="toast-form">
      <h3 className='mb-2'>Configurations</h3>
      <form onSubmit={onSubmit}>
        <div className={styles.form}>
          <label className={styles.label}>
            <span className={styles.title}>
              Toast Title
            </span>
            <input
              type="text"
              value={title}
              className={styles.input.text}
              placeholder='Welcome to Algochurn!'
              onChange={onChangeTitle}
              required
            />
          </label>
          <label className={styles.label}>
            <span className={styles.title}>
              Position
            </span>
            <select
              value={positionY}
              onChange={onChangePositionY}
              className={styles.select}
            >
              {getPositionOptions(Object.values(ToastPositionsY))}
            </select>
            <select
            value={positionX}
            onChange={onChangePositionX}
              className={styles.select}
            >
              {getPositionOptions(Object.values(ToastPositionsX))}
            </select>
          </label>
          <label className={styles.label}>
            <span className={styles.title}>
              Icon
            </span>
            <select
              value={icon}
              onChange={onChangeIcon}
              className={styles.select}
            >
              {Object.entries(ToastIcons).map(([key, label]) => (
                <option key={key} value={key} title={key}>{label}</option>
              ))}
            </select>
          </label>
          <label className={styles.label}>
            <span className={styles.title}>
              Duration
            </span>
            <select
              onChange={onChangeDuration}
              className={styles.select}
              value={duration}
            >
              <option value="">∞</option>
              {durations.map((duration, index) => {
                const label = `${duration / 1000} second${!index ? '' : 's'}`
                return (
                  <option key={duration} value={duration} title={label}>{label}</option>
                )
              })}
            </select>
          </label>
        </div>
        <button type="submit" className={styles.button.primary}>Show Toast</button>
      </form>
    </div>
  )
}

export default ToastForm
