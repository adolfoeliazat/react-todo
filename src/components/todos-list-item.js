import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderCheckedSection() {
        const { task, isCompleted } = this.props;

        if(isCompleted) {
            return (
                <span className="glyphicon glyphicon-ok checkIcon" aria-hidden="true"></span>
            );
        }

        return (
            <span className="glyphicon glyphicon-unchecked checkIcon" aria-hidden="true"></span>
        );
    }

    renderTaskSection() {
        const { task, isCompleted } = this.props;

        const taskStyle = {
            color: isCompleted? '#bcbcbc' : '#666666',
            cursor: 'pointer'
        };

        if(this.state.isEditing) {
            return (
                <div className="taskText">
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input className="form-control txtEdit" type="text" defaultValue={task} ref="editInput"/>
                    </form>
                </div>
            );
        }

        return (
            <span
                className="taskText"
                style={taskStyle}
                onClick={this.props.toggleTask.bind(this, task)}
            >
                {task}
                <br/>
            </span>
        );
    }

    renderActionsSection() {
        if(this.state.isEditing) {
            return (
                <div className="actions text-center">
                    <button className="btnAction btnColorSave" onClick={this.onSaveClick.bind(this)}><span className="glyphicon glyphicon-ok-sign" aria-hidden="true"></span></button>
                    <button className="btnAction btnColorCancel" onClick={this.onCancelClick.bind(this)}><span className="glyphicon glyphicon-remove-sign" aria-hidden="true"></span></button>
                </div>
            );
        }

        return (
            <div className="actions text-center">
                <button className="btnEdit btnAction" onClick={this.onEditClick.bind(this)}><span className="glyphicon glyphicon-edit" aria-hidden="true"></span></button>
                <button className="btnTrash btnAction" onClick={this.props.deleteTask.bind(this, this.props.task)}><span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
            </div>
        );
    }
    
    render() {
        return (
            <div className="todoAppTask">
                <div className="check text-center">
                    {this.renderCheckedSection()}
                </div>
                {this.renderActionsSection()}
                {this.renderTaskSection()}
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