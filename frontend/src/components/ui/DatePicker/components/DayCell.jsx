const DayCell = ({ day, isSelected, onClick }) => (
    <div
        onClick={onClick}
        className={`cursor-pointer text-sm rounded-full p-1
      ${
          isSelected
              ? "bg-background-button-primary/25 text-background-button-primary font-bold"
              : "hover:bg-background-info/50"
      }`}
    >
        {day}
    </div>
);

export default DayCell;
