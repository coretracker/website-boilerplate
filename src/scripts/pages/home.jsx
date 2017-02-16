import React from 'react';

// Components
import Navbar from '../components/navbar.jsx'
import Button from '../components/button.jsx'

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
                    <div className="mt-30">
                        <Button href="https://github.com/coretracker/website-boilerplate" target="_blank">Github</Button>
                    </div>
                </div>
            </div>
        </section>
    }

}
