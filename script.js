

// variable declare
let txtElement = document.querySelector('textarea');
let sltElement = document.querySelector('select');
let btnElement = document.querySelector('button');
let synth = speechSynthesis;
let isSpeaking = true;

voiceList();

function voiceList() {
    for(let voice of synth.getVoices()) {
        // selecting voice name as a default option value
        let selected = (voice.name === 'Google US English') ? 'selected' : '';

        // creating option tag with passing voice name and language
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;

        // inserting option tag beforeend the select tag
        sltElement.insertAdjacentHTML('beforeend', option);
    }
}

synth.addEventListener('voiceschanged', voiceList);

function textToSpeech(text) {
    let utterance = new SpeechSynthesisUtterance(text);

    for(let voice of synth.getVoices()) {

        // if the available device voice name is equal to the user selected voice name
        // then set the speech voice to the user selected voice name
        if(voice.name === sltElement.value) {
            utterance.voice = voice;
        }
    }

    // speak the speech to selected text
    speechSynthesis.speak(utterance);
}

btnElement.addEventListener('click', (event) => {
    event.preventDefault();

    if(txtElement.value !== '') {

        // if speech is not currently in the process of speaking
        if(!synth.speaking) {
            textToSpeech(txtElement.value);
        }

        if(txtElement.value.length > 80) {

            // if isSpeaking is true then change it's value to false and resume the speech
            // else chenge it's valu to true and pause the speech
            if(isSpeaking) {
                synth.resume();
                isSpeaking = false;
                btnElement.innerText = 'Pause Speech';
            }
            else {
                synth.pause();
                isSpeaking = true;
                btnElement.innerText = 'Resume Speech';
            }

            // checking is speech in speaking process or not in every 100 ms
            // if not then set the value of isSpeaking to true and change the button text
            setInterval(() => {
                if(!synth.speaking && !isSpeaking) {
                    isSpeaking = true;
                    btnElement.innerText = 'Conver to Speech';
                }
            });
        }
        else {
            btnElement.innerText = 'Convert to Speech';
        }
    }
});