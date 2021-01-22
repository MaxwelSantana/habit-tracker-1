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
        size: PropTypes.number.isRequired,
        numVisibleItems: PropTypes.number.isRequired,
        firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]).isRequired,
        initialRenderIndex: PropTypes.number.isRequired,
        pagingEnabled: PropTypes.bool,
        marginHorizontal: PropTypes.number,
    }

    static defaultProps = {
        data: [],
        marginHorizontal: 0,
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

            console.log({ scrollOffsetsStops })
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
        };
    }

    componentDidMount() {
        setTimeout(() => {
            console.log('componentDidMount()')
            console.log(this.rlv.getCurrentRenderAheadOffset());
            console.log(this.rlv.getContentDimension());
            console.log(this.rlv.getLayout(0));
            console.log(this.rlv.getRenderedSize());
            console.log(this.rlv.getCurrentScrollOffset());
            //console.log(this.rlv.getVirtualRenderer());
            const _virtualRenderer = this.rlv.getVirtualRenderer();

        }, 1);
        //console.log('scrolling...')
        //setTimeout(() => { this.rlv.scrollToIndex(273); }, 1) // scroll view position fix
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
        const { data, } = this.state;

        const visibleStartIndex = all[0];
        const visibleStartDate = data[visibleStartIndex] ? data[visibleStartIndex].date : undefined;

        this.setState({ visibleStartIndex });

        console.log({
            all: all.length,
            visibleStartIndex,
            visibleStartDate: visibleStartDate.format('DD/MM/YYYY'),
            layoutWidth: this.state.layoutWidth,
            numVisibleItems: this.state.numVisibleItems,
            itemWidth: this.state.itemWidth
        });
    }

    onLayout = event => {
        let width = event.nativeEvent.layout.width;
        const diff = Math.abs(this.state.containerWidth - width);
        console.log({ diff });
        this.setState({
            layoutWidth: width,
            diff
        });
    }

    //Given type and data return the view component
    rowRenderer = (type, data) => {
        return (
            <CellContainer
                date={data.date}
                style={styles.cellContainer}
            />
        );
    }

    onMomentumScrollEnd = (event) => {
        const { data, scrollOffsetsStops } = this.state;
        const visibleStartIndex = this.state.visibleStartIndex;
        const offsetX = event.nativeEvent.contentOffset.x;

        const visibleStartDate = data[visibleStartIndex] ? data[visibleStartIndex].date : undefined;
        console.log('onMomentumScrollEnd', this.state.visibleStartIndex, visibleStartDate.format('DD/MM/YYYY'));
        console.log('onMomentumScrollEnd', {
            contentOffset: event.nativeEvent.contentOffset
        });

        if (!scrollOffsetsStops.includes(offsetX)) {
            const closest = scrollOffsetsStops.reduce((a, b) => {
                return Math.abs(b - offsetX) < Math.abs(a - offsetX) ? b : a;
            });
            const index = scrollOffsetsStops.findIndex((item) => item === closest) * 7;
            console.log({ closest, index });
            //this.rlv.scrollToIndex(index, false);
        }
    }

    render() {
        if (!this.state.data || this.state.numDays === 0 || !this.state.itemHeight) {
            return null;
        }

        const pagingProps = this.props.pagingEnabled ? {
            decelerationRate: 0,
            snapToInterval: this.state.containerWidth,
            //snapToOffsets: this.state.scrollOffsetsStops,
            snapToEnd: true,
            snapToStart: false,
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
                    onMomentumScrollEnd={this.onMomentumScrollEnd}
                    canChangeSize={false}
                    renderAheadOffset={2000}
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