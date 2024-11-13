import React, { useCallback, useEffect, useRef, useState } from 'react'
import { ToastIcons, ToastPositionsX, ToastPositionsY } from '../../constants'
import { ToastConfigProps } from '../Toast/Toast'
import { debounce } from '../../utils'
import styles from './styles'
import { getPositionOptions } from './utils'

export type ToastFormProps = {
  onAdd?: (toast: ToastConfigProps) => void
}

const ToastForm: React.FC<ToastFormProps> = ({ onAdd }) => {

  const [title, setTitle] = useState<string>("")
  const [debouncedTitle, setDebouncedTitle] = useState<string>("")
  const [icon, setIcon] = useState<string>(ToastIcons.error)
  const [positionY, setPositionY] = useState<ToastPositionsY>(ToastPositionsY.bottom)
  const [positionX, setPositionX] = useState<ToastPositionsX>(ToastPositionsX.left)

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

  const onSubmit = useCallback((event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault()
    onAdd?.({
      id: Date.now(),
      title: debouncedTitle,
      icon,
      position: `${positionY}-${positionX}`
    })
    setTitle("")
  }, [debouncedTitle, icon, positionY, positionX, onAdd])

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
              {Object.entries(ToastIcons).map((icon: string[]) => (
                <option key={icon[0]} value={icon[0]} title={icon[0]}>{icon[1]}</option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit" className={styles.button.primary}>Show Toast</button>
      </form>
    </div>
  )
}

export default ToastForm
