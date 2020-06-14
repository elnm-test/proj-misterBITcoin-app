import axios from 'axios';
import utilService from '../services/utilService'
export default{
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}

async function getRate(coins){
     var rate = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=1`);
     utilService.saveToLocal('currencyRate', rate.data)
     return (coins / rate.data)

}

async function getMarketPrice(){
    return await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`)
}

async function getConfirmedTransactions(){
    return await axios.get(`https://api.blockchain.info/charts/n-transactions-per-block?timespan=5months&format=json&cors=true`)
}