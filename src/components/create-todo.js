import React from 'react';

export default class CreateTodo extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }
    
    renderError() {
        if(!this.state.error) {return null;}
        return <div style={{ color: 'red' }}>{this.state.error}</div>;
    }
    
    render() {
        return (
            <form onSubmit={this.handleCreate.bind(this)}>
                <div className="todoAppTitle">
                    <h2>Be Awesome Today</h2>
                </div>
                <div className="todoAppTask form-inline">
                    <input type="text" className="form-control inputText" placeholder="Save the world" ref="createInput"/>
                    <button className="btnSave"><span className="glyphicon glyphicon-plus" aria-hidden="true"></span></button>
                </div>
                {this.renderError()}
            </form>
        );
    }

    handleCreate(event) {
        event.preventDefault();

        const createInput = this.refs.createInput;
        const task = createInput.value;
        const validateInput = this.validateInput(task);

        if(validateInput) {
            this.setState({ error: validateInput });
            return;
        }

        this.setState( {error: null });
        
        this.props.createTask(task);
        this.refs.createInput.value = '';
    }

    validateInput(task) {
        if(!task) {
            return "Please enter a task";
        } else if(_.find(this.props.todos, todo => todo.task ===task)) {
            return "Task already exists";
        } else {
            return null;
        }
    }
}