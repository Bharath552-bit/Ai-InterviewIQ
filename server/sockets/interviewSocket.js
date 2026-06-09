function interviewSocket(socket){
    socket.on("first-message",(data)=>{
        console.log(data)
        socket.emit("first-response",{message:"ok good now lets move to interview"})
    })
    socket.on("second-message",(data)=>{
        console.log(data)
        socket.emit("second-response",{message:"tell me about javaScript"})
    })
}

export default interviewSocket