import React from 'react';


function Form() {
  return (
  <form id="form">
    <input id="locationA" placeholder="Location A" type="text"></input>
    <input id="locationB" placeholder="Location B" type="text"></input>
    <button id="submit" type="submit">Calculate Distance</button>
  </form>
  )
}

export default Form;