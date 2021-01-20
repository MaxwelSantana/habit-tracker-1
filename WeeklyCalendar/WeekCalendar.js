
import React, { Component } from "react";
import { View, PixelRatio } from "react-native";
import Scroller from './Scroller';
import CalendarStripExample from './CalendarStripExample';

export default class WeekCalendar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            dateList: this._generateArray(100),
            dayComponentWidth: 0,
            numDaysInWeek: 7,
            maxDayComponentSize: 80,
            minDayComponentSize: 10,
            marginHorizontal: 0,
        }

        this.layout = {};
    }

    _generateArray(n) {
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = `wuuo${i}`;
        }
        return arr;
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
        console.log('marginHorizontal', marginHorizontal);
        console.log('dayComponentWidth', dayComponentWidth);
    }

    createDays = (startingDate, selectedDate = this.state.selectedDate) => {

    }

    render() {
        return (
            <View>
                <View
                    style={{ height: 60, marginTop: 200 }}
                    onLayout={this.onLayout}>
                    <Scroller
                        data={this.state.dateList}
                        size={this.state.dayComponentWidth}
                        marginHorizontal={this.state.marginHorizontal}
                    />
                </View>
                <CalendarStripExample />
            </View>

        );
    }
}