var React = require('react');

var CoordForm = React.createClass({
    getInitialState: function() {
        if(this.props.lon && this.props.lat) {
            return {lat: this.props.lat, lon: this.props.lon};
        }
        return {lat: '', lon: ''};
    },
    changeLon: function(event) {
        this.setState({lon: event.target.value});
    },
    changeLat: function(event) {
        this.setState({lat: event.target.value});
    },
    getWeatherCoord: function() {
        this.props.getWeatherCoord(this.state.lon, this.state.lat);
    },
    render: function() {
        return (
            <tr>
                <td><input type="text" defaultValue={this.state.lon} onChange={this.changeLon}/></td>
                <td><input type="text" defaultValue={this.state.lat} onChange={this.changeLat}/></td>
                <td><input type="button" value="По координатам" onClick={this.getWeatherCoord}/></td>
            </tr>
        );
    }
});

module.exports = CoordForm;