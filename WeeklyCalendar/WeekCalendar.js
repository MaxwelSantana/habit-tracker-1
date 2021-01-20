
import React, { Component } from "react";
import { View, PixelRatio, Text } from "react-native";
import Scroller from './Scroller';
import CalendarStripExample from './CalendarStripExample';
import moment from "moment";

export default class WeekCalendar extends Component {

    constructor(props) {
        super(props);
        this.numDaysScroll = 366;

        const startingDate = this.getInitialStartingDate();
        const selectedDate = this.setLocale(this.props.selectedDate);

        this.state = {
            startingDate,
            selectedDate,
            dateList: [],
            dayComponentWidth: 0,
            numDaysInWeek: 7,
            maxDayComponentSize: 80,
            minDayComponentSize: 10,
            marginHorizontal: 0,
        }

        this.layout = {};
    }

    componentDidUpdate(prevProps, prevState) {
        if (!this.compareDates(prevProps.startingDate, this.props.startingDate)) {
            console.log('componentDidUpdate')
            let _startingDate = this.props.startingDate || this.state.startingDate;

            startingDate = { startingDate: this.setLocale(_startingDate) };
            selectedDate = { selectedDate: this.setLocale(this.props.selectedDate) };
            this.createDays(startingDate.startingDate, selectedDate.selectedDate);
        }
    }

    // Check whether two datetimes are of the same value.  Supports Moment date,
    // JS date, or ISO 8601 strings.
    // Returns true if the datetimes values are the same; false otherwise.
    compareDates = (date1, date2) => {
        if (date1 && date1.valueOf && date2 && date2.valueOf) {
            return moment(date1).isSame(date2, "day");
        } else {
            return JSON.stringify(date1) === JSON.stringify(date2);
        }
    }

    //Function that checks if the locale is passed to the component and sets it to the passed date
    setLocale = date => {
        let _date = date && moment(date);
        if (_date) {
            _date.set({ hour: 12 }); // keep date the same regardless of timezone shifts
            if (this.props.locale) {
                _date = _date.locale(this.props.locale.name);
            }
        }
        return _date;
    }

    getInitialStartingDate = () => {
        if (this.props.startingDate) {
            return this.setLocale(this.props.startingDate);
        } else {
            // Fallback when startingDate isn't provided. However selectedDate
            // may also be undefined, defaulting to today's date.
            let date = this.setLocale(moment(this.props.selectedDate));
            return this.props.useIsoWeekday ? date.startOf("isoweek") : date;
        }
    }

    onLayout = event => {
        if (event.nativeEvent.layout.width === this.layout.width) {
            return;
        }
        if (this.onLayoutTimer) {
            clearTimeout(this.onLayoutTimer);
        }
        this.layout = event.nativeEvent.layout;
        this.onLayoutTimer = setTimeout(() => {
            this.onLayoutDebounce(this.layout);
            this.onLayoutTimer = null;
        }, 100);
    }

    onLayoutDebounce = layout => {
        const {
            numDaysInWeek,
            maxDayComponentSize,
            minDayComponentSize,
        } = this.state;
        const csWidth = PixelRatio.roundToNearestPixel(layout.width);
        let dayComponentWidth = csWidth / numDaysInWeek;
        dayComponentWidth = Math.min(dayComponentWidth, maxDayComponentSize);
        dayComponentWidth = Math.max(dayComponentWidth, minDayComponentSize);

        const marginHorizontal = Math.round(dayComponentWidth * 0.05);
        dayComponentWidth = Math.round(dayComponentWidth * 0.9);

        this.setState({
            dayComponentWidth,
            marginHorizontal
        });
        this.createDays(this.state.startingDate);
        console.log('marginHorizontal', marginHorizontal);
        console.log('dayComponentWidth', dayComponentWidth);
    }

    createDays = (startingDate, selectedDate = this.state.selectedDate) => {
        const {
            numDaysInWeek,
        } = this.props;

        let _startingDate = startingDate;
        let days = [];
        let dateList = [];
        let initialScrollerIndex;
        const numDays = this.numDaysScroll;

        _startingDate = startingDate.clone().subtract(numDays / 2, "days");

        for (let i = 0; i < numDays; i++) {
            let date = this.setLocale(_startingDate.clone().add(i, "days"));

            if (date.isSame(startingDate, "day")) {
                initialScrollerIndex = i;
            }
            dateList.push({ date });
        }

        this.setState({ dateList, initialScrollerIndex });
        console.log('datesList', dateList.length);
        console.log('this.state.dateList', this.state.dateList.length);
    }

    render() {
        return (
            <View>
                <View
                    style={{ height: 60, marginTop: 200 }}
                    onLayout={this.onLayout}>
                    {
                        this.state.dateList.length > 0 ?
                            <Scroller
                                data={this.state.dateList}
                                size={this.state.dayComponentWidth}
                                marginHorizontal={this.state.marginHorizontal}
                                initialRenderIndex={this.state.initialScrollerIndex}
                            /> : <Text>teste menor 0</Text>
                    }
                </View>
                <CalendarStripExample />
            </View>

        );
    }
}