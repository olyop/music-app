const determineReleased = released => ((new Date(released)).getTime() / 1000) / 86400

export default determineReleased
