const route = (event) => {
    event.preventDefault()

    window.history.pushState(null, null, event.currentTarget.href)
    handleLocation(event.currentTarget)
}

const makeLinkActive = () => {

    document.querySelectorAll('ul li a')
        .forEach(a => a.classList.remove('active'))

    const { pathname } = location

    const currentLink = document.querySelector('a[href="' + pathname + '"]')

    currentLink.classList.add('active')
}

const addCurrentPageAsClassToBody = () => {
    const { pathname } = location
    const route = routes[pathname]
    const [_, pages, file] = route.split('/')
    const [className] = file.split('.')
    document.body.setAttribute('class', className)
}

const routes = {
    "/": "/pages/home.html",
    "/gallery": "/pages/gallery.html"
}

const handleLocation = async () => {
    makeLinkActive()
    addCurrentPageAsClassToBody()

    // pegar o caminho atual que estou
    const { pathname } = location

    // pegar o caminho onde estão meus arquivos (pages)
    const route = routes[pathname]

    // fazer a leitura dos arquivos .html (pages)
    const html = await fetch(route).then(res => res.text())

    // colocar conteudo do html no elemento #app
    document.getElementById('app').innerHTML = html
}

handleLocation()