import React from 'react';


export default class navbar extends React.Component {

    render() {
        return <section>
            <div className="navbar">
                <div className="container">
                    <div className="gr-4">
                        <ul>
                            <li>
                                Website Boilerplate
                            </li>
                        </ul>

                    </div>
                    <div className="gr-8">
                        <ul className="pull-right menu">
                            <li>
                                <a href="/#/">Welcome</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    }

}