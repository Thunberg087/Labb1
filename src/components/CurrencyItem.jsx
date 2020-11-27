import { useHistory } from "react-router-dom";


const CurrencyItem = ({ name, value, amount, queryCurrency }) => {
  const history = useHistory();

  let calculatedAmount = (value * amount).toFixed(3)

  return (
    <div onClick={() => {
      history.push("/detail", { queryCurrency, clickedCurrency: name, amount, calculatedAmount });
    }}
      style={{ background: '#eaeaea', borderRadius: 5, margin: 10, padding: '10px 20px', textAlign: 'center', cursor: 'pointer' }}>
      <p>{name}</p>
      <p>{calculatedAmount}</p>
    </div>
  )
}


export default CurrencyItem