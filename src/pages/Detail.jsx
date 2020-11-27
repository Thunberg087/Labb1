

const Detail = ({ location }) => {
  return (
    <p>{location.state.amount} {location.state.queryCurrency}  is equal to {location.state.calculatedAmount} {location.state.clickedCurrency} </p>
  )
}



export default Detail