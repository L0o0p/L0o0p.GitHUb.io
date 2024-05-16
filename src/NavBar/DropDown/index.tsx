const DropDown = () => {
    const options = [
        'project A',
        'project B',
        'project C',
    ]

    const optionStyle = {
        width: '100%',
        height: '30px',
        backgroundColor: 'none',
        color: 'lightblue',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: 'lightblue solid 1px'
        // padding: '2px'
    }
    return (
        <div style={{ backgroundColor: 'white', border: 'lightblue solid 2px', gap: '2px', display: 'flex', flexDirection: 'column', width: '80px' }}>
            <div
                // key={option}
                style={optionStyle}
            >
                {options[0]}
            </div>
            <div
                // key={option}
                style={optionStyle}
            >
                {options[1]}
            </div>
            <div
                // key={option}
                style={optionStyle}
            >
                {options[2]}
            </div>
        </div>
    )
}