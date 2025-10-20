import React from "react";
import "./Event.css"

export default function EventCard({ event }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800">{event.title}</h3>
      <p className="text-sm text-gray-500">{event.category}</p>
      <p className="text-gray-700 mt-2">{event.description}</p>
      <div className="mt-3 text-sm text-gray-600">
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
      </div>
      <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
        Register
      </button>
    </div>
  );
}

