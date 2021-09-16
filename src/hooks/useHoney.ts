import { useContext } from 'react'
import { Context } from '../contexts/HoneyProvider'

const useHoney = () => {
  const { honey } = useContext(Context)
  return honey
}

export default useHoney
