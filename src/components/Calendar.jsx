import React, { useState, useEffect } from 'react';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="text-center text-2xl font-bold text-blue-500">
      {time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })}
    </div>
  );
};

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState(null);
  const [eventTitle, setEventTitle] = useState('');
  const [events, setEvents] = useState({
    '2024-06-17': { title: 'Project Deadline' },
    '2024-06-20': { title: 'Team Meeting' },
    '2024-06-25': { title: 'Product Launch' },
  });

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const startDay = firstDayOfMonth.getDay();

  const calendarDates = [];
  let dayCounter = 1;
  for (let i = 0; i < 42; i++) {
    if (i < startDay || dayCounter > daysInMonth) {
      calendarDates.push(null);
    } else {
      calendarDates.push(new Date(year, month, dayCounter++));
    }
  }

  const prevMonth = () => setDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const nextMonth = () => setDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const isSameDay = (d1, d2) => {
    if (!d1 || !d2) return false;
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  };

  const handleEventInput = (e) => {
    e.preventDefault();
    const isoStr = selected.toISOString().slice(0, 10);
    if (eventTitle && selected) {
      setEvents(prevEvents => ({
        ...prevEvents,
        [isoStr]: { title: eventTitle }
      }));
      setEventTitle('');
    }
  };

  return (
    <section className="calendar max-w-4xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg" aria-label="Calendar">
      <DigitalClock />
      <div className="flex justify-between items-center mb-4 select-none">
        <button className="px-3 py-1 rounded-md bg-gradient-to-r from-purple-600 to-teal-500 text-white font-semibold hover:brightness-110 transition" aria-label="Previous month" onClick={prevMonth}>&lt;</button>
        <h2 aria-live="polite" className="text-xl font-bold text-purple-600 dark:text-teal-400">{date.toLocaleString('default', { month: 'long' })} {year}</h2>
        <button className="px-3 py-1 rounded-md bg-gradient-to-r from-purple-600 to-teal-500 text-white font-semibold hover:brightness-110 transition" aria-label="Next month" onClick={nextMonth}>&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center font-semibold text-gray-700 dark:text-gray-300 select-none">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
          <div key={i}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-3 mt-2">
        {calendarDates.map((dateObj, i) => {
          const isToday = isSameDay(dateObj, new Date());
          const isSelected = isSameDay(dateObj, selected);
          const isoStr = dateObj ? dateObj.toISOString().slice(0, 10) : null;
          const hasEvent = isoStr && !!events[isoStr];
 
          return (
            <button key={i}
              type="button"
              disabled={!dateObj}
              onClick={() => setSelected(dateObj)}
              aria-current={isToday ? "date" : undefined}
              aria-pressed={isSelected}
              aria-label={dateObj ? `${dateObj.toDateString()}${hasEvent ? `, Event: ${events[isoStr].title}` : ''}` : ''}
              tabIndex={dateObj ? 0 : -1}
              className={`rounded-md p-2 transition ${
                !dateObj ? 'cursor-default' : isSelected ? 'bg-teal-500 text-white' : 
                isToday ? 'bg-purple-600 text-white' : 'bg-gray-100 dark:bg-gray-800'
              } hover:bg-purple-600 hover:text-white disabled:opacity-50`}
            >
              {dateObj ? dateObj.getDate() : ''}
              {hasEvent && (
                <span aria-hidden="true" className="inline-block w-2 h-2 rounded-full bg-green-500 ml-1 align-middle" />
              )}
            </button>
          );
        })}
      </div>
      <p>Click On Date To Add Events!!!</p>
      {selected && (
        <>
          <p className="mt-4 text-center text-gray-700 dark:text-gray-300" aria-live="polite">
            Selected date: {selected.toDateString()} {events[selected.toISOString().slice(0, 10)] ? ` - Event: ${events[selected.toISOString().slice(0, 10)].title}` : ''}
          </p>
          <form onSubmit={handleEventInput} className="mt-4">
            <input
              type="text"
              value={eventTitle}
              onChange={(e) => setEventTitle(e.target.value)}
              placeholder="Add event title"
              className="p-2 border rounded-lg w-full"
            />
            <button type="submit" className="mt-2 p-2 bg-teal-500 text-white rounded-lg">Add Event</button>
          </form>
        </>
      )}
    </section>
  );
};

export default Calendar;
