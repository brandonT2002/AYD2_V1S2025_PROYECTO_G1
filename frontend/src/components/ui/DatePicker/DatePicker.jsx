import { useRef } from "react";
import { FaCalendar } from "react-icons/fa";
import { useDatePicker } from "./hooks";
import { Calendar } from "./components";
import ReactDOM from "react-dom";

const DatePicker = ({ label = "Fecha de Nacimiento", isRequired , onDateChange }) => {
    const inputRef = useRef(null);
    const dp = useDatePicker();

    // envolvemos funciones para pasar a Calendar
    const handleSelect = {
        format: dp.format,
        handle: (day) => {
            const newDate = new Date(dp.year, dp.month, day);
            dp.setSelected(newDate);
            inputRef.current.value = dp.format(newDate);
            dp.setShow(false);
            onDateChange?.(dp.format(newDate));
        },
    };

    return (
        <div className="relative w-full" ref={dp.pickerRef}>
            <label className="mb-2 text-text-base font-bold block">
                {label} {isRequired && <span className="text-text-red">*</span>}
            </label>

            {/* input */}
            <div className="relative">
                <div
                    className="absolute top-2 left-0 px-3 py-2 cursor-pointer text-gray-400"
                    onClick={() => dp.setShow(!dp.show)}
                >
                    <FaCalendar />
                </div>

                <input
                    type="text"
                    ref={inputRef}
                    readOnly
                    placeholder="YYYY-MM-DD"
                    defaultValue={dp.format(dp.selected)}
                    onClick={() => dp.setShow(!dp.show)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg
                     bg-panel-dark text-text-base
                     focus:outline-none focus:shadow-outline border-2 border-[#dadada]"
                />
            </div>

            {/* calendario emergente */}
            {dp.show && (
                <Calendar
                    month={dp.month}
                    setMonth={dp.setMonth}
                    year={dp.year}
                    setYear={dp.setYear}
                    blankDays={dp.blankDays}
                    noOfDays={dp.noOfDays}
                    selected={dp.selected}
                    onSelect={handleSelect}
                />
            )}
        </div>
    );
};

export default DatePicker;
