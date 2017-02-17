import contentful from 'contentful'

import React from 'react';

// Components
import Navbar from '../components/navbar.jsx'
import Button from '../components/button.jsx'

export default class blog extends React.Component {

    constructor() {
        super();
        this.state = {
            posts: [],
            loaded: false
        }
    }

    componentWillMount() {
        var SPACE_ID = '04t8h1o9ulsz'
        var ACCESS_TOKEN = 'de9159cd355d569bf118e724e83741004ce9130108a7a3bc7d8eff076f7b711f'

        var client = contentful.createClient({
            // This is the space ID. A space is like a project folder in Contentful terms
            space: SPACE_ID,
            // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
            accessToken: ACCESS_TOKEN
        })
        client.getEntries()
            .then(function (response) {
                this.setState({posts: response.items, loaded: true});
                console.log(this.state.posts)
            }.bind(this))
            .catch((error) => {
                console.log('\x1b[31merror occured')
                console.log(error)
            })
    }

    render() {
        return <section>
            <Navbar />
            <div className="container text-center mt-40">
                <h1>Blog</h1>

                {this.state.posts.map(function (entry) {
                    return (<div key={entry.sys.id}><Post entry={entry} /></div>)
                })}
            </div>
        </section>
    }

}

class Post extends React.Component {

    render() {
        return <div className="gr-12">
            <h3>{ this.props.entry.fields.title }</h3>
            <p>{ this.props.entry.fields.shortDescription }</p>
            <p>{ this.props.entry.fields.body }</p>
            <p>{ this.props.entry.fields.biography }</p>
        </div>

    }

}
