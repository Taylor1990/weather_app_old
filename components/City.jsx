var React = require('react');
var CityForm = require('./CityForm.jsx');
var CityList = require('./CityList.jsx');

var City = React.createClass({
    getInitialState: function () {
        return {citiesList: this.props.citiesList};
    },
    updateCityList: function (cityName) {
        var citiesList = this.state.citiesList;
        citiesList.push(cityName);
        localStorage.setItem('cities', citiesList.join())
        this.setState({'citiesList': citiesList, cityText: ''});
    },
    render: function () {
        return (
            <div>
                <CityForm cityText={this.state.cityText} updateCityList={this.updateCityList}/>
                <CityList queryCity={this.props.queryCity} citiesList={this.state.citiesList}/>
            </div>
        );
    }
});

module.exports = City;