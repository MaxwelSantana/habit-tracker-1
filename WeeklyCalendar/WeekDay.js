import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";

let containerCount = 0;

export default class WeekDay extends Component {

    static propTypes = {
        date: PropTypes.object.isRequired,
        selectedDate: PropTypes.any,
        onDateSelected: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this._containerId = containerCount++;

        this.state = {
            selected: this.isDateSelected(props.date, props.selectedDate),
        }
    }

    componentDidUpdate(prevProps, prevState) {
        let newState = {};
        let updateState = false;
        let hasDateChanged = prevProps.date !== this.props.date;

        if ((this.props.selectedDate !== prevProps.selectedDate) || hasDateChanged) {
            updateState = true;
            newState = {
                selected: this.isDateSelected(this.props.date, this.props.selectedDate),
            }
        }

        if (updateState) {
            this.setState(newState);
        }
    }

    //Function to check if provided date is the same as selected one, hence date is selected
    //using isSame moment query with "day" param so that it check years, months and day
    isDateSelected = (date, selectedDate) => {
        if (!date || !selectedDate) {
            return date === selectedDate;
        }
        return date.isSame(selectedDate, "day");
    }

    render() {
        const { date, index, onDateSelected } = this.props;
        const { selected } = this.state;
        return (
            <TouchableWithoutFeedback onPress={() => onDateSelected(date)}>
                <View
                    style={[styles.cellContainer, selected && styles.selected]} >
                    <Text>{date.format("ddd").toUpperCase()}</Text>
                    <Text>{date.format("DD").toUpperCase()}</Text>
                    <Text>{index}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    cellContainer: {
        flex: 1,
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#00a1f1",
        borderColor: 'black',
        borderWidth: 1
    },
    selected: {
        backgroundColor: 'yellow',
    }
})