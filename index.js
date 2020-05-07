const api = {
    base: "https://api.openweathermap.org/data/2.5/weather?",
    key: "&appid=4888b917fdb6c50598967f027332aff0",
    lang: "&units=metric&lang=pt"
}

window.onload = mainFunc();

let app = document.querySelector('.app-wrap')
let city = document.querySelector('.city')
let date = document.querySelector('.date')
let temp = document.querySelector('.temp')
let icon = document.getElementById('icon')
let weather = document.querySelector('.weather')
let hilow = document.querySelector('.hi-low')

function Temp(value) {
    this.value = value;
    this.temperatura = Math.round(value.main.temp);
    this.tempmin = Math.round(value.main.temp_min);
    this.tempmax = Math.round(value.main.temp_max);
}

function DataCompleta() {
    let hoje = new Date();

    let weekdays = ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado']
    let weekDay = hoje.getDay();
    let diaSemana = weekdays[weekDay]

    let months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    let month = hoje.getMonth();
    let mes = months[month]

    let diaMes = hoje.getDate();
    let ano = hoje.getFullYear();

    this.diaSemana = diaSemana;
    this.diaMes = diaMes;
    this.mes = mes;
    this.ano = ano;
}

function mainFunc() {
    navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude
        let long = position.coords.longitude

        fetch(`${api.base}lat=${lat}&lon=${long}${api.key}${api.lang}`)
            .then(data => {
                return data.json()
            })
            .then((result) => {
                console.log(result)
                let img = `http://openweathermap.org/img/w/${result.weather[0].icon}.png`
                icon.setAttribute("src", img);

                if (result.weather[0].main == 'Clouds') {
                    app.style.backgroundImage = "url('https://images.unsplash.com/photo-1500390365106-166bb67248d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80')";
                } else if (result.weather[0].main == 'Clear') {
                    app.style.backgroundImage = "url('https://images.unsplash.com/photo-1444454630941-1ebcd207e6b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')";
                } else if (result.weather[0].main == 'Rain') {
                    app.style.backgroundImage = "url('https://images.unsplash.com/photo-1493314894560-5c412a56c17c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')";
                } else if (result.weather[0].main == 'Snow') {
                    app.style.backgroundImage = "url('https://images.unsplash.com/photo-1457269449834-928af64c684d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')";
                } else if (result.weather[0].main == 'Thunderstorm') {
                    app.style.backgroundImage = "url('https://images.unsplash.com/photo-1566996675874-f00a61522322?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=728&q=80')";
                } else if (result.weather[0].main == 'Drizzle') {
                    app.style.backgroundImage = "url('https://images.unsplash.com/photo-1541919329513-35f7af297129?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')";
                }

                let dados = new Temp(result);
                let data = new DataCompleta();

                city.innerHTML = `${result.name}, ${result.sys.country}`
                date.innerHTML = `${data.diaSemana}, ${data.diaMes} ${data.mes} ${data.ano}`
                temp.innerHTML = `${dados.temperatura}ºc`
                weather.innerHTML = `${result.weather[0].description}`
                hilow.innerHTML = `mínima: ${dados.tempmin}ºc <br> máxima: ${dados.tempmax}ºc`
            })
    })
}

const search = document.querySelector(".search-box");
search.addEventListener('keypress', pesquisa);

function pesquisa(value) {
    if (value.keyCode == 13) {
        getResult(search.value);
        search.value = '';
    }
}

function getResult(value) {
    fetch(`${api.base}q=${value}${api.key}${api.lang}`)
        .then(data => {
            return data.json()
        })
        .then((result) => {
            console.log(result)
            let img = `http://openweathermap.org/img/w/${result.weather[0].icon}.png`
            icon.setAttribute("src", img);

            if (result.weather[0].main == 'Clouds') {
                app.style.backgroundImage = "url('https://images.unsplash.com/photo-1500390365106-166bb67248d6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80')";
            } else if (result.weather[0].main == 'Clear') {
                app.style.backgroundImage = "url('https://images.unsplash.com/photo-1444454630941-1ebcd207e6b7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')";
            } else if (result.weather[0].main == 'Rain') {
                app.style.backgroundImage = "url('https://images.unsplash.com/photo-1493314894560-5c412a56c17c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')";
            } else if (result.weather[0].main == 'Snow') {
                app.style.backgroundImage = "url('https://images.unsplash.com/photo-1457269449834-928af64c684d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')";
            } else if (result.weather[0].main == 'Thunderstorm') {
                app.style.backgroundImage = "url('https://images.unsplash.com/photo-1566996675874-f00a61522322?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=728&q=80')";
            } else if (result.weather[0].main == 'Drizzle') {
                app.style.backgroundImage = "url('https://images.unsplash.com/photo-1541919329513-35f7af297129?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80')";
            }

            let dados = new Temp(result);
            let data = new DataCompleta();

            city.innerHTML = `${result.name}, ${result.sys.country}`
            date.innerHTML = `${data.diaSemana}, ${data.diaMes} ${data.mes} ${data.ano}`
            temp.innerHTML = `${dados.temperatura}ºc`
            weather.innerHTML = `${result.weather[0].description}`
            hilow.innerHTML = `mínima: ${dados.tempmin}ºc <br> máxima: ${dados.tempmax}ºc`
        })
}
