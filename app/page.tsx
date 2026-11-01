
"use client";

import { useState } from "react";

function FormInsightAI() {

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [formName, setFormName] = useState("Customer Registration Form");
  const [fields, setFields] = useState([
    { id: 1, label: "Full Name", type: "text", required: true },
    { id: 2, label: "Email Address", type: "email", required: true },
    { id: 3, label: "City", type: "text", required: true },
    { id: 4, label: "Phone Number", type: "tel", required: false }
  ]);

  const [query, setQuery] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hello! I'm your AI Database Assistant. Ask me anything about your form submissions and database."
    }
  ]);

  const [submissions] = useState([
    {
      id: 1,
      name: "Ahmed Ali",
      email: "ahmed@example.com",
      city: "Lahore",
      status: "Completed",
      date: "2026-10-31"
    },
    {
      id: 2,
      name: "Sara Khan",
      email: "sara@example.com",
      city: "Karachi",
      status: "Completed",
      date: "2026-10-31"
    },
    {
      id: 3,
      name: "Usman Malik",
      email: "usman@example.com",
      city: "Lahore",
      status: "Completed",
      date: "2026-10-30"
    },
    {
      id: 4,
      name: "Ayesha Noor",
      email: "ayesha@example.com",
      city: "Islamabad",
      status: "Pending",
      date: "2026-10-29"
    },
    {
      id: 5,
      name: "Hassan Ahmed",
      email: "hassan@example.com",
      city: "Lahore",
      status: "Completed",
      date: "2026-10-31"
    }
  ]);

  // Add New Field

  const addField = (type) => {

    const newField = {
      id: Date.now(),
      label: `New ${type} Field`,
      type: type,
      required: false
    };

    setFields([...fields, newField]);

  };

  // Delete Field

  const deleteField = (id) => {

    setFields(fields.filter((field) => field.id !== id));

  };

  // Update Field Label

  const updateField = (id, value) => {

    setFields(fields.map((field) =>
      field.id === id
        ? { ...field, label: value }
        : field
    ));

  };

  // Toggle Required

  const toggleRequired = (id) => {

    setFields(fields.map((field) =>
      field.id === id
        ? { ...field, required: !field.required }
        : field
    ));

  };

  // Drag and Drop

  const handleDragStart = (e, type) => {

    e.dataTransfer.setData("fieldType", type);

  };

  const handleDrop = (e) => {

    e.preventDefault();

    const type = e.dataTransfer.getData("fieldType");

    if (type) {
      addField(type);
    }

  };

  // AI Chat Assistant

  const handleQuery = (e) => {

    e.preventDefault();

    if (!query.trim()) return;

    const userMessage = {
      role: "user",
      text: query
    };

    const lowerQuery = query.toLowerCase();

    let response = "";

    if (
      lowerQuery.includes("lahore") &&
      (
        lowerQuery.includes("2 days") ||
        lowerQuery.includes("2 din") ||
        lowerQuery.includes("last 2") ||
        lowerQuery.includes("pichle 2")
      )
    ) {

      const filteredUsers = submissions.filter((user) =>
        user.city.toLowerCase() === "lahore" &&
        user.date >= "2026-10-30"
      );

      response = `I found ${filteredUsers.length} users from Lahore who signed up in the last 2 days:\n\n`;

      filteredUsers.forEach((user) => {
        response += `• ${user.name} — ${user.email} — ${user.date}\n`;
      });

    } else if (lowerQuery.includes("total") || lowerQuery.includes("how many")) {

      response = `Your database currently contains ${submissions.length} sample form submissions.`;

    } else if (lowerQuery.includes("lahore")) {

      const filteredUsers = submissions.filter((user) =>
        user.city.toLowerCase() === "lahore"
      );

      response = `I found ${filteredUsers.length} users from Lahore in your sample database.`;

    } else {

      response = "I received your question! This is a frontend demo. Connect an AI API and MongoDB backend to generate real database insights from natural-language queries.";

    }

    setMessages([...messages, userMessage, {
      role: "ai",
      text: response
    }]);

    setQuery("");

  };


  return (

    <div className="min-h-screen bg-slate-50 text-gray-800">

      {/* NAVBAR */}

      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">

        <div className="px-4 md:px-8 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xl">
              F
            </div>

            <div>
              <h1 className="text-xl font-bold text-gray-900">
                FormInsight<span className="text-indigo-600">AI</span>
              </h1>
              <p className="text-xs text-gray-400">
                Smart Form & Database Platform
              </p>
            </div>

          </div>

          <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-80">

            <span className="mr-2">🔍</span>

            <input
              type="text"
              placeholder="Search anything..."
              className="bg-transparent outline-none w-full text-sm"
            />

            <span className="text-xs text-gray-400">Ctrl K</span>

          </div>

          <div className="flex items-center gap-4">

            <button className="relative text-xl">
              🔔
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <div className="flex items-center gap-2">

              <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                S
              </div>

              <div className="hidden sm:block">
                <p className="text-sm font-semibold">Shazia Kareem</p>
                <p className="text-xs text-gray-400">Administrator</p>
              </div>

            </div>

          </div>

        </div>

      </nav>


      <div className="flex">

        {/* SIDEBAR */}

        <aside className="hidden md:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-5">

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Workspace
          </p>

          <div className="space-y-2">

            {[
              ["📊", "Dashboard"],
              ["📝", "Form Builder"],
              ["📥", "Submissions"],
              ["🤖", "AI Assistant"],
              ["📈", "Analytics"]
            ].map(([icon, name]) => (

              <button
                key={name}
                onClick={() => setActiveTab(name)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition ${
                  activeTab === name
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <span>{icon}</span>
                {name}
              </button>

            ))}

          </div>

          <hr className="my-6" />

          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">
            Settings
          </p>

          <div className="space-y-2">

            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">
              ⚙️ Settings
            </button>

            <button className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-600 hover:bg-gray-100 rounded-xl">
              ❓ Help & Support
            </button>

          </div>

          <div className="mt-16 bg-gradient-to-br from-indigo-600 to-purple-700 p-4 rounded-2xl text-white">

            <div className="text-2xl mb-2">✨</div>

            <h3 className="font-bold">
              Upgrade to Pro
            </h3>

            <p className="text-xs text-indigo-100 mt-2 leading-5">
              Unlock advanced AI insights and unlimited forms.
            </p>

            <button className="bg-white text-indigo-700 font-bold text-xs px-4 py-2 rounded-lg mt-4">
              Explore Plans
            </button>

          </div>

        </aside>


        {/* MAIN CONTENT */}

        <main className="flex-1 min-w-0 p-4 md:p-8">

          {/* MOBILE NAVIGATION */}

          <div className="md:hidden flex gap-2 overflow-x-auto pb-4 mb-4">

            {["Dashboard", "Form Builder", "Submissions", "AI Assistant", "Analytics"].map((name) => (

              <button
                key={name}
                onClick={() => setActiveTab(name)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-semibold ${
                  activeTab === name
                    ? "bg-indigo-600 text-white"
                    : "bg-white text-gray-600"
                }`}
              >
                {name}
              </button>

            ))}

          </div>


          {/* DASHBOARD */}

          {activeTab === "Dashboard" && (

            <div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">

                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                    Dashboard Overview
                  </h2>

                  <p className="text-gray-500 text-sm mt-2">
                    Welcome back, Shazia! Here's what's happening with your forms.
                  </p>
                </div>

                <button
                  onClick={() => setActiveTab("Form Builder")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold text-sm shadow-md"
                >
                  + Create New Form
                </button>

              </div>


              {/* STATISTICS */}

              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

                {[
                  {
                    title: "Total Forms",
                    value: "12",
                    change: "+2 this month",
                    icon: "📝",
                    color: "bg-indigo-100 text-indigo-600"
                  },
                  {
                    title: "Total Submissions",
                    value: "1,284",
                    change: "+18.5% this month",
                    icon: "📥",
                    color: "bg-green-100 text-green-600"
                  },
                  {
                    title: "Conversion Rate",
                    value: "68.4%",
                    change: "+5.2% this month",
                    icon: "📈",
                    color: "bg-orange-100 text-orange-600"
                  },
                  {
                    title: "AI Queries",
                    value: "356",
                    change: "+24 this week",
                    icon: "🤖",
                    color: "bg-purple-100 text-purple-600"
                  }
                ].map((item) => (

                  <div
                    key={item.title}
                    className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition"
                  >

                    <div className="flex justify-between items-center">

                      <div>
                        <p className="text-sm text-gray-500">
                          {item.title}
                        </p>

                        <h3 className="text-3xl font-bold text-gray-900 mt-2">
                          {item.value}
                        </h3>
                      </div>

                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${item.color}`}>
                        {item.icon}
                      </div>

                    </div>

                    <p className="text-xs text-green-600 font-semibold mt-4">
                      ↑ {item.change}
                    </p>

                  </div>

                ))}

              </div>


              {/* ANALYTICS AND AI QUERY */}

              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

                <div className="xl:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">

                  <div className="flex justify-between items-center mb-6">

                    <div>
                      <h3 className="font-bold text-lg">
                        Submission Analytics
                      </h3>

                      <p className="text-sm text-gray-400">
                        Overview of your form submissions
                      </p>
                    </div>

                    <select className="border border-gray-200 rounded-lg p-2 text-sm outline-none">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                    </select>

                  </div>

                  <div className="h-52 flex items-end justify-around gap-3 border-b border-l border-gray-200 px-3">

                    {[40, 65, 45, 80, 55, 95, 70].map((height, i) => (

                      <div
                        key={i}
                        className="flex flex-col items-center gap-2 flex-1"
                      >

                        <div
                          style={{ height: `${height}%` }}
                          className="w-full max-w-12 bg-indigo-500 hover:bg-purple-500 rounded-t-lg transition"
                        ></div>

                        <span className="text-xs text-gray-400">
                          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                        </span>

                      </div>

                    ))}

                  </div>

                  <p className="text-xs text-gray-400 mt-4">
                    Sample analytics data for dashboard preview.
                  </p>

                </div>


                {/* AI QUERY CARD */}

                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-6 rounded-2xl text-white">

                  <div className="text-3xl mb-4">🤖</div>

                  <h3 className="text-xl font-bold">
                    Ask Your Database
                  </h3>

                  <p className="text-sm text-indigo-100 mt-2 leading-6">
                    Get instant insights from your database using natural language.
                  </p>

                  <div className="bg-white/10 rounded-xl p-4 mt-6">

                    <p className="text-xs text-indigo-100 mb-2">
                      Try asking:
                    </p>

                    <p className="text-sm font-medium">
                      "Show users from Lahore who signed up in the last 2 days."
                    </p>

                  </div>

                  <button
                    onClick={() => setActiveTab("AI Assistant")}
                    className="w-full bg-white text-indigo-700 font-bold py-3 rounded-xl mt-5 hover:bg-indigo-50"
                  >
                    Open AI Assistant →
                  </button>

                </div>

              </div>


              {/* RECENT SUBMISSIONS */}

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

                <div className="flex justify-between items-center mb-5">

                  <h3 className="text-lg font-bold">
                    Recent Submissions
                  </h3>

                  <button
                    onClick={() => setActiveTab("Submissions")}
                    className="text-indigo-600 text-sm font-semibold"
                  >
                    View All →
                  </button>

                </div>

                <div className="overflow-x-auto">

                  <table className="w-full text-left text-sm min-w-[600px]">

                    <thead>
                      <tr className="text-gray-400 border-b">
                        <th className="py-3">Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>

                      {submissions.slice(0, 4).map((user) => (

                        <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">

                          <td className="py-4 font-semibold">
                            {user.name}
                          </td>

                          <td className="text-gray-500">
                            {user.email}
                          </td>

                          <td>{user.city}</td>

                          <td>{user.date}</td>

                          <td>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              user.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {user.status}
                            </span>
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          )}


          {/* FORM BUILDER */}

          {activeTab === "Form Builder" && (

            <div>

              <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">

                <div>
                  <h2 className="text-2xl font-bold">
                    Form Builder
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    Create custom forms using drag and drop.
                  </p>
                </div>

                <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-indigo-700">
                  Save Form
                </button>

              </div>


              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* FIELD ELEMENTS */}

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                  <h3 className="font-bold text-lg mb-2">
                    Form Elements
                  </h3>

                  <p className="text-xs text-gray-400 mb-5">
                    Drag an element or click to add it.
                  </p>

                  <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">

                    {[
                      ["text", "📝", "Text Input"],
                      ["email", "✉️", "Email"],
                      ["number", "🔢", "Number"],
                      ["tel", "📱", "Phone"],
                      ["date", "📅", "Date"],
                      ["textarea", "📄", "Text Area"]
                    ].map(([type, icon, label]) => (

                      <button
                        key={type}
                        draggable
                        onDragStart={(e) => handleDragStart(e, type)}
                        onClick={() => addField(type)}
                        className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 text-sm hover:border-indigo-500 hover:bg-indigo-50 transition"
                      >

                        <span>{icon}</span>

                        <span className="font-medium">
                          {label}
                        </span>

                        <span className="ml-auto text-indigo-600">+</span>

                      </button>

                    ))}

                  </div>

                </div>


                {/* FORM CANVAS */}

                <div className="lg:col-span-2 bg-white rounded-2xl p-5 md:p-7 shadow-sm border border-gray-100">

                  <div className="border-b pb-5 mb-5">

                    <span className="text-xs font-bold text-indigo-600 uppercase">
                      Form Settings
                    </span>

                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      className="block w-full text-2xl font-bold mt-3 outline-none border-b border-transparent focus:border-indigo-500 py-2"
                    />

                    <p className="text-sm text-gray-400 mt-2">
                      Add your information below to get started.
                    </p>

                  </div>


                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="space-y-4 min-h-72"
                  >

                    {fields.map((field) => (

                      <div
                        key={field.id}
                        className="border border-gray-200 rounded-xl p-4 hover:border-indigo-400 transition group"
                      >

                        <div className="flex justify-between items-center mb-3">

                          <span className="text-xs text-gray-400 uppercase">
                            {field.type} Field
                          </span>

                          <button
                            onClick={() => deleteField(field.id)}
                            className="text-red-500 text-sm opacity-100 lg:opacity-0 lg:group-hover:opacity-100"
                          >
                            🗑 Delete
                          </button>

                        </div>

                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => updateField(field.id, e.target.value)}
                          className="font-semibold text-sm mb-3 outline-none w-full border-b border-gray-200 focus:border-indigo-500 pb-2"
                        />

                        {field.type === "textarea" ? (

                          <textarea
                            placeholder={`Enter ${field.label}`}
                            className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400"
                            rows="3"
                          />

                        ) : (

                          <input
                            type={field.type}
                            placeholder={`Enter ${field.label}`}
                            className="w-full border border-gray-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400"
                          />

                        )}

                        <label className="flex items-center gap-2 mt-3 text-xs text-gray-500">

                          <input
                            type="checkbox"
                            checked={field.required}
                            onChange={() => toggleRequired(field.id)}
                            className="accent-indigo-600"
                          />

                          Required Field

                        </label>

                      </div>

                    ))}

                    <div className="border-2 border-dashed border-indigo-200 bg-indigo-50/50 rounded-xl p-8 text-center">

                      <p className="text-3xl mb-2">➕</p>

                      <p className="text-sm font-semibold text-gray-600">
                        Drag and drop fields here
                      </p>

                      <p className="text-xs text-gray-400 mt-2">
                        Or select a field from the left panel.
                      </p>

                    </div>

                  </div>

                  <button className="w-full mt-6 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700">
                    Save Form
                  </button>

                </div>


                {/* FORM PREVIEW */}

                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">

                  <h3 className="font-bold text-lg mb-2">
                    Live Preview
                  </h3>

                  <p className="text-xs text-gray-400 mb-5">
                    Preview your form design.
                  </p>

                  <div className="bg-gray-50 p-4 rounded-xl">

                    <h4 className="font-bold mb-4">
                      {formName}
                    </h4>

                    {fields.map((field) => (

                      <div key={field.id} className="mb-4">

                        <label className="block text-xs font-semibold mb-2">
                          {field.label}
                          {field.required && (
                            <span className="text-red-500"> *</span>
                          )}
                        </label>

                        {field.type === "textarea" ? (

                          <textarea
                            placeholder={field.label}
                            className="w-full border border-gray-200 bg-white rounded-lg p-2 text-xs outline-none"
                            rows="3"
                          />

                        ) : (

                          <input
                            type={field.type}
                            placeholder={field.label}
                            className="w-full border border-gray-200 bg-white rounded-lg p-2 text-xs outline-none"
                          />

                        )}

                      </div>

                    ))}

                    <button className="w-full bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold">
                      Submit Form
                    </button>

                  </div>

                </div>

              </div>

            </div>

          )}


          {/* SUBMISSIONS */}

          {activeTab === "Submissions" && (

            <div>

              <div className="mb-7">
                <h2 className="text-2xl font-bold">
                  Form Submissions
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  Manage and view all your submitted user data.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">

                <div className="flex flex-col sm:flex-row justify-between gap-3 mb-6">

                  <input
                    type="text"
                    placeholder="Search submissions..."
                    className="border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400"
                  />

                  <button className="bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold">
                    Export Data ↓
                  </button>

                </div>

                <div className="overflow-x-auto">

                  <table className="w-full min-w-[650px] text-sm text-left">

                    <thead>
                      <tr className="text-gray-400 border-b">
                        <th className="p-3">ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>City</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>

                    <tbody>

                      {submissions.map((user) => (

                        <tr key={user.id} className="border-b hover:bg-gray-50">

                          <td className="p-3">{user.id}</td>
                          <td className="font-semibold">{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.city}</td>
                          <td>{user.date}</td>

                          <td>
                            <span className={`px-3 py-1 rounded-full text-xs ${
                              user.status === "Completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}>
                              {user.status}
                            </span>
                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              </div>

            </div>

          )}


          {/* AI ASSISTANT */}

          {activeTab === "AI Assistant" && (

            <div>

              <div className="mb-7">
                <h2 className="text-2xl font-bold">
                  AI Database Assistant
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                  Ask questions about your database in simple language.
                </p>
              </div>


              <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                {/* CHAT HEADER */}

                <div className="bg-gradient-to-r from-indigo-600 to-purple-700 p-5 text-white">

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                      🤖
                    </div>

                    <div>
                      <h3 className="font-bold text-lg">
                        FormInsight AI
                      </h3>

                      <p className="text-xs text-indigo-100">
                        AI Database Assistant · Demo Mode
                      </p>
                    </div>

                    <span className="ml-auto bg-green-400 w-3 h-3 rounded-full"></span>

                  </div>

                </div>


                {/* CHAT MESSAGES */}

                <div className="p-5 h-[400px] overflow-y-auto bg-gray-50 space-y-5">

                  {messages.map((message, index) => (

                    <div
                      key={index}
                      className={`flex gap-3 ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      {message.role === "ai" && (

                        <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center shrink-0">
                          🤖
                        </div>

                      )}

                      <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-6 whitespace-pre-line ${
                        message.role === "user"
                          ? "bg-indigo-600 text-white rounded-br-none"
                          : "bg-white text-gray-700 shadow-sm border border-gray-100 rounded-bl-none"
                      }`}>
                        {message.text}
                      </div>

                      {message.role === "user" && (

                        <div className="w-9 h-9 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold shrink-0">
                          S
                        </div>

                      )}

                    </div>

                  ))}

                </div>


                {/* SUGGESTED QUERIES */}

                <div className="px-5 pt-4">

                  <p className="text-xs text-gray-400 font-semibold mb-3">
                    TRY THESE QUESTIONS
                  </p>

                  <div className="flex flex-wrap gap-2">

                    {[
                      "Show users from Lahore in the last 2 days",
                      "How many total submissions?",
                      "Find all users from Lahore"
                    ].map((text) => (

                      <button
                        key={text}
                        onClick={() => setQuery(text)}
                        className="text-xs border border-indigo-200 text-indigo-600 px-3 py-2 rounded-full hover:bg-indigo-50"
                      >
                        {text}
                      </button>

                    ))}

                  </div>

                </div>


                {/* CHAT INPUT */}

                <form
                  onSubmit={handleQuery}
                  className="p-5 border-t mt-4 flex gap-3"
                >

                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask anything about your database..."
                    className="flex-1 min-w-0 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
                  />

                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 rounded-xl font-semibold"
                  >
                    ➤
                  </button>

                </form>

              </div>

            </div>

          )}


          {/* ANALYTICS */}

          {activeTab === "Analytics" && (

            <div>

              <h2 className="text-2xl font-bold">
                Analytics & Insights
              </h2>

              <p className="text-sm text-gray-500 mt-2 mb-7">
                Understand your form performance and user activity.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <p className="text-gray-500 text-sm">Total Submissions</p>
                  <h3 className="text-3xl font-bold mt-3">1,284</h3>
                  <p className="text-green-600 text-sm mt-2">↑ 18.5% growth</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm">
                  <p className="text-gray-500 text-sm">Average Completion</p>
                  <h3 className="text-3xl font-bold mt-3">68.4%</h3>
                  <p className="text-green-600 text-sm mt-2">↑ 5.2% growth</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm sm:col-span-2">

                  <h3 className="font-bold text-lg mb-6">
                    Submissions by City
                  </h3>

                  {[
                    ["Lahore", 80],
                    ["Karachi", 60],
                    ["Islamabad", 45],
                    ["Other Cities", 30]
                  ].map(([city, value]) => (

                    <div key={city} className="mb-5">

                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-semibold">{city}</span>
                        <span className="text-gray-500">{value}%</span>
                      </div>

                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">

                        <div
                          style={{ width: `${value}%` }}
                          className="h-full bg-indigo-600 rounded-full"
                        ></div>

                      </div>

                    </div>

                  ))}

                  <p className="text-xs text-gray-400 mt-4">
                    Illustrative analytics based on sample data.
                  </p>

                </div>

              </div>

            </div>

          )}

          {/* FOOTER */}

          <footer className="text-center text-xs text-gray-400 py-8">
            © 2026 FormInsightAI. All rights reserved.
            <p className="mt-2">
              Smart Forms. Intelligent Insights.
            </p>
          </footer>

        </main>

      </div>

    </div>

  );

}

export default FormInsightAI;
