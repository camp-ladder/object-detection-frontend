
const backend_base_url = "http://127.0.0.1:9999"
const frontend_base_url = "http://127.0.0.1:5500"

async function userSignup() {
    const signupData = {
        user_id: document.getElementById("Input-sign-id").value,
        email: document.getElementById("Input-sign-email").value,
        password: document.getElementById("Input-sign-password").value,
        password_check: document.getElementById("Input-sign-password-check").value,
        user_age: document.getElementById("Input-sign-age").value,
    }

    const response = await fetch(`${backend_base_url}/signup`, {
        method: "POST",
        body: JSON.stringify(signupData)
    })
    response_json = await response.json()

    if (response_json.sign_error == 770) {
        alert("아이디 혹은 이메일을 입력하세요.")
        return
    } else if (response_json.sign_error == 771) {
        alert("이메일 형식이 아닙니다.")
        return
    } else if (response_json.sign_error == 772) {
        alert("비밀번호를 입력하세요.")
        return
    } else if (response_json.sign_error == 773) {
        alert("비밀번호를 확인해주세요.")
        return
    } else if (response_json.sign_error == 774) {
        alert("나이를 입력해주세요.")
        return
    } else if (response_json.sign_error == 775) {
        alert("중복된 아이디입니다.")
        return
    } else if (response_json.sign_error == 776) {
        alert("중복된 이메일입니다.")
        return
    } else {
        alert("가입 완료!")
        window.location.replace(`${frontend_base_url}/templates/login.html`);
    }
}

async function userLogin() {
    const loginData = {
        user_id: document.getElementById("Input-login-id").value,
        password: document.getElementById("Input-login-password").value,
    }

    const response = await fetch(`${backend_base_url}/login`, {
        method: 'POST',
        body: JSON.stringify(loginData)
    })

    response_json = await response.json();
    localStorage.setItem("token", response_json.token)

    if (response.status === 401) {
        alert("아이디와 비밀번호를 확인해주세요.")
        return
    } else if (response.status === 200) {
        alert("로그인 완료!")
        window.location.replace(`${frontend_base_url}/templates/index.html`);
    }
}

async function getName() {
    const response = await fetch(`${backend_base_url}/getuserinfo`, {
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })

    if (response.status == 200) {
        response_json = await response.json()
        return response_json.email
    } else {
        return null
    }
}

async function getkakao() {

    let url = new URL(window.location.href).searchParams.get('code')
    if (url != null) {
        const code_url = { code: url }
        const response = await fetch(`${backend_base_url}/oauth`, {
            method: 'POST',
            body: JSON.stringify(code_url)
        })
        response_json = await response.json();
        localStorage.setItem("token", response_json.token)
        window.location.reload()
    }
}

function logout() {
    localStorage.removeItem("token")
    window.location.replace(`${frontend_base_url}/templates/index.html`);
}

async function postCalculator(formData) {
    const response = await fetch(`${backend_base_url}/calculator`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': localStorage.getItem("token")
        },
    })
    response_json = await response.json()
    return response_json
}
async function postFile(result_id) {
    const response = await fetch(`${backend_base_url}/post`, {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': localStorage.getItem("token")
        },
    })
    response_json = await response.json()
    return response_json
}

async function deleteResult(result_id) {
    const response = await fetch(`${backend_base_url}/result/${result_id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem("token")
        }
    })
    response_json = await response.json()
    return response_json
}
