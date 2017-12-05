import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import './ListCoins.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';
import history from '../../history';
import ListCoinActionsBoard from "../List/ListCoinActionsBoard";
import  {APP_SERVER_URI, IMG_SERVER_BASE} from '../../config/config';
const percentChangeDropdownOptions = ["24h", "1h", "7d"];

export default class ListCoins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinDropdownVisible: false,
      percentChangeDropdownVisible: false,
      currentPercentChangeSelection: "24h",
    };
    this.sortByName = this.sortByName.bind(this);
    this.sortByRank = this.sortByRank.bind(this);
    this.onListCoinComponentClick = this.onListCoinComponentClick.bind(this);
    this.onSearchComponentClick = this.onSearchComponentClick.bind(this);
    this.percentChangeSelection = this.percentChangeSelection.bind(this);
    this.renderCaret = this.renderCaret.bind(this);
    this.renderEmptyCaret = this.renderEmptyCaret.bind(this);
    this.onPercentChangeOptionClicked = this.onPercentChangeOptionClicked.bind(this);
  }

  componentWillMount() {
   this.props.fetchCoinListData(1);
  }

  onPercentChangeOptionClicked(currentOption) {
    this.setState({currentPercentChangeSelection: currentOption});
  }

  renderEmptyCaret = (direction, fieldName) => {
    return (<div>&nbsp;</div>)
  }
  renderCaret = (direction, fieldName) => {
    if (direction === 'asc') {
      return (
        <div>
        <span className="caret-marker gainer-marker"><i className="fa fa-caret-up"/></span>
        </div>
      );
    }
    if (direction === 'desc') {
      return (
        <div>
        <span className="caret-marker loser-marker"><i className="fa fa-caret-down"/></span>
        </div>
      );
    }
    return (
      <div>
        <span className="caret-marker gainer-marker"><i className="fa fa-caret-up"/></span>
        <span className="caret-marker loser-marker"><i className="fa fa-caret-down"/></span>
      </div>
    );
  }
  sortByName(a, b, order, c, d) {
    if (order === "desc") {
      return a.symbol.toLowerCase() - b.symbol.toLowerCase();
    } else {
      return b.symbol.toLowerCase() - a.symbol.toLowerCase();
    }
  }

  percentChangeSelection(event) {
    event.stopPropagation();
    this.setState({percentChangeDropdownVisible: true});
  }

  sortByRank(a, b, order) {
    if (a.rank && b.rank) {
      if (order === "desc") {
        return parseInt(a.rank) - parseInt(b.rank);
      } else {
        return parseInt(b.rank) - parseInt(a.rank);
      }
    }
    return -1;
  }

  onListCoinComponentClick(event) {
    if (event.target.id !== "coin-search-textbox" || event.target.id !== "coin-search-dropdown") {
      this.setState({coinDropdownVisible: false});
    }
    if (event.target.id !== "percent-change-list" || event.target.id !== "percent-change-selection-button") {
       this.setState({percentChangeDropdownVisible: false});
    }
  }

  onSearchComponentClick() {
    this.setState({coinDropdownVisible: true});
  }

 render() {
   const {coins} = this.props;
   const self = this;
   const tableStyles  = {
     tdStyle: {
       padding: "6px 2px 0x 2px"
     },
     nameCellStyle: {
       padding: "6px 2px 0x 2px"
     },
     metrictdStyle: {
       width: "200%"
     },
     "coinPercentChangeHeaderStyle": {
       paddingLeft: "0px"
     },
     smallSymbolCell: {
       width: "40px"
     }
   }
   let coinList = Object.keys(coins.coinsList).map(function(key){
      return coins.coinsList[key];
   });

   const coinSymbolFormatter = function(cell, row) {
     const baseURI = "https://www.cryptocompare.com";
     return (
     <div>
       <div className="row-half-slot">
         <img src={`${baseURI}/${row.imageurl}`} className="coin-logo-small"/>
       </div>
       <div className="row-half-slot">
         <span className="row-right-item left-right-top">{row.symbol}</span>
         <span className="row-right-item right-item-bottom">&nbsp;</span>
       </div>
     </div>);
   }

   const coinPriceFormatter = function(cell, row) {
     return (
       <div className="table-row-item">
         <div className="table-row-item-small table-padding-6">
           BTC: <span className="table-row-item-value">{row.price_btc}</span>
         </div>
         <div className="table-row-item-small table-padding-6">
           USD: <span className="table-row-item-value">{row.price_usd}&nbsp;$</span>
         </div>
      </div>)
   }
   const coinPercentChangeFormatter = function(cell, row) {
     return (
       <div className="table-row-item">
         <div className="table-row-item-small table-padding-4">Hour:&nbsp;
           <span className={Number(row.percent_change_1h) < 0 ? "ticker-red" : "ticker-green"}>
             {row.percent_change_1h} %</span>
         </div>
         <div className="table-row-item-small table-padding-4">Day:&nbsp;
           <span className={Number(row.percent_change_24h) < 0 ? "ticker-red" : "ticker-green"}>
             {row.percent_change_24h} %
           </span>
         </div>
         <div className="table-row-item-small table-padding-4">Week:&nbsp;
           <span className={Number(row.percent_change_7d) < 0 ? "ticker-red" : "ticker-green"}>
             {row.percent_change_7d} %
           </span>
         </div>
       </div>
     )
   }
   const coinVolumeFormatter = function(cell, row) {
     return (
       <div>
         {row['24h_volume_usd'] ? row['24h_volume_usd'] : row['daily_volume_usd']}
       </div>
     )
   }
   const getCoinDetailPage = function(row) {
     history.push('/token/'+row.symbol+"/home");
   }

   const coinNameFormatter = function(cell, row) {
     return (
       <div className="table-row-item">
         <div className="table-row-item-small table-padding-4">Full Name: <span>{row.fullname}</span></div>
         <div className="table-row-item-small table-padding-4">Algorithm: <span>{row.algorithm}</span></div>
         <div className="table-row-item-small table-padding-4">Proof Type: <span>{row.prooftype}</span></div>
       </div>
     )
   }

   const coinSupplyFormatter = function(cell, row) {
     return (
       <div className="table-row-item">
         <div className="table-row-item-small table-padding-6">
           Current:  {row.available_supply}
         </div>
         <div className="table-row-item-small table-padding-6">
           Total: {row.total_supply}
         </div>
       </div>
     )
   }
   const coinMetricFormatter = function(cell, row) {
     let IMG_SERVER_URI = IMG_SERVER_BASE + "/"+row.symbol+".png";
     return <img src={IMG_SERVER_URI} className="chart-image-format" />
   }

   const coinCondensedSymbolFormatter = function(cell, row) {
     const baseURI = "https://www.cryptocompare.com";
    return (
      <div>
        <div className="row-half-slot">
          <img src={`${baseURI}/${row.imageurl}`} className="coin-logo-extra-small"/>
        </div>
        <div>
          <span className="row-right-item left-right-top">{row.symbol}</span>
        </div>
      </div>
    )
   }

   const percentChangeSort = function(a,b, order) {
     let currentChangeSelector = self.state.currentPercentChangeSelection;
     let selection = "";
     if (currentChangeSelector === "24h") {
       selection = "percent_change_24h";
     } else if (currentChangeSelector === "7d") {
       selection = "percent_change_7d";
     } else if (currentChangeSelector === "1h") {
       selection = "percent_change_1h";
     }
     if (order === "asc") {
       return  Number(b[selection]) - Number(a[selection]);
     } else {
       return Number(a[selection]) - Number(b[selection]);
     }
   }

   const volumeSortFunc = function(a, b, order) {
     if (order === "desc") {
       return Number(a.daily_volume_usd) - Number(b.daily_volume_usd);
     } else {
       return  Number(b.daily_volume_usd) - Number(a.daily_volume_usd);
     }
   }

   let listCoins = <span/>;
   let condensedListCoins = <span/>;
   const selectRow = {
     onSelect: getCoinDetailPage,
     mode: 'radio',
     hideSelectColumn: true,
     clickToSelect: true
   }
   let percentChangeDropdown = <span/>;
   if (this.state.percentChangeDropdownVisible) {
     let currentOptions =
       percentChangeDropdownOptions.map(function(pecentChangeItem){
       if (pecentChangeItem !== self.state.currentPercentChangeSelection) {
         return pecentChangeItem;
       } else {
         return null;
       }
     }).filter(Boolean);

     percentChangeDropdown =
       <ul className="percent-change-list" id="percent-change-list">
        {currentOptions.map(function(option){
          return (
            <li onClick={() => self.onPercentChangeOptionClicked(option)}>
              {option}
            </li>
         )
        })}</ul>;
   }

   if (coinList && coinList.length > 0) {
     listCoins =
       <BootstrapTable data={coinList} selectRow={selectRow} >
         <TableHeaderColumn dataField="id" isKey={true} hidden={true}/>
         <TableHeaderColumn dataField="symbol" dataFormat={coinSymbolFormatter}
                            tdStyle={tableStyles.tdStyle} dataSort={true}
                            sortFunc={this.sortByRank} caretRender={ this.renderCaret }>
           Symbol
         </TableHeaderColumn>
         <TableHeaderColumn dataField="name" dataFormat={coinNameFormatter}
                            tdStyle={tableStyles.tdStyle} caretRender={ this.renderCaret }
                            dataSort={true}>
           Name
         </TableHeaderColumn>
         <TableHeaderColumn dataField="price_usd" dataFormat={coinPriceFormatter}
                            tdStyle={tableStyles.tdStyle} caretRender={ this.renderCaret }
                            dataSort>Price</TableHeaderColumn>
         <TableHeaderColumn dataField="percent_change_24h" dataFormat={coinPercentChangeFormatter}
                            tdStyle={tableStyles.tdStyle} dataSort headerAlign='left'
                            thStyle={tableStyles.coinPercentChangeHeaderStyle}
                            sortFunc={percentChangeSort} caretRender={ this.renderCaret }>
           <div className="label-1">
           % Change
           </div>
           <div className="percent-change-dropdown-container" id="percent-change-dropdown-container">
             <div className="btn btn-default percent-change-current-selection"
                  onClick={this.percentChangeSelection} id="percent-change-selection-button">
               {this.state.currentPercentChangeSelection} <i className="fa fa-caret-down"/>
             </div>
             {percentChangeDropdown}
           </div>
         </TableHeaderColumn>
         <TableHeaderColumn dataField="daily_volume_usd" dataFormat={coinVolumeFormatter}
                            tdStyle={tableStyles.tdStyle} dataSort
                            sortFunc={volumeSortFunc} caretRender={ this.renderCaret }>
           Volume
         </TableHeaderColumn>
         <TableHeaderColumn dataField="total_supply" dataFormat={coinSupplyFormatter}
                            tdStyle={tableStyles.tdStyle} dataSort caretRender={ this.renderCaret }>
           Supply
         </TableHeaderColumn>
         <TableHeaderColumn columnClassName={"cell-metric-column"} dataFormat={coinMetricFormatter}
                            tdStyle={tableStyles.metrictdStyle} caretRender={ this.renderEmptyCaret } >
           Chart
         </TableHeaderColumn>
       </BootstrapTable>;

     condensedListCoins =
       <BootstrapTable data={coinList} selectRow={selectRow} >
       <TableHeaderColumn dataField="id" isKey={true} hidden={true}/>
       <TableHeaderColumn dataField="symbol" dataFormat={coinCondensedSymbolFormatter}
        dataSort={true} tdStyle={tableStyles.smallSymbolCell}
        sortFunc={this.sortByRank} caretRender={ this.renderCaret }>
        Symbol
        </TableHeaderColumn>

       <TableHeaderColumn dataField="price_usd" dataFormat={coinPriceFormatter}
          caretRender={ this.renderCaret }
          dataSort>Price</TableHeaderColumn>
        <TableHeaderColumn dataField="percent_change_24h" dataFormat={coinPercentChangeFormatter}
          dataSort thStyle={tableStyles.coinPercentChangeHeaderStyle}
          sortFunc={percentChangeSort} caretRender={ this.renderCaret }>
        <div className="label-1">
         % Change
        </div>
        <div className="percent-change-dropdown-container" id="percent-change-dropdown-container">
          <div className="btn btn-default percent-change-current-selection"
            onClick={this.percentChangeSelection} id="percent-change-selection-button">
            {this.state.currentPercentChangeSelection} <i className="fa fa-caret-down"/>
          </div>
          {percentChangeDropdown}
        </div>
        </TableHeaderColumn>
         <TableHeaderColumn columnClassName={"cell-metric-column"} dataFormat={coinMetricFormatter}
                        tdStyle={tableStyles.smallMetrictdStyle} caretRender={ this.renderEmptyCaret } >
       Chart
     </TableHeaderColumn>
   </BootstrapTable>

   }

   return (
     <div onClick={this.onListCoinComponentClick}>
       <ListCoinActionsBoard {...this.props} onSearchComponentClick={this.onSearchComponentClick}
                             dropdownVisible={this.state.coinDropdownVisible}/>
        <div className="coin-list-container">
          <div className="hidden-xs">
            {listCoins}
          </div>
          <div className="visible-xs">
            {condensedListCoins}
          </div>
        </div>
     </div>
   )
 }
}