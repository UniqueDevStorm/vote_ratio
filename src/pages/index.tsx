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

interface _ {
  candidate: string;
  voteNumber: number;
}

interface Props {}

interface State {
  candidates: _[];
  total: number;
}

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

class Index extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      candidates:
        JSON.parse(window.localStorage.getItem("candidate") as string) || [],
      total: parseInt(window.localStorage.getItem("total")!) || 0,
    };
  }

  render() {
    window.addEventListener("storage", () => {
      this.setState({
        candidates:
          JSON.parse(window.localStorage.getItem("candidate") as string) || [],
        total: parseInt(window.localStorage.getItem("total")!) || 0,
      });
    });
    return (
      <div>
        <div className="w-min whitespace-nowrap mx-auto select-none sm:mt-32 mt-16">
          <h1 className="sm:text-4xl text-3xl font-thin">
            {process.env.REACT_APP_NAME} 선거 투표 도우미
          </h1>
        </div>
        <div>
          {this.state.candidates.length === 0 && (
            <div className="w-min whitespace-nowrap mx-auto select-none sm:mt-32 mt-16">
              <h2 className="sm:text-4xl text-3xl font-thin">
                선거 투표 도우미를 사용하기 위해서는 선거 후보를 추가해야
                합니다.
              </h2>
            </div>
          )}
          {this.state.candidates.length === 1 &&
            this.state.candidates[0].candidate === "" && (
              <div className="w-min whitespace-nowrap mx-auto select-none sm:mt-32 mt-16">
                <h2 className="sm:text-4xl text-3xl font-thin">
                  선거 투표 도우미를 사용하기 위해서는 선거 후보를 추가해야
                  합니다.
                </h2>
              </div>
            )}
          {this.state.candidates.length > 0 &&
            this.state.candidates[0].candidate !== "" && (
              <>
                <div className="sm:w-1/4 sm:h-1/4 mx-auto">
                  <Pie
                    data={{
                      labels:
                        this.state.total -
                          this.state.candidates
                            .map((x) => x.voteNumber)
                            .reduce(
                              (accumulator, curr) => accumulator + curr
                            ) ===
                        0
                          ? this.state.candidates.map((x) => x.candidate)
                          : [
                              ...this.state.candidates.map((x) => x.candidate),
                              "미투표자",
                            ],
                      datasets: [
                        {
                          data: [
                            ...this.state.candidates.map((c) => c.voteNumber),
                            this.state.total -
                              this.state.candidates
                                .map((x) => x.voteNumber)
                                .reduce(
                                  (accumulator, curr) => accumulator + curr
                                ),
                          ],
                          backgroundColor: [
                            "rgb(255, 99, 132)",
                            "rgb(255, 159, 64)",
                            "rgb(255, 196, 59)",
                            "rgb(75, 192, 192)",
                            "rgb(54, 162, 235)",
                            "rgb(153, 102, 255)",
                            "rgb(201, 203, 207)",
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                  />
                </div>
                <div className="sm:w-1/4 mx-auto">
                  <Bar
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
                      },
                    }}
                    data={{
                      labels:
                        this.state.total -
                          this.state.candidates
                            .map((x) => x.voteNumber)
                            .reduce(
                              (accumulator, curr) => accumulator + curr
                            ) ===
                        0
                          ? this.state.candidates.map((x) => x.candidate)
                          : [
                              ...this.state.candidates.map((x) => x.candidate),
                              "미투표자",
                            ],
                      datasets: [
                        {
                          label: "투표 데이터",
                          data: [
                            ...this.state.candidates.map((c) => c.voteNumber),
                            this.state.total -
                              this.state.candidates
                                .map((x) => x.voteNumber)
                                .reduce(
                                  (accumulator, curr) => accumulator + curr
                                ),
                          ],
                          backgroundColor: "rgba(255, 99, 132, 0.5)",
                        },
                      ],
                    }}
                  />
                </div>
              </>
            )}
        </div>
      </div>
    );
  }
}

export default Index;
