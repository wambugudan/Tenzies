import PropTypes from 'prop-types'

export default function Die(props){
    
    const buttonStyle = {
        backgroundColor:props.isHeld ? "#59e391" : "white"
    }

    return(
        <>
            <button 
                onClick={() => props.hold(props.id)} 
                style={buttonStyle}
            >
                {props.value}
            </button>
        </>
    )
}

Die.propTypes = {
    value: PropTypes.number.isRequired,
    isHeld: PropTypes.bool.isRequired,
    hold: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
}