import PropTypes from 'prop-types'

export default function Die(props){
    return(
        <>
            <button>{props.value}</button>
        </>
    )
}

Die.propTypes = {
    value: PropTypes.number.isRequired,
}