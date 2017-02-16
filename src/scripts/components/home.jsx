import React from 'react';

export default class home extends React.Component {

    render() {
        return <section>
            <div class="container">
                <div class="gr-4">
                    I'm the header, 12 columns width
                </div>
                <div class="gr-4">
                    I'm the content, 8 columns width, but 12 on mobile
                </div>
                <div class="gr-4">
                    I'm the sidebar, 4 columns width, but 12 on mobile
                </div>
            </div>
        </section>
    }

}