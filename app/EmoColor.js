export function getEmoColorFromEmoText(emo) {

    switch(emo) {
        case 'joy':  return 'rgb(255, 164, 42)';
        case 'sadness':  return 'rgb(16, 150, 189)';
        case 'fear':  return 'rgb(133, 208, 141)';
        case 'anger':  return 'rgb(255, 67, 63)';
        case 'disgust':  return 'rgb(129, 16, 147)';
        case 'surprise':  return 'rgb(102, 164, 123)';
        case 'anticipation':  return 'rgb(255, 124, 120)';
        case 'acceptance':  return 'rgb(193, 208, 73)';
    }
    
}