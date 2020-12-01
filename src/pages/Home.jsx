import { useEffect, useState } from "react";
import axios from 'axios'
import { Formik } from 'formik';

import CurrencyItem from "../components/CurrencyItem";

import { useContext } from 'react'
import Context from './../contexts/Context'

const Home = () => {

  const initCurrencyValue = useContext(Context)


  const [queryCurrency, setQueryCurrency] = useState('USD')
  const [conversionRatesDropdown, setConversionRatesDropdown] = useState([])
  const [conversionRates, setConversionRates] = useState([])

  useEffect(() => {

    axios.get('https://v6.exchangerate-api.com/v6/e3bff0be5dabd157960ea887/latest/USD')
      .then(res => {
        console.log(res.data);
        setConversionRates(res.data.conversion_rates)
        setConversionRatesDropdown(res.data.conversion_rates)
      })


  }, [])

  useEffect(() => {

    axios.get('https://v6.exchangerate-api.com/v6/e3bff0be5dabd157960ea887/latest/' + queryCurrency)
      .then(res => {
        setConversionRates(res.data.conversion_rates)
      })


  }, [queryCurrency])


  return (
    <div>
      <Formik
        initialValues={{ amount: initCurrencyValue, }}
        validate={values => {
          const errors = {};

          if (isNaN(Number(values.amount))) {
            errors.amount = 'Please enter a valid number';
          }

          return errors;
        }}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
        }) => (
            <>
              <form onSubmit={handleSubmit}>
                <input
                  type="number"
                  name="amount"
                  value={values.amount}
                  onChange={handleChange}
                />
                <select name="queryCurrency" id="queryCurrency" onChange={event => {
                  setQueryCurrency(event.target.value)
                }}>
                  {conversionRatesDropdown &&

                    Object.entries(conversionRatesDropdown)
                      .map(([key]) => {
                        return (
                          <option key={key} value={key}>
                            {key}
                          </option>
                        )
                      })

                  }
                </select>
                {errors.amount}
              </form>
              {values.amount ? (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                  {Object.entries(conversionRates)
                    .map(([key, value]) => {
                      return (
                        <CurrencyItem key={key} name={key} value={value} amount={values.amount} queryCurrency={queryCurrency} />
                      )
                    })}
                </div>
              ) : (
                  <p>Enter a number</p>
                )}

            </>
          )}

      </Formik>
    </div>
  )
}



export default Home