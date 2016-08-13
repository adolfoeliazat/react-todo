import React from 'react';

export default class TodosListHeader extends React.Component {
    render() {
        return (
            <div>
                <div className="col-lg-6"><h3>Tasks</h3></div>
                <div className="col-lg-6"><h3>Action</h3></div>
            </div>
        );
    }
}