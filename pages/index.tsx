import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";
import { Input } from "semantic-ui-react";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface State {
  total: number;
  voted: number;
}

class Home extends React.Component<{}, State> {
  constructor(props: State) {
    super(props);
    this.state = {
      total: 0, // ex) 100
      voted: 0, // ex) 50
    };
  }

  render() {
    const data = [
      {
        labels: ["투표자", "미투표자"],
        datasets: [
          {
            label: "# of Votes",
            data: [this.state.total - this.state.voted, this.state.voted],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
            borderWidth: 1,
          },
        ],
      },
      {
        labels: ["투표"],
        datasets: [
          {
            label: "투표자",
            data: [this.state.voted, this.state.total],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      },
    ];
    const ratio = this.state.voted / this.state.total * 100
    return (
      <div>
        <div className="mt-40">
          <h1 className="whitespace-nowrap w-min mx-auto text-6xl">
            샌즈초등학교 투표 도우미
          </h1>
        </div>
        <div className="flex w-min mx-auto gap-10 mt-10">
          <Input
            placeholder="학생 수"
            type="number"
            value={this.state.total}
            onChange={(e) => {
              this.setState({
                total: parseInt(e.target.value),
              });
            }}
          />
          <Input
            placeholder="투표한 학생 수"
            type="number"
            value={this.state.voted}
            onChange={(e) => {
              this.setState({
                voted: parseInt(e.target.value),
              });
            }}
          />
        </div>
        <div className="w-96 h-96 mx-auto">
          <Pie data={data[0]} />
        </div>
        <div className="w-1/3 h-min mx-auto">
          <Bar
            data={data[1]}
            options={{
              indexAxis: "y" as const,
              elements: {
                bar: {
                  borderWidth: 2,
                },
              },
              responsive: true,
              plugins: {
                legend: {
                  position: "right" as const,
                },
                title: {
                  display: true,
                  text: "투표율",
                },
              },
            }}
          />
        </div>
        <div>
          <h1 className='w-min mx-auto whitespace-nowrap'>{ratio ? `${ratio.toFixed(1)} %` : "구할 수 없음"}</h1>
        </div>
      </div>
    );
  }
}

export default Home;
