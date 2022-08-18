async function checkLogin() {
    const email = await getName();

    const id_button = document.getElementById('id_button')
    const wellcome_msg = document.getElementById('wellcome_msg')
    if (email) {
        id_button.innerHTML = email
        id_button.style.display = 'block'
        wellcome_msg.innerHTML = "님 환영합니다."
    }
    else {
        wellcome_msg.innerHTML = "로그인을 해주세요."
        wellcome_msg.style.cursor = 'pointer'
        wellcome_msg.setAttribute("onclick", "location.href='/templates/login.html'")
    }
}
const id_button = document.getElementById('id_button')

if (window.localStorage.getItem('token') == null) {
    getkakao();
}

checkLogin();