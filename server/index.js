async function checkLogin() {
    const email = await getName();
    console.log(email);
    const useremail = document.getElementById("useremail")
    const loginoutButton = document.getElementById("button-loginout")

    if (email) {
        useremail.innerText = email
        loginoutButton.innerText = "로그아웃"
        loginoutButton.setAttribute("onclick", "logout()")
    }
    else {
        useremail.innerText = "로그인해주세요."
        loginoutButton.innerText = "로그인"
        loginoutButton.setAttribute("onclick", "location.href='/templates/login.html'")
    }
}

// 바로 실행
checkLogin();