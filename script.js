const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loadingIcon = document.getElementById('loader')

function showLoadingSpinner(){
    loadingIcon.hidden = false
    quoteContainer.hidden = true
}

function removeLoadingSpinner(){
    if(!loadingIcon.hidden){
        quoteContainer.hidden= false
        loadingIcon.hidden = true
    }
}

async function getQuote(){
    showLoadingSpinner()
    const proxyUrl= 'https://cors-anywhere.herokuapp.com/'
    const apiUrl= 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json'
    try{
        const response = await fetch(proxyUrl + apiUrl)
        const data= await response.json()
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unknown'
        }else{
            authorText.innerText = data.quoteAuthor
        }
        if(data.quoteText.length > 100){
            quoteText.classList.add('long-quote')
        }else{
            quoteText.classList.remove('long-quote')
        }
        quoteText.innerText = data.quoteText
        removeLoadingSpinner()
    }catch(error){
        // console.log('Whoops! Come back later for more nuggets of wisdom', error)
        quoteText.innerText = 'Whoops! We are experiencing server overload. Please come back later for more nuggets of wisdom'
        authorText.innerText = ''
        setTimeout(() => getQuote(), 5000)
    }
}

function tweetQuote(){
    const quote= quoteText.innerText
    const author = authorText.innerText
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`
    window.open(twitterUrl, '_blank')
}

newQuoteBtn.addEventListener('click', getQuote)
twitterBtn.addEventListener('click', tweetQuote)

getQuote()