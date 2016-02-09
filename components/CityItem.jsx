var React = require('react');

var CityItem = React.createClass({
    queryCity: function (event) {
        var title = event.target.parentElement.textContent;
        this.props.queryCity(title);
    },
    deleteCity: function (event) {
        var title = event.target.parentElement.textContent;
        this.props.deleteCity(title);
    },
    render: function () {
        return (
            <li>
                <div onClick={this.queryCity}>{this.props.title}</div>
                <input type="button" value="Удалить" onClick={this.deleteCity}/>
            </li>
        );
    }
});

module.exports = CityItem;