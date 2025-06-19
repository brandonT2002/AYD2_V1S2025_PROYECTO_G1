import React from "react";
import { DAYS, MONTH_NAMES, YEARS } from "../config";
import DayCell from "./DayCell";

const Calendar = ({
    month,
    setMonth,
    year,
    setYear,
    blankDays,
    noOfDays,
    selected,
    onSelect,
}) => (
    <div
        className="bg-panel-dark border-2 border-gray-600 text-gray-300
               -mt-[19rem] rounded-lg p-4 absolute z-10"
        style={{ width: "17rem" }}
    >
        {/* Selección de mes y año */}
        <div className="flex justify-between items-center mb-2">
            <select
                value={month}
                onChange={(e) => setMonth(+e.target.value)}
                className="bg-panel-hover-dark text-white p-1 rounded"
            >
                {MONTH_NAMES.map((m, i) => (
                    <option key={i} value={i}>
                        {m}
                    </option>
                ))}
            </select>

            <select
                value={year}
                onChange={(e) => setYear(+e.target.value)}
                className="bg-panel-hover-dark text-white p-1 rounded"
            >
                {YEARS.map((yr) => (
                    <option key={yr} value={yr}>
                        {yr}
                    </option>
                ))}
            </select>
        </div>

        {/* Días */}
        <div className="grid grid-cols-7 gap-1 text-center">
            {DAYS.map((d) => (
                <div key={d} className="text-sm font-medium text-gray-400">
                    {d}
                </div>
            ))}
            {blankDays.map((i) => (
                <div key={i}></div>
            ))}
            {noOfDays.map((day) => (
                <DayCell
                    key={day}
                    day={day}
                    isSelected={
                        selected &&
                        onSelect.format(selected) ===
                            onSelect.format(new Date(year, month, day))
                    }
                    onClick={() => onSelect.handle(day)}
                />
            ))}
        </div>
    </div>
);

export default Calendar;
