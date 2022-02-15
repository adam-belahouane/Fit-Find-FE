const NormalHeader = ({data}) => {
    const {firstName, lastname, avatar, city} = data
    return(
        <div className="Pro-user-con">
      <div className="img-text">
        {avatar?
        <img src={avatar} className="Pro-user-Image" />:
        <img src="https://via.placeholder.com/150" className="Pro-user-Image" />}
        <div className="mx-2">
          <h2>{firstName} {lastname}</h2>
          <h6>{city}</h6>
        </div>
      </div>
    </div>
    )
}

export default NormalHeader