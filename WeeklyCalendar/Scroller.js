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
                <Text>{date.format("DD").toUpperCase()}</Text>
            </View>
        );
    }
}

export default class Scroller extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        size: PropTypes.number,
        marginHorizontal: PropTypes.number,
        initialRenderIndex: PropTypes.number,
        pagingEnabled: PropTypes.bool,
        firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
    }

    static defaultProps = {
        data: [],
        marginHorizontal: 0,
    };

    constructor(props) {
        super(props);

        this.timeoutResetPositionId = null;

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

        this._rowRenderer = this.rowRenderer.bind(this);

        this.state = {
            ...this.updateLayout(size, marginHorizontal),
            ...this.updateDaysData(data),
            numVisibleItems: 1, // updated in onLayout
            layoutWidth: 1,
            visibleStartIndex: 0,
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

        if (updateState) {
            this.setState(newState);
        }
    }

    onVisibleIndicesChanged = (all, now, notNow) => {
        const { data, } = this.state;

        const visibleStartIndex = all[0];
        const visibleStartDate = data[visibleStartIndex] ? data[visibleStartIndex].date : undefined;

        this.setState({ visibleStartIndex });
        console.log({
            all0:all[0],
            now,
            all: all.length,
            visibleStartDate: visibleStartDate.format('DD/MM/YYYY'),
            layoutWidth: this.state.layoutWidth,
            numVisibleItems: this.state.numVisibleItems,
            itemWidth: this.state.itemWidth
        });
    }

    changeIndiceToStartWeekDay = (visibleStartIndex) => {
        if (this.shifting)
            return;

        const { data, } = this.state;
        const { firstDayOfWeek } = this.props;

        const visibleStartDate = data[visibleStartIndex] ? data[visibleStartIndex].date : undefined;
        const weekday = visibleStartDate ? visibleStartDate.weekday() : 0;
        const diffDays = firstDayOfWeek - weekday;

        if (diffDays > 0) {
            //this.shifting = true;
            this.rlv.scrollToIndex(visibleStartIndex - diffDays, false);
            /*
            this.timeoutResetPositionId = setTimeout(() => {
                this.timeoutResetPositionId = null;
                this.rlv.scrollToIndex(visibleStartIndex - diffDays, false);
                this.shifting = false; // debounce
            }, 800);*/
        }
    }


    onLayout = event => {
        let width = event.nativeEvent.layout.width;
        this.setState({
            layoutWidth: width,
            numVisibleItems: Math.round(width / this.state.itemWidth),
        });
    }

    //Given type and data return the view component
    rowRenderer = (type, data) => {
        return (
            <CellContainer
                date={data.date}
                style={[
                    {
                        flex: 1,
                        justifyContent: "space-around",
                        alignItems: "center",
                        backgroundColor: "#00a1f1",
                        margin: this.props.marginHorizontal
                    }
                ]}
            />
        );
    }

    onMomentumScrollEnd = (event) => {
        const { data, } = this.state;
        const visibleStartIndex = this.state.visibleStartIndex;

        const visibleStartDate = data[visibleStartIndex] ? data[visibleStartIndex].date : undefined;

        console.log('onMomentumScrollEnd', this.state.visibleStartIndex, visibleStartDate.format('DD/MM/YYYY'));
        //this.changeIndiceToStartWeekDay(this.state.visibleStartIndex);
    }

    render() {
        if (!this.state.data || this.state.numDays === 0 || !this.state.itemHeight) {
            return null;
        }

        const pagingProps = this.props.pagingEnabled ? {
            decelerationRate: 0,
            snapToInterval: this.state.itemWidth * this.state.numVisibleItems,
        } : {};

        return (
            <View
                style={{
                    height: this.state.itemHeight,
                    flex: 1,
                    paddingLeft: 1,
                    paddingRight: 1
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
                        ...pagingProps
                    }}
                    onMomentumScrollEnd={this.onMomentumScrollEnd}
                />
            </View>
        );
    }
}