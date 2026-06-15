import { toast } from "react-toastify"

function textToSpeech(text,setIsAiSpeaking){

    if(!text){
        toast.error("Please provide text")
        return
    }

    const speechSynthesis = window.speechSynthesis

    if(!speechSynthesis){
        toast("Browser not supporting speech, check your speaker settings")
        return
    }

    speechSynthesis.cancel()

    const utterence = new SpeechSynthesisUtterance(text)

    utterence.onstart = ()=>{
        setIsAiSpeaking(true)
    }

    utterence.onend = ()=>{
        setIsAiSpeaking(false)
    }

    speechSynthesis.speak(utterence)
}

let recognition = null
function startListening(onTranscript){

    const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if(!speechRecognition){
        toast("Your browser does not support speech")
    }

    recognition = new speechRecognition()

    recognition.continuous = true
    recognition.lang = "en-US"
    recognition.interimResults= true

    console.log(recognition)
    
    recognition.start()

    recognition.onresult = (data)=>{
        console.log(data,"from result")
        let text = ""

        for(let i=0;i<data.results.length;i++){
            text+=data.results[i][0].transcript +" "
        }

        onTranscript(text)

        console.log(text)
    }
}

function stopListening(){
    if(recognition){
        recognition.stop()
    }
}

export {textToSpeech,startListening,stopListening}