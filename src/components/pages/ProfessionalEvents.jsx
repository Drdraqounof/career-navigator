import React, { useState } from "react";
import EventCard from "./EventCard";

export default function ProfessionalEvents() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const events = [
    {
      id: 1,
      title: "Tech Careers Expo 2025",
      category: "Technology",
      description: "Meet top recruiters and discover the latest tech career paths.",
      date: "November 12, 2025",
      location: "New York, NY",
    },
    {
      id: 2,
      title: "Women in Leadership Conference",
      category: "Business",
      description: "A space for aspiring and established leaders to connect and learn.",
      date: "December 3, 2025",
      location: "Atlanta, GA",
    },
    {
      id: 3,
      title: "Creative Careers Workshop",
      category: "Design",
      description: "Explore careers in digital design, UX, and branding.",
      date: "October 28, 2025",
      location: "Los Angeles, CA",
    },
  ];

  const filteredEvents = events.filter((event) => {
    const matchSearch = event.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "All" || event.category === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Professional Events
        </h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="w-full md:w-1/4 px-4 py-2 border rounded-lg"
          >
            <option value="All">All Categories</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Design">Design</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="text-center text-gray-600 col-span-3">No events found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

