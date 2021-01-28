import React, { Component } from "react";
import { View, Text, Dimensions, StyleSheet, PixelRatio } from "react-native";
import { RecyclerListView, DataProvider, LayoutProvider } from "recyclerlistview";
import PropTypes from "prop-types";

export default class Scroller extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        size: PropTypes.number.isRequired,
        numVisibleItems: PropTypes.number.isRequired,
        firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]).isRequired,
        initialRenderIndex: PropTypes.number.isRequired,
        pagingEnabled: PropTypes.bool,
        renderDay: PropTypes.func,
        renderDayParams: PropTypes.object.isRequired,
        onWeekChanged: PropTypes.func,
    }

    static defaultProps = {
        data: [],
        renderDayParams: {},
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
            offsetX: 0,
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
        const {
            data,
            visibleStartDate: _visStartDate,
            visibleEndDate: _visEndDate,
        } = this.state;

        const {
            numVisibleItems,
            onWeekChanged
        } = this.props;

        const visibleStartIndex = all[0];
        const visibleStartDate = data[visibleStartIndex] ? data[visibleStartIndex].date : moment();
        const visibleEndIndex = Math.min(visibleStartIndex + numVisibleItems - 1, data.length - 1);
        const visibleEndDate = data[visibleEndIndex] ? data[visibleEndIndex].date : moment();


        if (!_visStartDate || !_visEndDate ||
            !visibleStartDate.isSame(_visStartDate, "week") ||
            !visibleEndDate.isSame(_visEndDate, "week") ||
            !visibleStartDate.isSame(_visStartDate, "month") ||
            !visibleEndDate.isSame(_visEndDate, "month")) {

            const visStart = visibleStartDate && visibleStartDate.clone();
            const visEnd = visibleEndDate && visibleEndDate.clone();
            onWeekChanged && onWeekChanged(visStart, visEnd);
        }

        this.setState({
            visibleStartDate,
            visibleEndDate,
            visibleStartIndex,
        });
    }

    rowRenderer = (type, data, index, extState) => {
        return this.props.renderDay && this.props.renderDay({ ...data, index, ...extState });
    }

    onScroll = (rawEvent, offsetX, offsetY) => {
        const direction = offsetX > this.state.offsetX ? 'RIGHT' : 'LEFT';
        this.setState({ offsetX });
    }

    applyWindowCorrection = (offsetX, offsetY, windowCorrection) => {
        const value = 1;
        return {
            startCorrection: 0,
            endCorrection: 0,
            windowShift: value,
        }
    }

    scrollToIndex = (index) => {
        this.rlv.scrollToIndex(index, true);
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
                    extendedState={this.props.renderDayParams}
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

