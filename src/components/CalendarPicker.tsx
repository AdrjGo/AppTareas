import React from "react";
import DateTimePicker, { getDefaultStyles } from "react-native-ui-datepicker";

interface Props {
  selected: any;
  setSelected?: any;
}

function CalendarPicker({ selected, setSelected }: Props) {
  const defaultStyles = getDefaultStyles();
  return (
    <>
      <DateTimePicker
        mode="single"
        date={selected}
        onChange={({ date }) => setSelected(date)}
        locale={"es-ES"}
        monthCaptionFormat="full"
        use12Hours={true}
        className="p-1"
        styles={{
          ...defaultStyles,
          selected: {
            backgroundColor: "#52525b",
          },
          day: {
            color: "#000000",
            fontWeight: "600",
            fontSize: 16,
          },
          day_label: {
            color: "#FFFFFF",
            fontWeight: "bold",
          },
          year_selector_label: {
            color: "#ffffff",
            fontWeight: "bold",
          },
          month_selector_label: {
            color: "#FFFFFF",
            textTransform: "uppercase",
            fontWeight: "bold",
          },
          button_next: {
            backgroundColor: "#27272a",
            borderRadius: 10,
          },
          button_prev: {
            backgroundColor: "#27272a",
            borderRadius: 10,
          },
        }}
      />
    </>
  );
}

export default CalendarPicker;
