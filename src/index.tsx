import React from "react";
import { render } from "react-dom"

import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRangePicker, DateRange } from "react-date-range";
import classnames from 'classnames';

import locale from 'date-fns/locale/th';
import { generateStyles } from "./utils";
import coreStyles from "./styles"

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

    renderMonthAndYear = (focusedDate, changeShownDate, props) => {
        const { showMonthArrow, locale, minDate, maxDate, showMonthAndYearPickers } = props;
        //const upperYearLimit = (maxDate || Calendar.defaultProps.maxDate).getFullYear();
        //const lowerYearLimit = (minDate || Calendar.defaultProps.minDate).getFullYear();
        const upperYearLimit = (maxDate).getFullYear();
        const lowerYearLimit = (minDate).getFullYear();
        const styles = generateStyles([coreStyles, props.classNames]);
        return (
            <div onMouseUp={e => e.stopPropagation()} className={styles.monthAndYearWrapper}>
                {showMonthArrow ? (
                    <button
                        type="button"
                        className={classnames(styles.nextPrevButton, styles.prevButton)}
                        onClick={() => changeShownDate(-1, 'monthOffset')}>
                        <i />
                    </button>
                ) : null}
                {showMonthAndYearPickers ? (
                    <span className={styles.monthAndYearPickers}>
                        <span className={styles.monthPicker}>
                            <select
                                value={focusedDate.getMonth()}
                                onChange={e => changeShownDate(e.target.value, 'setMonth')}>
                                {locale.localize.months().map((month, i) => (
                                    <option key={i} value={i}>
                                        {month.replace("มกราคาม", "มกราคม")}
                                    </option>
                                ))}
                            </select>
                        </span>
                        <span className={styles.monthAndYearDivider} />
                        <span className={styles.yearPicker}>
                            <select
                                value={focusedDate.getFullYear()}
                                onChange={e => changeShownDate(e.target.value, 'setYear')}>
                                {new Array(upperYearLimit - lowerYearLimit + 1)
                                    .fill(upperYearLimit)
                                    .map((val, i) => {
                                        const year = val - i;
                                        return (
                                            <option key={year} value={year}>
                                                {year + 543}
                                            </option>
                                        );
                                    })}
                            </select>
                        </span>
                    </span>
                ) : (
                        <span className={styles.monthAndYearPickers}>
                            {locale.localize.months()[focusedDate.getMonth()]} {focusedDate.getFullYear()}
                        </span>
                    )}
                {showMonthArrow ? (
                    <button
                        type="button"
                        className={classnames(styles.nextPrevButton, styles.nextButton)}
                        onClick={() => changeShownDate(+1, 'monthOffset')}>
                        <i />
                    </button>
                ) : null}
            </div>
        );
    }


    handleSelect = (ranges) => {
        this.setState({ ranges: [ranges.selection] })
    }

    render() {
        return (
            <DateRange
                locale={locale}
                maxDate={new Date(2020, 10, 10)}
                minDate={new Date(2000, 10, 10)}
                navigatorRenderer={this.renderMonthAndYear}
                ranges={this.state.ranges}
                onChange={this.handleSelect}
            />
        )
    }
}

render(<App />, document.getElementById("root"))