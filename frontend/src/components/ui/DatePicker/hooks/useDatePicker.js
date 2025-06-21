import { useEffect, useRef, useState } from "react";
import { MONTH_NAMES } from "../config";

export const useDatePicker = () => {
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState(null);
    const [month, setMonth] = useState(new Date().getMonth());
    const [year, setYear] = useState(new Date().getFullYear());
    const [noOfDays, setNoOfDays] = useState([]);
    const [blankDays, setBlankDays] = useState([]);
    const pickerRef = useRef(null);

    // calcula días/espacios cada vez que cambian mes o año
    useEffect(() => {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        setBlankDays([...Array(firstDay).keys()]);
        setNoOfDays([...Array(daysInMonth).keys()].map((i) => i + 1));
    }, [month, year]);

    // cierra si se hace click fuera
    useEffect(() => {
        const handler = (e) => {
            if (pickerRef.current && !pickerRef.current.contains(e.target))
                setShow(false);
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const format = (date) =>
        date
            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
                  2,
                  "0"
              )}-${String(date.getDate()).padStart(2, "0")}`
            : "";

    return {
        show,
        setShow,
        selected,
        setSelected,
        month,
        setMonth,
        year,
        setYear,
        noOfDays,
        blankDays,
        pickerRef,
        format,
    };
};
