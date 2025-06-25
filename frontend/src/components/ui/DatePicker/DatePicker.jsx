import { useRef, useEffect } from "react";
import { LuCalendarDays } from "react-icons/lu";
import { useDatePicker } from "./hooks";
import { Calendar } from "./components";
import ReactDOM from "react-dom";

const DatePicker = ({
    label = "Fecha de Nacimiento",
    isRequired,
    name,
    onDateChange,
    register,
    defaultValue,
    position = "bottom",
}) => {
    const inputRef = useRef(null);
    const dp = useDatePicker();
    const calendarRef = useRef(null);
    const pickerContainerRef = useRef(null);

    const handleSelect = {
        format: dp.format,
        handle: (day) => {
            const newDate = new Date(dp.year, dp.month, day);
            dp.setSelected(newDate);
            if (inputRef.current) {
                inputRef.current.value = dp.format(newDate);
            }
            dp.setShow(false);
            onDateChange?.(dp.format(newDate));
        },
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!dp.show || !calendarRef.current || !inputRef.current) {
                return;
            }

            const clickedCalendar = calendarRef.current.contains(event.target);
            const clickedInput = inputRef.current.contains(event.target);
            const clickedIcon = event.target.closest(
                ".calendar-icon-container"
            );

            if (!clickedCalendar && !clickedInput && !clickedIcon) {
                dp.setShow(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dp.show]);

    useEffect(() => {
        if (dp.show && calendarRef.current && inputRef.current) {
            const timeoutId = setTimeout(() => {
                const inputRect = inputRef.current.getBoundingClientRect();
                const calendarEl = calendarRef.current;
                const bodyScrollTop =
                    document.documentElement.scrollTop ||
                    document.body.scrollTop;
                const bodyScrollLeft =
                    document.documentElement.scrollLeft ||
                    document.body.scrollLeft;

                let top,
                    left = inputRect.left + bodyScrollLeft;

                if (position === "top") {
                    top =
                        inputRect.top +
                        bodyScrollTop +
                        calendarEl.offsetHeight +
                        350; 
                } else {
                    top = inputRect.bottom + bodyScrollTop + 10;
                }

                const viewportWidth = window.innerWidth;
                if (left + calendarEl.offsetWidth > viewportWidth) {
                    left = viewportWidth - calendarEl.offsetWidth - 10;
                }
                left = Math.max(left, 10);

                calendarEl.style.position = "absolute";
                calendarEl.style.top = `${top}px`;
                calendarEl.style.left = `${left}px`;
                calendarEl.style.zIndex = "1000";
            }, 0);

            return () => clearTimeout(timeoutId);
        }
    }, [dp.show, dp.month, dp.year, position]);

    const combinedRef = (el) => {
        inputRef.current = el; 
        if (register && name) {
            const { ref } = register(name);
            if (typeof ref === "function") {
                ref(el);
            } else if (ref) {
                ref.current = el;
            }
        }
    };

    return (
        <div className="relative w-full" ref={pickerContainerRef}>
            <label className="text-text-base font-bold block mb-1">
                {label} {isRequired && <span className="text-text-red">*</span>}
            </label>
            <div className="relative">
                <div
                    className="calendar-icon-container absolute top-1 left-0 px-3 py-2 cursor-pointer text-gray-400"
                    onClick={() => dp.setShow(!dp.show)}
                >
                    <LuCalendarDays size={18} />
                </div>
                <input
                    type="text"
                    ref={combinedRef} // Use the combined ref here
                    defaultValue={defaultValue || dp.format(dp.selected)}
                    readOnly
                    placeholder="YYYY-MM-DD"
                    onClick={() => dp.setShow(!dp.show)}
                    className="w-full pl-10 pr-4 py-2 rounded-sm
                     bg-panel-dark text-text-base
                     focus:outline-none focus:shadow-outline border-1 border-[#dadada]"
                />
            </div>
            {dp.show &&
                ReactDOM.createPortal(
                    <>
                        <div
                            className="fixed inset-0 z-[999]"
                            onClick={() => dp.setShow(false)}
                        />

                        <div
                            ref={calendarRef}
                            className="absolute z-[1000] bg-white shadow-lg rounded-md"
                            onClick={(e) => e.stopPropagation()}
                        >
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
                        </div>
                    </>,
                    document.body
                )}
        </div>
    );
};
export default DatePicker;
