import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderTaskSection() {
        const { task, isCompleted } = this.props;

        const taskStyle = {
            color: isCompleted? 'green' : 'red',
            cursor: 'pointer'
        };

        if(this.state.isEditing) {
            return (
                <div className="col-lg-6">
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input type="text" defaultValue={task} ref="editInput"/>
                    </form>
                </div>
            );
        }

        return (
            <div className="col-lg-6"
                style={taskStyle}
                onClick={this.props.toggleTask.bind(this, task)}
            >
                {task}
                <br/>
            </div>
        );
    }

    renderActionsSection() {
        if(this.state.isEditing) {
            return (
                <div className="col-lg-6">
                    <button className="btn btn-success glyphicon glyphicon-ok-sign" onClick={this.onSaveClick.bind(this)}></button>
                    <button className="btn btn-warning glyphicon glyphicon-remove-sign" onClick={this.onCancelClick.bind(this)}></button>
                </div>
            );
        }

        return (
            <div className="col-lg-6">
                <button className="btn btn-primary glyphicon glyphicon-edit" onClick={this.onEditClick.bind(this)}></button>
                <button className="btn btn-danger glyphicon glyphicon-trash" onClick={this.props.deleteTask.bind(this, this.props.task)}></button>
            </div>
        );
    }
    
    render() {
        return (
            <div className="taskRow">
                {this.renderTaskSection()}
                {this.renderActionsSection()}
            </div>
        );
    }

    onEditClick() {
        this.setState({ isEditing: true });
    }

    onCancelClick() {
        this.setState({ isEditing: false });
    }
    onSaveClick(event) {
        event.preventDefault();

        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);

        this.setState({ isEditing: false });
    }
}