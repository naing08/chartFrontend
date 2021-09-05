import React from 'react';
import { Chart } from "react-google-charts";

class Home extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            barData: [],
            pieData: [],
            name: '',
            age: 0,
            gender: 'M'
        };
    }

    componentDidMount() {
        this.fetchPieData();
        this.fetchBarData();
    }

    nameChangeHandler = (event) => {
        this.setState({ name: event.target.value });
    }

    ageChangeHandler = (event) => {
        this.setState({ age: event.target.value });
    }

    genderChangeHandler = (event) => {
        this.setState({ gender: event.target.value });
    }

    fetchPieData() {
        let pieData = [['Gender', 'Ratio']];
        fetch('http://localhost:3030/pie')
            .then(response => response.json())
            .then(data => {
                data.forEach(({ Gender, Ratio }) => {
                    pieData.push([Gender, Ratio]);
                });
                this.setState({ pieData });
            });
    }

    fetchBarData() {
        let barData = [['AgeGroup', 'Count']];
        fetch('http://localhost:3030/bar')
            .then(response => response.json())
            .then(data => {
                data.forEach(({ AgeGroup, Count }) => {
                    barData.push([AgeGroup, Count]);
                });
                this.setState({ barData });
            });
    }

    saveData() {
        let { name, age, gender } = this.state;
        fetch('http://localhost:3030/chart', {
            method: 'POST',
            body: JSON.stringify({ Name: name, Age: age, Gender: gender }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then(json => {
                this.fetchPieData();
                this.fetchBarData();
                this.setState({ name: "", age: 0, gender: "M" })
            });
    }

    render() {
        let { name, age, gender } = this.state;
        return (
            <div>
                <h3>Chart</h3>
                <div>
                    <span style={{width:"100px"}}>Name :</span>                    
                    <input type="text" value={name} onChange={this.nameChangeHandler} />
                    <br />
                    <span style={{width:"100px"}}>Age :</span>
                    <input type="number" value={age} onChange={this.ageChangeHandler} />
                    <br />
                    <span style={{width:"100px"}}>Gender :</span>
                    <input type="text" value={gender} onChange={this.genderChangeHandler} />
                    <br />
                    <button name="save" onClick={this.saveData.bind(this)} >Save</button>
                </div>
                <div className="row" style={{display:"flex"}}>
                    <div style={{width:"50%",marginLeft:"20px",alignItems:'center'}}>
                        <h3 style={{textAlign:'center'}}>Pie Chart</h3>
                        <Chart
                            width={'auto'}
                            height={'auto'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.pieData}
                            options={{
                                title: 'Gender Ratio',
                            }}
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </div>
                    <div style={{width:"50%",marginLeft:"20px"}}>
                        <h3>Bar Chart</h3>
                        <Chart
                            width={'500px'}
                            height={'300px'}
                            chartType="BarChart"
                            loader={<div>Loading Chart</div>}
                            data={this.state.barData}
                            options={{
                                title: 'Population of Largest U.S. Cities',
                                chartArea: { width: '50%' },
                                hAxis: {
                                    title: 'Number Of People',
                                    minValue: 0,
                                },
                                vAxis: {
                                    title: 'Age Group',
                                },
                            }}
                            // For tests
                            rootProps={{ 'data-testid': '1' }}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;