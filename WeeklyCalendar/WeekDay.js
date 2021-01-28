import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import PropTypes from "prop-types";
import DefaultText from '../Shared/DefaultText';

let containerCount = 0;

export default class WeekDay extends Component {

    static propTypes = {
        date: PropTypes.object.isRequired,
        selectedDate: PropTypes.any,
        onDateSelected: PropTypes.func.isRequired,
        contentSize: PropTypes.number,
    }

    constructor(props) {
        super(props);
        this._containerId = containerCount++;

        this.state = {
            selected: this.isDateSelected(props.date, props.selectedDate),
            contentSize: props.contentSize,
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

        if (this.props.size !== prevProps.size) {
            updateState = true;
            newState = {
                contentSize: this.props.contentSize,
                ...newState,
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
        const { date, index, onDateSelected, contentSize } = this.props;
        const { selected } = this.state;

        const size = contentSize / 2;

        const dayBox = { 
            height: size, 
            width: size,
            borderColor: 'yellow',
            borderRadius: size / 2,
            justifyContent: 'center',
            alignItems: 'center',
        };

        const selectedColor = {
            color: '#E9EAFA'
        };
        
        const selectedDayBorder = {
            borderWidth: 1,
        };

        return (
            <TouchableWithoutFeedback onPress={() => onDateSelected(date)}>
                <View style={styles.cellContainer}>
                    <DefaultText style={[styles.styleTexts, selected && selectedColor]}>
                        {date.format("ddd").toUpperCase()}
                    </DefaultText>
                    <View style={[dayBox, selected && selectedDayBorder]}>
                        <DefaultText style={[styles.styleTexts, selected && selectedColor]}>
                            {date.format("DD").toUpperCase()}
                        </DefaultText>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    cellContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'space-between',
    },
    styleTexts: {
        color: '#647482',
        fontWeight: '100',
    },
})