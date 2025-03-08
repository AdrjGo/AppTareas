import React from "react";
import DateTimePicker, { getDefaultStyles } from "react-native-ui-datepicker";

interface Props {
  selected: any;
  setSelected: any;
  minDate?: any;
}

function CalendarPicker({ selected, setSelected, minDate }: Props) {
  const defaultStyles = getDefaultStyles();
  return (
    <>
      <DateTimePicker
        mode="single"
        date={selected}
        minDate={minDate}
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
          day_label: {
            color: "#FFFFFF",
          },
          year_selector_label: {
            color: "#ffffff",
          },
          month_selector_label: {
            color: "#FFFFFF",
            textTransform: "uppercase",
          },
          button_next: {
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
          },
          button_prev: {
            backgroundColor: "#FFFFFF",
            borderRadius: 10,
          },
        }}
      />
    </>
  );
}

export default CalendarPicker;
