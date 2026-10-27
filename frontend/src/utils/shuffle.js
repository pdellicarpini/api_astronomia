function shuffle(array){
    const copy = [...array];

    for (let i = copy.length -1; i > 0; i--) {
        const element = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[element]] = [copy[element], copy[i]];
    }
    return copy
}

export default shuffle;