
function loadScript(src) {
    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    document.body.appendChild(script);
}
const uiRoot = "./ui"
if (process.env.NODE_ENV != "production") {
    loadScript(`http://localhost:3456/app.js`);
} else {
    loadScript(`${uiRoot}/js/app.js`);
}