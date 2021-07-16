const MyMessage = ({ message }) => {
    if (message?.attachments?.length > 0) {
        return (
            <img
                src={message.attachments[0].file}
                alt="message-attachment"
                className="message-image"
                style={{ float: 'right' }}
            />
        );
    }

    let isSpam = false;
    const inputMsg = { 
                        "input" : message.text
                    };

    axios.post('/user', inputMsg )
    .then(function (response) {
        console.log(response);
        if(response.prediction == 1){
            isSpam = true;
        }
    
    }).catch(function (error) {
        console.log(error);
    });



    return (
        <div className="message" style={{ float: 'right', 
                                          marginRight: '18px', 
                                          color: isSpam ? 'red' : 'white', 
                                          backgroundColor: '#3B2A50' }}
                                        >
            {message.text}
        </div>
    );
};

export default MyMessage;