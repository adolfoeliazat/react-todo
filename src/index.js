import React from "react";
import ReactDOM from "react-dom";
import { Route, Router, ReactRouter, RouteHandler, DefaultRoute, State, IndexRoute, IndexLink, Link, Redirect } from 'react-router';


var App = React.createClass({
  render: function () {
    return (
      <div>
        <h1>Simple SPA</h1>
        <ul className="header">
          <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
          <li><Link to="/stuff" activeClassName="active">Stuff</Link></li>
          <li><Link to="/contact" activeClassName="active">Contact</Link></li>
        </ul>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    )
  }
});


var Home = React.createClass({
  render: function () {
    return (
      <div>
        <h2>HELLO</h2>
        <p>Cras facilisis urna ornare ex volutpat, et
          convallis erat elementum.Ut aliquam, ipsum vitae
          gravida suscipit, metus dui bibendum est, eget rhoncus nibh
          metus nec massa.Maecenas hendrerit laoreet augue
          nec molestie.Cum sociis natoque penatibus et magnis
          dis parturient montes, nascetur ridiculus mus.</p>

        <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
      </div>
    );
  }
});

var Contact = React.createClass({
  render: function () {
    return (
      <div>
        <h2>GOT QUESTIONS?</h2>
        <p>The easiest thing to do is post on
          our <a href="http://forum.kirupa.com">forums</a>.
        </p>
      </div>
    );
  }
});

var Stuff = React.createClass({
  render: function () {
    return (
      <div>
        <h2>STUFF</h2>
        <p>Mauris sem velit, vehicula eget sodales vitae,
          rhoncus eget sapien: </p>
        <ol>
          <li>Nulla pulvinar diam</li>
          <li>Facilisis bibendum</li>
          <li>Vestibulum vulputate</li>
          <li>Eget erat</li>
          <li>Id porttitor</li>
        </ol>
      </div>
    );
  }
});




ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="stuff" component={Stuff} />
      <Route path="contact" component={Contact} />

    </Route>
  </Router>,
  document.querySelector("#container")
); 