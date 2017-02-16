import React from 'react';


export default class button extends React.Component {

    render() {
        return <a href={this.props.href} target={this.props.target}  className="button">{this.props.children}</a>
    }

}
