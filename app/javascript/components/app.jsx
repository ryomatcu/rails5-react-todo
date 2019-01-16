import React from 'react';
import Header from './header';
import TaskForm from './task-form';
import TaskTable from './task-table';

import { Container } from 'reactstrap';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
        }

        this.getTasks = this.getTasks.bind(this);
    }

    componentDidMount() {
        this.getTasks()
    }

    getTasks() {
        let request = new Request('/api/v1/tasks', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });

        fetch(request).then(function (response) {
            return response.json();
        }).then(function (tasks) {
            this.setState({
                tasks: tasks
            });
        }.bind(this)).catch(function (error) {
            console.error(error);
        });
    }

    render() {
        const { tasks } = this.state;

        return (
            <div>
                <Header title='Rails5 + webpacker + React + Reactstrap Example' />
                <Container>
                    <TaskForm getTasks={this.getTasks} />
                    <TaskTable tasks={tasks} getTasks={this.getTasks} />
                </Container>
            </div>
        )
    }
}

export default App;