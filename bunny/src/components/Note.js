import React from 'react';
import {Helmet} from "react-helmet";


export default class Note extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Hiren-Notes: Note</title>
                </Helmet>
                Note
            </div>
        );
    }
}