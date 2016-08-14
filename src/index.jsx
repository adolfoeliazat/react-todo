import React from "react";
import ReactDOM from "react-dom";

import CreateTodo from './components/create-todo.js';
import TodosList from './components/todos-list.js';

import './styles/myStyle.scss';

import { Route, Router, ReactRouter, RouteHandler, DefaultRoute, State, IndexRoute, IndexLink, Link, Redirect } from 'react-router';

function loadJSON()
{
    var xhr = new XMLHttpRequest();
    var data;
    var arr = [];

    xhr.onreadystatechange = function ()
    {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                data = JSON.parse(xhr.responseText);
            }
        }
    };
    xhr.open("GET", 'https://spreadsheets.google.com/feeds/list/1xTPGQW3yftKYlNUKT7xjZl780hzQYTyBJq4-XSmohtY/od6/public/basic?alt=json', false);
    xhr.send();

    for (var i = 0; i < data.feed.entry.length; i++) {

        var x = data.feed.entry[i]['content']['$t'].split(':');
        var isCompletedVar;

        if(x[1].toLowerCase() === " true") {
            isCompletedVar = true;
        } else {isCompletedVar = false;}

        arr.push({
            task: data.feed.entry[i]['title']['$t'],
            isCompleted: isCompletedVar
        });
    }
    return arr;
}

var todos = loadJSON();

export default class App extends React.Component {
    constructor(props) {
        super(props); //connects to parent??

        this.state = {
            todos
        }
    }

    render() {
        return (
            <div>
                <div className="container-fluid titleDiv">
                    <h1>Simple To Do App</h1>
                    <p>This is a simple to-do list app powered by React and Google Spreadsheets.
                        <br/>Made with &hearts; by <a href="http://twitter.com/ilove_chowking"><strong>@ilove_chowking</strong></a> and a little help from <a href="http://twitter.com/XValhallaCoderX"><strong>@XValhallaCoderX</strong></a>.
                    </p>
                </div>
                <div className="todoDiv">
                    <CreateTodo 
                        todos={this.state.todos}
                        createTask={this.createTask.bind(this)}
                    />
                    <TodosList
                        todos={this.state.todos}
                        toggleTask={this.toggleTask.bind(this)}
                        saveTask={this.saveTask.bind(this)}
                        deleteTask={this.deleteTask.bind(this)}
                    />
                </div>
            </div>
        );
    }

    toggleTask(task) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === task);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        this.setState({ todos: this.state.todos });
    }

    createTask(task) {
        this.state.todos.push({
            task,
            isCompleted: false
        });
        this.setState({ todos: this.state.todos });
    }

    saveTask(oldTask, newTask) {
        const foundTodo = _.find(this.state.todos, todo => todo.task === oldTask);
        foundTodo.task = newTask;
        this.setState({ todos: this.state.todos });
    }

    deleteTask(taskToDelete) {
        _.remove(this.state.todos, todo => todo.task === taskToDelete);
        this.setState({ todos: this.state.todos });
    }
};

ReactDOM.render(<App/>,document.querySelector("#app")
); 