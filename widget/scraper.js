const widget = document.querySelector('#app')

const getResults = async () => {
    try {

        const res = await fetch('http://127.0.0.1:8005/lotto-result')
        const data = await res.json();

        const { drawDate, drawResults, link } = data;

        widget.innerHTML = `
        <div class="widget success">
            <h2 class='title'>Dialy Lotto Results</h2>
            <p class="full-data">${drawDate}</p>
            <h1 class="winning-numbers">
                <span class="numbers">${drawResults[0]}</span>
                <span class="numbers">${drawResults[1]}</span>
                <span class="numbers">${drawResults[2]}</span>
                <span class="numbers">${drawResults[3]}</span>
                <span class="numbers">${drawResults[4]}</span>
            </h1>
            <a class= "play-online " href="${link}">Play Lotto Online</a>
        </div>`
    }catch (error){
        widget.innerHTML =`
        <div className="widget error">
            <h2>Something went wrong!</h2>
            <h4>Could not connect to the scarper api.</h4>
        </div> `
    }
}

getResults()