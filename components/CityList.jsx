var React = require('react');
var CityItem = require('./CityItem.jsx');

var CityList = React.createClass({
    getInitialState: function () {
        return ({citiesList: this.props.citiesList});
    },
    componentWillReceiveProps: function(nextData){
        this.setState({citiesList: nextData.citiesList});
    },
    deleteCity: function (cityName) {
        var citiesList = this.state.citiesList;

        citiesList.splice(citiesList.indexOf(cityName), 1);
        localStorage.setItem('cities', citiesList.join());

        if (citiesList.length) {
            this.setState({'citiesList': citiesList});
        } else {
            this.setState({'citiesList': []});
        };
    },
    render: function () {
        return (
            <ul>
                {
                    this.state.citiesList.map(function (item) {
                        return (<CityItem title={item} key={item} queryCity={this.props.queryCity}
                                          deleteCity={this.deleteCity}/>)
                    }, this)
                }
            </ul>
        );
    }
})

module.exports = CityList;