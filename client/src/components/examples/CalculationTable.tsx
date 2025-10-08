import CalculationTable from '../CalculationTable'

export default function CalculationTableExample() {
  const items = [
    { id: '1', diameter: 8, quantity: 10, mode: 'bhari' as const },
    { id: '2', diameter: 16, quantity: 5, mode: 'bhari' as const },
    { id: '3', diameter: 20, quantity: 100, mode: 'bars' as const },
  ]
  
  return (
    <CalculationTable 
      items={items} 
      basePrice={50000} 
      onRemoveItem={(id) => console.log('Remove:', id)} 
    />
  )
}
