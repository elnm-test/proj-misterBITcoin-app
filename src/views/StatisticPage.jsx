import React, { Component } from 'react'
import BITcoinService from '../services/BitcoinService'
import Chart from '../components/Chart'

export default class StatisticPage extends Component {
    state = {
        valuesMarketPrice: [],
        valuesTransactions: []
    }

    componentDidMount() {
        var valuesMarket = [];
        var valuesTrans = [];
        BITcoinService.getMarketPrice()
            .then((data) => data.data.values.forEach((val) => {
                valuesMarket.push(parseInt(val.y))
            }))
            .then(() => this.setState({ valuesMarketPrice: valuesMarket }
            ))
        BITcoinService.getConfirmedTransactions()
            .then((data) => data.data.values.forEach((val) => {
                valuesTrans.push(parseInt(val.y))
            }))
            .then(() => this.setState({ valuesTransactions: valuesTrans }
            ))
    }

    render() {
        return (
            <section className="chartsPage">
                <div className="charts-header flex row center">
                    <h1 className="title">Market Statistic</h1>
                </div>
                <div className="charts-content container flex column center">
                    <div className="wrapper flex column center">
                        <h2>Market Price</h2>
                        <Chart className="chart" type="market" chartData={this.state.valuesMarketPrice.slice(0, 100)} />
                    </div>
                    <div className="wrapper flex column center">
                        <h2>Confirmed Transactions Per Day</h2>
                        <Chart className="chart" type="trans" chartData={this.state.valuesTransactions.slice(0, 50)} />
                    </div>
                </div>
            </section>
        )
    }
}