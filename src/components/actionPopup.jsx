import { useState, useReducer } from "react";
import { X, Mail, Clock } from "lucide-react";

export default function ActionPopup({ handleClose, dispatch }) {
  const [isOpen, setIsOpen] = useState(true);
  const [activeAction, setActiveAction] = useState(null);

  const handleOpenEmailForm = () => {
    setActiveAction("email");
  };

  const handleOpenDelayForm = () => {
    setActiveAction("delay");
  };

  const localHandleClose = () => {
    setActiveAction(null);
  };

  const handleBackToMenu = () => {
    setActiveAction(null);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
      >
        Open Actions
      </button>
    );
  }

  const initialstate = {
    type: null,
    title: "",
    subject_line: "",
    email_body: "",
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "email": {
        let val = {
          ...state,
          type: "email",
          title:
            action.payload.input === "title"
              ? action.payload.value
              : state.title,
          subject_line:
            action.payload.input === "subject_line"
              ? action.payload.value
              : state.subject_line,
          email_body:
            action.payload.input === "email_body"
              ? action.payload.value
              : state.email_body,
        };

        return val;
      }
      case "delay": {

        let val = {
          ...state,
          type: "delay",
          hours:
            action.payload.input === "hours"
              ? action.payload.value
              : state.hours,
          minutes:
            action.payload.input === "minutes"
              ? action.payload.value
              : state.minutes,
          seconds:
            action.payload.input === "seconds"
              ? action.payload.value
              : state.seconds,
        };        
         return val
      }
      default:
        return state;
    }
  };

  const [state, localDispatch] = useReducer(reducer, initialstate);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between bg-blue-600 text-white px-6 py-3">
          <h2 className="text-lg font-medium">
            {activeAction === "email"
              ? "Add Email"
              : activeAction === "delay"
              ? "Add Delay"
              : "Select Action"}
          </h2>
          <button
            onClick={() => {
              handleClose();
            }}
            className="text-white hover:text-gray-200 focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {activeAction === null ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleOpenEmailForm}
                className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Mail size={32} className="text-blue-600 mb-3" />
                <span className="text-gray-800 font-medium">Add Email</span>
              </button>

              <button
                onClick={handleOpenDelayForm}
                className="flex flex-col items-center justify-center p-6 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Clock size={32} className="text-blue-600 mb-3" />
                <span className="text-gray-800 font-medium">Add Delay</span>
              </button>
            </div>
          ) : activeAction === "email" ? (
            <div className="space-y-4">
              {/* Email Form */}
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Email title"
                  onChange={(e) =>
                    localDispatch({
                      type: "email",
                      payload: { input: "title", value: e.target.value },
                    })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject Line
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Subject line"
                  onChange={(e) =>
                    localDispatch({
                      type: "email",
                      payload: { input: "subject_line", value: e.target.value },
                    })
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="body"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Body
                </label>
                <textarea
                  id="body"
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your email here..."
                  onChange={(e) =>
                    localDispatch({
                      type: "email",
                      payload: { input: "email_body", value: e.target.value },
                    })
                  }
                />
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={handleBackToMenu}
                  className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  Back to menu
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                    dispatch({ type: "email", payload: state });
                    handleClose();
                  }}
                >
                  Create Email
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Delay Form */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="hours"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Hours
                  </label>
                  <input
                    type="number"
                    id="hours"
                    min="0"
                    max="23"
                    defaultValue="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) =>
                      localDispatch({
                        type: "delay",
                        payload: {
                          input: "hours",
                          value: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="minutes"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Minutes
                  </label>
                  <input
                    type="number"
                    id="minutes"
                    min="0"
                    max="59"
                    defaultValue="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) =>
                      localDispatch({
                        type: "delay",
                        payload: {
                          input: "minutes",
                          value: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>

                <div>
                  <label
                    htmlFor="seconds"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Seconds
                  </label>
                  <input
                    type="number"
                    id="seconds"
                    min="0"
                    max="59"
                    defaultValue="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    onChange={(e) =>
                      localDispatch({
                        type: "delay",
                        payload: {
                          input: "seconds",
                          value: Number(e.target.value),
                        },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  onClick={handleBackToMenu}
                  className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                >
                  Back to menu
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => {
                    dispatch({ type: "delay", payload: state });
                    handleClose();
                  }}
                >
                  Set Delay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
