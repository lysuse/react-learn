import React from 'react';

const MyComponents = {
  DatePicker: function DatePicker(props) {
    return <div>Image a {props.color} datepicker here.</div>
  }
}

export default function BlueDatePicker() {
  return <MyComponents.DatePicker color="blue" />
}
