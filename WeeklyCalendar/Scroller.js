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
        const { date, index, ...rest } = this.props;
        return (
            <View {...rest}>
                <Text>{date.format("ddd").toUpperCase()}</Text>
                <Text>{date.format("DD").toUpperCase()}</Text>
                <Text>{index}</Text>
            </View>
        );
    }
}

export default class Scroller extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        size: PropTypes.number.isRequired,
        numVisibleItems: PropTypes.number.isRequired,
        firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]).isRequired,
        initialRenderIndex: PropTypes.number.isRequired,
        pagingEnabled: PropTypes.bool,
    }

    static defaultProps = {
        data: [],
    };

    constructor(props) {
        super(props);

        this.timeoutResetPositionId = null;

        const { data, size, numVisibleItems } = props;

        const dataProvider = new DataProvider((r1, r2) => {
            return r1 !== r2;
        });

        this.updateLayout = (size) => {
            const itemHeight = size;
            const itemWidth = size;

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

        this.updateContainer = (numVisibleItems, size) => {
            const containerWidth = size * numVisibleItems;
            return { containerWidth, numVisibleItems };
        }

        this.updateScrollOffsetsStops = (data, numVisibleItems, size) => {
            const numStops = data.length / numVisibleItems;

            const scrollOffsetsStops = [...Array(numStops)]
                .map((_, idx) =>
                    (idx * (numVisibleItems * size)));

            return { scrollOffsetsStops };
        }

        this.updateDaysData = (data) => {
            return {
                data,
                numDays: data.length,
                dataProvider: dataProvider.cloneWithRows(data),
            };
        }

        this._rowRenderer = this.rowRenderer.bind(this);

        this.state = {
            ...this.updateLayout(size),
            ...this.updateContainer(numVisibleItems, size),
            ...this.updateDaysData(data),
            ...this.updateScrollOffsetsStops(data, numVisibleItems, size),
            scroll: { offsetX: 0, offsetY: 0 },
        };
    }

    componentDidUpdate(prevProps, prevState) {
        const { data, size, numVisibleItems } = this.props;
        let newState = {};
        let updateState = false;

        if (size !== prevProps.size) {
            updateState = true;
            newState = this.updateLayout(size);
        }

        if (size !== prevProps.size || numVisibleItems !== prevProps.numVisibleItems) {
            updateState = true;
            newState = { ...newState, ...this.updateContainer(numVisibleItems, size) };

            if (data !== prevProps.data)
                newState = { ...newState, ...this.updateScrollOffsetsStops(data, numVisibleItems, size) }
        }

        if (data !== prevProps.data) {
            updateState = true;
            newState = { ...newState, ...this.updateDaysData(data) };
        }

        if (updateState) {
            this.setState(newState);
        }
    }

    onVisibleIndicesChanged = (all, now, notNow) => {
        const { data, scroll } = this.state;

        const visibleStartIndex = all[0];
        const visibleStartDate = data[visibleStartIndex] ? data[visibleStartIndex].date : undefined;

        this.setState({ visibleStartIndex });
        console.log({
            all: all.length,
            visibleStartIndex,
            visibleStartDate: visibleStartDate.format('DD/MM/YYYY'),
            offsetX: scroll.offsetX
        });
    }

    rowRenderer = (type, data, index) => {
        return (
            <CellContainer
                date={data.date}
                index={index}
                style={styles.cellContainer}
            />
        );
    }

    onScroll = (rawEvent, offsetX, offsetY) => {
        this.setState({ scroll: { offsetX, offsetY } });
    }

    applyWindowCorrection = (offsetX, offsetY, windowCorrection) => {
        const value = 1;
        return {
            startCorrection: 0, 
            endCorrection: 0, 
            windowShift: value,
        }
    }

    render() {
        if (!this.state.data || this.state.numDays === 0 || !this.state.itemHeight) {
            return null;
        }

        const pagingProps = this.props.pagingEnabled ? {
            decelerationRate: 0,
            snapToOffsets: this.state.scrollOffsetsStops,
        } : {};

        return (
            <View
                style={{
                    height: this.state.itemHeight,
                    width: this.state.containerWidth,
                }}
                onLayout={this.onLayout}
            >
                <RecyclerListView
                    ref={rlv => this.rlv = rlv}
                    layoutProvider={this.state.layoutProvider}
                    dataProvider={this.state.dataProvider}
                    rowRenderer={this.rowRenderer}
                    isHorizontal
                    initialRenderIndex={this.props.initialRenderIndex}
                    onVisibleIndicesChanged={this.onVisibleIndicesChanged}
                    scrollViewProps={{
                        showsHorizontalScrollIndicator: false,
                        ...pagingProps,
                    }}
                    onScroll={this.onScroll}
                    canChangeSize={false}
                    applyWindowCorrection={this.applyWindowCorrection}
                />
            </View>
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
    }
})