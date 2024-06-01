import PropTypes from "prop-types"
import {
  BsDice1Fill,
  BsDice2Fill,
  BsDice3Fill,
  BsDice4Fill,
  BsDice5Fill,
  BsDice6Fill,
} from "react-icons/bs"

function Die(props) {
  const svgArray = [
    <BsDice1Fill
      key="die-1"
      aria-hidden="true"
      className={props.isHeld ? "selected" : ""}
    />,
    <BsDice2Fill
      key="die-2"
      aria-hidden="true"
      className={props.isHeld ? "selected" : ""}
    />,
    <BsDice3Fill
      key="die-3"
      aria-hidden="true"
      className={props.isHeld ? "selected" : ""}
    />,
    <BsDice4Fill
      key="die-4"
      aria-hidden="true"
      className={props.isHeld ? "selected" : ""}
    />,
    <BsDice5Fill
      key="die-5"
      aria-hidden="true"
      className={props.isHeld ? "selected" : ""}
    />,
    <BsDice6Fill
      key="die-6"
      aria-hidden="true"
      className={props.isHeld ? "selected" : ""}
    />,
  ]

  return (
    <button
      type="button"
      onClick={props.holdDice}
    >
      <span className="visually-hidden">{props.value}</span>
      {svgArray[props.svgIndex]}
    </button>
  )
}

Die.propTypes = {
  value: PropTypes.number,
  isHeld: PropTypes.bool,
  holdDice: PropTypes.func,
  svgIndex: PropTypes.string,
}

export default Die
