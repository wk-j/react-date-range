import React from "react";
import { render } from "react-dom"

export class App extends React.Component<{}, {}> {

    render() {
        return (
            <h1>Hello</h1>
        )
    }

}

render(<App />, document.getElementById("root"))