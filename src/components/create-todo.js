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
                <div className="col-lg-6">
                    <input type="text" placeholder="Lez do thiz" ref="createInput" className="form-control"/>
                </div>
                <div className="col-lg-6">
                    <button className="btn btn-success">Save</button>
                </div>
                <br/><br/><br/>
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