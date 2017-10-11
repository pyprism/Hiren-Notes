import React from 'react';
import {Helmet} from "react-helmet";

export default class Notes extends React.Component {
    render() {
        return (
            <div>
                <Helmet>
                    <title>Hiren-Notes: All Notes</title>
                </Helmet>
                Notes
            </div>
        );
    }
}