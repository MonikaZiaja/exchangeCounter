const Cash = (props) => {
    var value = (props.cash/props.ratio * props.price).toFixed(2)
    return(

        <div className ={`${props.class}`}><p className = 'currency__title'>{props.title}</p> <p> {props.cash <= 0 ? "" : value}</p> </div>
    )
}

class ExchangeCounter extends React.Component {
    state = {
        amount: "",
        product: "electricity"
    }
    static defaultProps = {

    
    currencies : [
        {
            id: 0,
            name: 'zloty',
            ratio: 1,
            title: 'Wartość w złotych: ',
            class : 'currency currency--zloty'
        },
        {
            id: 1,
            name: 'dollar',
            ratio: 3.6,
            title: 'Wartość w dolarach: ',
            class : 'currency currency--dollar'
        },
        {
            id: 2,
            name: 'euro',
            ratio: 4.1,
            title: 'Wartość w euro: ',
            class : 'currency currency--euro'
        },
        {
            id: 3,
            name: 'pound',
            ratio: 4.55,
            title: 'Wartość w funtach: ',
            class : 'currency currency--pound'
        }
    ],
    prices:{
        electricity: .51,
        gas: 5.65,
        oranges: 4.79,
    }
    
}
    handleChange = e => {
        this.setState({
            amount: e.target.value
        })
    }
    handleSelect = e => {
        this.setState({
            product: e.target.value,
            amount:"",
        })
    }
    insertSuffix(select){
        if(select ==="electricity") return <em>kWh</em>
        if(select ==="gas") return <em>litrów</em>
        if(select ==="oranges") return <em>kg</em>
        else return null
    }
    selectPrice(select){
        return this.props.prices[select]
    }
    render(){
        const {amount, product} = this.state
        const price = this.selectPrice(product)
        const calculators = this.props.currencies.map(currency => (
            <Cash class={`${currency.class}`} key = {currency.id} ratio = {currency.ratio} title = {currency.title} 
            cash = {amount} price = {price}/>
        ))
        return (
            <div className = 'app'>
            <div className = 'box__selection'>
            <label className = 'selection__title' >Wybierz produkt:
                <select className = 'input__select--transparent' value = {this.state.product} 
                onChange={this.handleSelect}>
                    <option className = 'option__select--transparent'  value="electricity">prąd</option>
                    <option className = 'option__select--transparent' value="gas">benzyna</option>
                    <option className = 'option__select--transparent' value="oranges">pomarańcze</option>
                </select>

            </label>
            <br/>
                <label>
                    <input className = 'input__input--transparent' type="number" value = {this.state.amount} onChange = {this.handleChange} />
                <p className = 'selection__title'>{this.insertSuffix(this.state.product)}</p>
                </label>
                </div>
                <div className = 'box__currencies'>

               {calculators}
                </div>

            </div>
        )
    }
}
ReactDOM.render(<ExchangeCounter />, document.getElementById('root'))