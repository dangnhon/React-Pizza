import React from "react"

const PizzaForm = (props) => {
  return(
      <div className="form-row">
        <div className="col-5">
            <input type="text" className="form-control" name="topping" placeholder="Pizza Topping" onChange={props.trackChange} value={
                props.selectedPizza.topping
              }/>
        </div>
        <div className="col">
          <select value={props.selectedPizza.size} className="form-control" name="size" onChange={props.trackChange}>
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input className="form-check-input" type="radio" name="vegetarian" value="Vegetarian" checked={props.selectedPizza.vegetarian} onChange={props.trackChangeVeggie}/>
            <label className="form-check-label">
              Vegetarian
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="radio" name="vegetarian" value="Not Vegetarian" checked={!props.selectedPizza.vegetarian} onChange={props.trackChangeVeggie}/>
            <label className="form-check-label">
              Not Vegetarian
            </label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success" onClick={props.handleUpdate}>Submit</button>
        </div>
      </div>

  )
}

export default PizzaForm
