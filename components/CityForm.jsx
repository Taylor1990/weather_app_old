var React = require('react');

var CityForm = React.createClass({
    getInitialState: function () {
        return {textValue: ''};
    },
    componentWillReceiveProps: function(nextData){
        this.setState({textValue: ''});
    },
    addCity: function () {
        // TODO: проверить город регулярным выражением
        this.props.updateCityList(this.state.textValue);
    },
    handlerChange: function (event) {
        this.setState({textValue: event.target.value});
    },
    render: function () {
        return (
            <div>
                <input type="text" value={this.state.textValue} onChange={this.handlerChange}/>
                <input type="button" value="Добавить город" onClick={this.addCity}/>
            </div>
        );
    }
})

module.exports = CityForm;