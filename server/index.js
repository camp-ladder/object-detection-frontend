async function checkLogin() {
    const email = await getName();
    console.log(email);
    const useremail = document.getElementById("useremail")
    const loginoutButton = document.getElementById("button-loginout")
    const mw_b_content = document.getElementById("mw_b_content")

    const id_button = document.getElementById('id_button')
    const wellcome_msg = document.getElementById('wellcome_msg')



    if (email) {
        id_button.innerHTML = email
        id_button.style.display = 'block'
        wellcome_msg.innerHTML = "님 환영합니다."
        // const id_button = document.createElement("button")
        // id_button.setAttribute("id", "id_button")
        // id_button.setAttribute("class", "id_button")
        // id_button.setAttribute("onclick", "profileModal()")
        // id_button.innerText = email

        // const wellcome_msg = document.createElement("span")
        // wellcome_msg.setAttribute("id", "wellcome_msg")
        // wellcome_msg.setAttribute("class", "wellcome_msg")
        // wellcome_msg.innerText = "님 환영합니다."

        // mw_b_content.appendChild(id_button)
        // mw_b_content.appendChild(wellcome_msg)

    }
    else {
        wellcome_msg.innerHTML = "로그인을 해주세요."
        wellcome_msg.style.cursor = 'pointer'
        wellcome_msg.setAttribute("onclick", "location.href='/templates/login.html'")
        // const login_msg = document.createElement("p")
        // login_msg.setAttribute("id", "login_msg")
        // login_msg.setAttribute("class", "login_msg")
        // login_msg.innerText = "로그인 해주세요."
        // mw_b_content.appendChild(login_msg)
        loginoutButton.innerText = "로그인"
        loginoutButton.setAttribute("onclick", "location.href='/templates/login.html'")
    }
}
// async function checkLogin() {
//     const email = await getName();
//     console.log(email);
//     const useremail = document.getElementById("useremail")
//     const loginoutButton = document.getElementById("button-loginout")

//     if (email) {
//         useremail.innerText = email + "님 환영합니다."
//         loginoutButton.innerText = "로그아웃"
//         loginoutButton.setAttribute("onclick", "logout()")
//     }
//     else {
//         useremail.innerText = "로그인해주세요."
//         loginoutButton.innerText = "로그인"
//         loginoutButton.setAttribute("onclick", "location.href='/templates/login.html'")
//     }
// }

// um_header_upload_btn.addEventListener('click', async () => {
//     const id_button = document.getElementById("id_button")

// })

const id_button = document.getElementById('id_button')


// 바로 실행
if (window.localStorage.getItem('token') == null) {
    getkakao();
}

checkLogin();
