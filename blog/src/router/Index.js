import React from 'react'
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import App from '../App'
import Home from '@/view/home'

export default class AppRouter extends React.Component{
    render() {
        return (
            <div className="router">
                <Router>
                    <App>
                      <Route exact path='/' component={Home}/>
                    </App>
                </Router>
            </div>
        )
    }
}
