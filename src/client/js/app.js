
//APIs
//geonames
const geonamesUrl = 'http://api.geonames.org/searchJSON?q=';
const username = 'AlShaimaa_';
//weatherbit
const weatherUrl = 'http://api.weatherbit.io/v2.0/forecast/daily?';
const key = '1093f04ff33c4a02aa77fdfd7476d150	';
//pixabay
const pixabayUrl = 'https://pixabay.com/api/?';
const pixkey = '18108807-e6ab44cb02a0289aaca332f95';
const url = '&image_type=photo&pretty=true&category=places';




//Main function to do the api requests
export async function handelSubmit(e){
    //Checking for location if is added
    const location = document.getElementById('city').value;
    if(!location){
        return alert('Please type the city name you want to travel to it');
    }
    const dateLeaving = document.getElementById('leaving').value;
    const dateReturning = document.getElementById('returning').value;
    const img = document.getElementById('img');
    const lengthOfTrip = dateReturning - dateLeaving;

    //API call for geonames
     const coordinates = await getData(geonamesUrl + location + '&maxRows=10&username=' + username);
     const lat = coordinates.geonames[0].lat;
     const lng = coordinates.geonames[0].lng;

     //Get weatherbit API based on lng and lat we got from geonames API
     const weather = await getData(weatherUrl + 'lon=' + lng + '&key=' + key + '&lat=' + lat);

     //Pixabay API to get the picture of place
     const picture = await getData(pixabayUrl + 'key=' + pixkey + '&q=' + location + url);
     document.querySelector('.resultPlece').classList.remove('hide');

        //post data to server
         return postData('/forecast',
          {
            minTemp: weather.data[0].min_temp,
            maxTemp:weather.data[0].max_temp,
            description: weather.data[0].weather.description,
            country: coordinates.geonames[0].countryName,
            cityName: coordinates.geonames[0].toponymName,
            picture: picture.hits[0].largeImageURL,
            dateLeaving: dateLeaving,
            dateReturning: dateReturning
         })

            //Get data from server
          .then(
              function(response){
               return getData('/save');
             }
           )

            //Update UI by adding data to the front-end page
          .then (
            function(update){
            const weather = `Min Temperature: ${update.minTemp}C - Max temperature: ${update.maxTemp}C`;
            document.getElementById('weather').innerHTML = weather;
            document.getElementById('country').innerText = update.country;
            document.getElementById('city').innerHTML = update.cityName;
            document.getElementById('description').innerHTML = update.description;
            document.getElementById('leavingdate').innerHTML = update.dateLeaving;
            document.getElementById('returningdate').innerHTML = update.dateReturning;
            
            
            document.getElementById('tripDuration').innerHTML =update.lengthOfTrip;
            img.setAttribute('src', `${update.picture}`);

        }
    );
}

export const getData = async(url = '')=>{
    const response = await fetch(url);
    if(response.status === 404){
        alert('Error');
    }
    try{
        const data = response.json();
        return data;

    }catch(err){
        alert(err);
    }
};

 export const postData = async (url = '', data = {}) => {
    console.log(data);
       const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        console.log(newData);
        return newData;

    } catch(err) {
        console.log(err);
    }
};

