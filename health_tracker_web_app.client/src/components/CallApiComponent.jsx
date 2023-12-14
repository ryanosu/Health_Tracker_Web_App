
function CallApiComponent() {
  return (
    <div className="call-api-component-container">

                <form>
                    <table className="call-api-component-form-container">
                        
                        <td>Name:</td>
                            <input type="text" required></input>

                        <td><button className="call-api-component-button">Search</button></td>
                       
                    </table>
                </form>

        </div>
  )
}

export default CallApiComponent