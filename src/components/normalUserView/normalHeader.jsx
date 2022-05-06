const NormalHeader = ({data}) => {
    const {firstName, lastname, avatar, city} = data
    return(
        <>
        <div className="top-header">
        <img
          src="https://wallpapercave.com/wp/fto5lYX.jpg"
        />
      </div>
      <div className="Pro-user-con">
      <div className="img-text">
        {avatar?
        <img src={avatar} className="Pdro-user-Image" />:
        <img src="https://icon-library.com/images/anonymous-person-icon/anonymous-person-icon-18.jpg" className="Pro-user-Image" />}
        <div className="mx-2">
          <h2 className="proheader-name">{firstName} {lastname}</h2>
          <h6 className="proheader-location">{city}</h6>
        </div>
      </div>
    </div>
    </>
    )
}

export default NormalHeader