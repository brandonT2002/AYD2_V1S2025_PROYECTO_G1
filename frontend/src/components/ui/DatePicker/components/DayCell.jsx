const DayCell = ({ day, isSelected, onClick }) => (
    <div
        onClick={onClick}
        className={`cursor-pointer text-sm rounded-full p-1
      ${
          isSelected
              ? "bg-background-info text-white"
              : "hover:bg-background-info/50"
      }`}
    >
        {day}
    </div>
);

export default DayCell;
