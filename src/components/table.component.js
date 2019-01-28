import React from 'react';
import axios from 'axios';

import ReactTable from "react-table";
import "react-table/react-table.css";
import _ from "lodash"



export default class TableTrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      datas:[],
      data: [],
      pages: null,
      loading: true
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    //M S http://www.mocky.io/v2/5c4f099e3100007800c41fe5
    //S http://www.mocky.io/v2/5c4f0abc310000d01fc41ff1
    //M http://www.mocky.io/v2/5c4f0c8e3100000b20c41ff8
    let d1=[];
    let d2=[];
    this.interval = setInterval( () => {
    axios.get('http://localhost:9000/api/orderbook/BTC')
      .then(res => {
       // console.log(res.data);
       d1=[res.data];
       d2=[res.data];
      this.setState({ datas: d1 });
       this.setState({ data: d2});
      })
   },1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  requestData = (pageSize, page, sorted, filtered) => {
    return new Promise((resolve, reject) => {

      let filteredData = this.state.datas;
  
      if (filtered.length) {
        filteredData = filtered.reduce((filteredSoFar, nextFilter) => {
          return filteredSoFar.filter(row => {
            return (row[nextFilter.id] + "").includes(nextFilter.value);
          });
        }, filteredData);
      }
      const sortedData = _.orderBy(
        filteredData,
        sorted.map(sort => {
          return row => {
            if (row[sort.id] === null || row[sort.id] === undefined) {
              return -Infinity;
            }
            return typeof row[sort.id] === "string"
              ? row[sort.id].toLowerCase()
              : row[sort.id];
          };
        }),
        sorted.map(d => (d.desc ? "desc" : "asc"))
      );
  
      const res = {
        rows: sortedData.slice(pageSize * page, pageSize * page + pageSize),
        pages: Math.ceil(filteredData.length / pageSize)
      };
  
      setTimeout(() => resolve(res), 500);
    });
  };
  

  fetchData(state, instance) {
    this.setState({ loading: true });
    this.requestData(
      state.pageSize,
      state.page,
      state.sorted,
      state.filtered
    ).then(res => {
      this.setState({
        data: res.rows,
        pages: res.pages,
        loading: false
      });
    });
  }

  render() {
    const { datas, data, pages, loading } = this.state;
    return (
      <div>
        <ReactTable
          columns={[
            {
              Header: "TICKER",
              accessor: "ticker"
            },
            {
              Header: "LAST PRICE",
              accessor: "lastPrice"
            },
            {
              Header: "BID",
              accessor: "bid"
            },
            {
              Header: "Ask",
              accessor: "ask"
            },
            {
              Header: "LOW",
              accessor: "low"
            },
            {
              Header: "High",
              accessor: "high"
            },
            {
              Header: "Volume",
              accessor: "volume"
            }
          ]}
          manual 
          data={data}
          pages={pages} 
          loading={loading} 
          onFetchData={this.fetchData} 
          filterable
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}