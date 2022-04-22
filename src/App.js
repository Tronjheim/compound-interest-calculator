import {useState} from 'react'
import {Formik, Form} from 'formik'
import *as Yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'

const compoundInterest = (deposit, contribution,years,rate) =>{
  let total=deposit

  for(let i=0; i<years; i++){
   total = (total + contribution) * (rate+1)
  }
  return Math.round(total)
}
const formatter= new Intl.NumberFormat('en-US',{
  style:'currency',
  currency:'USD',
  minimumFractionDigits:2,
  maximumFractionDigits:2,
})
function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({ deposit, contribution, years, rate }) => {
    const val = compoundInterest(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }
  return (
    <Container>
      <Section>
        <Formik
        initialValues={{
          deposit:'',
          contribution:'',
          years:'',
          rate:'',
        }}
        onSubmit={handleSubmit}
        validationSchema={Yup.object({
          deposit: Yup.number().required('Obligatory').typeError('Must be a number'),
          contribution: Yup.number().required('Obligatory').typeError('Must be a number'),
          years: Yup.number().required('Obligatory').typeError('Must be a number'),
          rate: Yup.number().required('Obligatory').typeError('Must be a number').min(0).max(4),
        })}
        >
          <Form>
            <Input name="deposit" label="Initial deposit"/>
            <Input name="contribution" label="Anual contribution"/>
            <Input name="years" label="Years"/>
            <Input name="rate" label="Stimate rate"/>
            <Button type="submit">Calculate</Button>
          </Form>
        </Formik>
        {balance !=='' ? <Balance>Final balance: {balance}</Balance>:null}
      </Section>
    </Container>
  )
}

export default App
