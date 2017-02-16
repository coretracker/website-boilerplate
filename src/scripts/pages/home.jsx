import React from 'react';

// Components
import Navbar from '../components/navbar.jsx'

export default class home extends React.Component {

    render() {
        return <section>
            <Navbar />
            <div className="container text-center mt-40">
                <div className="gr-12">
                   <h1>Welcome</h1>
                    <h3>Thanks for using Website Boilerplate</h3>
                </div>
                <div className="gr-12">
                    Bacon ipsum dolor sit amet short loin ad sirloin minim sed laborum pork. <br/>
                    Sunt qui brisket ad, fugiat sirloin ham hock ut eiusmod pancetta in biltong pastrami quis.
                </div>
            </div>
        </section>
    }

}
