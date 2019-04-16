const apiKey = "aIE7NRdN10TQouXzBIRaqdd5CrfLpaPB7zwD9Igc";

const baseUrl =  " https://api.nasa.gov/planetary/apod";

function formatMyParams(params){ //this function will be put into the getImage function to format its params
    const queryItems = Object.keys(params) //create an array of the keys in params
    .map(key=> `${key}=${encodeURIComponent(params[key])}`) //for each key, create a string with the key = to the key's value
    return queryItems.join('&'); //return string of keys and values seperated by &
};

function getImage(dateofBirth){
   const params={ 
    'api_key':apiKey,
    'date': `${dateofBirth}`, //create the params - apiKey and query which is the date here.
}
const queryString= formatMyParams(params)//add created params to formatting function
const url = baseUrl + '?' + queryString; //add the base url and the now formatted params together with '?'
console.log('URL is', url); //console.log result
const theResult=$('#results')//create a new variable and have it equal to the results element
theResult.empty()//remove content of the element
fetch(url)//start the promise of fetch
.then(response =>{ //create a function called "response"
    if (response.ok){ //if the response is ok then...
        return response.json(); //return the json object to this function
    }
    throw new Error(response.statusText); //if not ok - inform of error
})
.then(responseJson=>{ //then console the json response
    console.log('JSON Response:', responseJson)
})
.catch(err=>{ //catch network failures
    console.error(err)
    $('#jsErrorMessage').text(`Something went wrong: ${err.message}`);
})
}

function displayImage(responseJson){//this function takes the json response in as an argument and applies its output to the html element
   $('#results').empty()
   $('#results').append(`<p id="media" >${responseJson.media_type}</p> <p id="date">${responseJson.date}</p><p id="title" ${responseJson.title}</p>`)
   $('#results').removeClass('hidden')


}
function watchForm(responseJson){
    $('form').submit(event=>{//watch for user input - put it all together once the user submits
        event.preventDefault();
        const searchDob=$('#query').val();
        getImage(searchDob);
        displayImage(responseJson).append();
      
      });
}
$(watchForm);