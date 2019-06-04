import React from "react";
import { render } from "react-dom"

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker, DateRange } from "react-date-range";

import locale from 'date-fns/locale/th';

type Range = {
    startDate: Date
    endDate: Date
    key: string
}

type State = {
    ranges: Range[]
}

export class App extends React.Component<{}, State> {

    constructor(props) {
        super(props)
        this.state = {
            ranges: [
                {
                    startDate: new Date(),
                    endDate: new Date(),
                    key: "selection"
                }
            ]
        }
    }

    handleSelect = (ranges) => {
        this.setState({ ranges: [ranges.selection] })
    }

    render() {
        return (
            <DateRange
                locale={locale}
                rangedCalendars={false}
                ranges={this.state.ranges}
                onChange={this.handleSelect}
            />
        )
    }
}

render(<App />, document.getElementById("root"))