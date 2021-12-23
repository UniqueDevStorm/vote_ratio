import React from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {}

interface State {
  total: number;
  candidate: Array<{
    candidate: string;
    voteNumber: number;
  }>;
}

class Manage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      total: 0,
      candidate: JSON.parse(window.localStorage.getItem("candidate")!) || [
        {
          candidate: "",
          voteNumber: 0,
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <div className="mx-auto w-min whitespace-nowrap select-none sm:mt-32 mt-16">
          <h1 className="sm:text-4xl text-3xl font-thin">
            {process.env.REACT_APP_NAME} 선거 투표 도우미
          </h1>
          <div className="mt-10">
            <div className="w-max mx-auto">
              <input
                type="number"
                placeholder="학교 학생수"
                className="w-48 h-10 border-2 rounded-lg outline-0 focus:ring-2 focus:ring-blue-500 duration-150 text-center"
                onChange={(e) => {
                  this.setState({
                    total: parseInt(e.target.value),
                  });
                }}
                value={this.state.total === 0 ? "" : this.state.total}
              />
            </div>
          </div>
          <div className="mt-10">
            {(
              this.state.candidate as Array<{
                candidate: string;
                voteNumber: number;
              }>
            ).map((x, y) => (
              <div className="mt-5" key={y}>
                <div className="w-min mx-auto flex gap-5 items-center">
                  <input
                    type="text"
                    placeholder="후보 이름"
                    className="w-44 h-10 border-2 rounded-lg outline-0 focus:ring-2 focus:ring-blue-500 duration-150 text-center invalid:border-red-500"
                    onChange={(e) => {
                      const data = this.state.candidate;
                      data[y].candidate = e.target.value;
                      this.setState({
                        candidate: data,
                      });
                    }}
                    value={this.state.candidate[y].candidate}
                  />
                  <input
                    type="number"
                    placeholder="투표자"
                    className="w-44 h-10 border-2 rounded-lg outline-0 focus:ring-2 focus:ring-blue-500 duration-150 text-center"
                    onChange={(e) => {
                      const data = this.state.candidate;
                      data[y].voteNumber = parseInt(e.target.value);
                      this.setState({
                        candidate: data,
                      });
                    }}
                    value={
                      this.state.candidate[y].voteNumber === 0
                        ? ""
                        : this.state.candidate[y].voteNumber
                    }
                  />
                </div>
              </div>
            ))}
            <div className="mt-5 sm:mx-2 flex justify-between">
              <button
                className="bg-blue-600 rounded-lg p-3 text-white font-bold hover:scale-110 duration-200 w-24 outline-0"
                onClick={() => {
                  this.setState({
                    candidate: [
                      ...this.state.candidate,
                      {
                        candidate: "",
                        voteNumber: 0,
                      },
                    ],
                  });
                }}
              >
                후보 추가
              </button>
              <button
                className="bg-rose-600 rounded-lg p-3 text-white font-bold hover:scale-110 duration-200 w-24 outline-0"
                onClick={() => {
                  this.setState({
                    total: 0,
                    candidate: [
                      {
                        candidate: "",
                        voteNumber: 0,
                      },
                    ],
                  });
                }}
              >
                초기화
              </button>
              <button
                className="bg-emerald-400 rounded-lg p-3 text-white font-bold hover:scale-110 duration-200 w-24 outline-0"
                onClick={() => {
                  try {
                    window.localStorage.setItem(
                      "total",
                      this.state.total.toString()
                    );
                    window.localStorage.setItem(
                      "candidate",
                      JSON.stringify(this.state.candidate)
                    );
                    toast.success("저장되었습니다!", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  } catch (e) {
                    toast.error("저장에 실패했습니다.", {
                      position: "bottom-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                    console.log(e);
                  }
                }}
              >
                저장
              </button>
            </div>
            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Manage;
