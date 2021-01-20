import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, PixelRatio } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import PropTypes from "prop-types";

let containerCount = 0;

class CellContainer extends Component {
    constructor(props) {
        super(props);
        this._containerId = containerCount++;
    }

    render() {
        const { date, ...rest } = this.props;
        return (
            <View {...rest}>
                <Text>{date.format("ddd").toUpperCase()}</Text>
                <Text>{date.format("DD/MM").toUpperCase()}</Text>
            </View>
        );
    }
}

export default class Scroller extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        size: PropTypes.number,
        initialRenderIndex: PropTypes.number,
    }

    constructor(props) {
        super(props);

        const { data, size, marginHorizontal } = props;

        const dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        this.updateLayout = (size, marginHorizontal = 0) => {
            const itemHeight = size;
            const itemWidth = itemHeight + marginHorizontal * 2;

            const layoutProvider = new LayoutProvider(
                index => 0, // only 1 view type
                (type, dim) => {
                    // Square, plus horizontal margin
                    dim.width = itemWidth;
                    dim.height = itemHeight;
                }
            );

            return { layoutProvider, itemHeight, itemWidth };
        }

        this.updateDaysData = data => {
            return {
                data,
                numDays: data.length,
                dataProvider: dataProvider.cloneWithRows(data),
            }
        }

        this._rowRenderer = this._rowRenderer.bind(this);

        this.state = {
            ...this.updateLayout(size, marginHorizontal),
            ...this.updateDaysData(data),
            numVisibleItems: 1, // updated in onLayout
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { data, size, marginHorizontal } = this.props;

        let newState = {};
        let updateState = false;

        if (size !== prevProps.size) {
            updateState = true;
            newState = this.updateLayout(size, marginHorizontal);
        }

        if (data !== prevProps.data) {
            updateState = true;
            newState = { ...newState, ...this.updateDaysData(data) };
        }

        console.log('updateState', updateState)
        if (updateState) {
            this.setState(newState);
        }
    }

    _generateArray(n) {
        let arr = new Array(n);
        for (let i = 0; i < n; i++) {
            arr[i] = `wuuo${i}`;
        }
        return arr;
    }

    //Given type and data return the view component
    _rowRenderer(type, data) {
        console.log('data', data)
        return (
            <CellContainer date={data.date} style={styles.container}>
            </CellContainer>
        );
    }

    render() {
        return (
            <RecyclerListView
                layoutProvider={this.state.layoutProvider}
                dataProvider={this.state.dataProvider}
                rowRenderer={this._rowRenderer}
                isHorizontal
                initialRenderIndex={this.props.initialRenderIndex}
            />
        );
    }
}

const styles = StyleSheet.create({
    list: {
        height: 60,
        paddingTop: 200,
        flex: 1
    },
    container: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#00a1f1"
    },
    containerGridLeft: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#ffbb00"
    },
    containerGridRight: {
        justifyContent: "space-around",
        alignItems: "center",
        flex: 1,
        backgroundColor: "#7cbb00"
    }
});