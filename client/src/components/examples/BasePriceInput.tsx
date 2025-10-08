import { useState } from 'react'
import BasePriceInput from '../BasePriceInput'

export default function BasePriceInputExample() {
  const [basePrice, setBasePrice] = useState(50000)
  
  return <BasePriceInput basePrice={basePrice} onBasePriceChange={setBasePrice} />
}
