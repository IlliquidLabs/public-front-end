import { useCallback, useEffect, useState } from 'react'

import { honeyPrice } from '../honey/utils'


const useHoneyPrice = (earnings: number) => {

    const [price, setPrice] = useState(0)

    const fetchPrice = useCallback(async () => {
        const price = await honeyPrice()
        setPrice(price)

    }, [earnings])

    useEffect(() => {
        fetchPrice()
    }, [setPrice])
        
    return price
}

export default useHoneyPrice