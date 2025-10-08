import CalculatorInput from '../CalculatorInput'

export default function CalculatorInputExample() {
  const handleAddItem = (diameter: number, quantity: number) => {
    console.log('Added:', { diameter, quantity })
  }
  
  return <CalculatorInput mode="bhari" onAddItem={handleAddItem} />
}
