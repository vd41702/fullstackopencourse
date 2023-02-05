const AlertNotif = ({ message, isNotif }) => {
    let color = isNotif? "green": "red"
    return (
        <div className="alert" style={{color}}>
            {message}
        </div>
    )
}

export default AlertNotif;



