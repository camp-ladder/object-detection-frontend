//////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// 주소
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
const backend_base_url = "http://127.0.0.1:5005"
const frontend_base_url = "http://127.0.0.1:5500"

//////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// 회원가입
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
async function userSignup() {
    // input 연결
    const signupData = {
        user_id: document.getElementById("Input-sign-id").value,
        email: document.getElementById("Input-sign-email").value,
        password: document.getElementById("Input-sign-password").value,
        password_check: document.getElementById("Input-sign-password-check").value,
        user_age: document.getElementById("Input-sign-age").value,
    }

    // 회원가입 api 연결
    const response = await fetch(`${backend_base_url}/signup`, {
        method: "POST",
        body: JSON.stringify(signupData)
    })

    console.log(response)

    // app.py 연결 확인
    response_json = await response.json()
    console.log(response_json)

    // 연결상태 = status 가 200 (정상 수신) 일 경우
    if (response_json.sign_error == 770) {
        alert("아이디 혹은 이메일을 입력하세요.")
        return
    } if (response_json.sign_error == 771) {
        alert("이메일 형식이 아닙니다.")
        return
    } if (response_json.sign_error == 772) {
        alert("비밀번호를 입력하세요.")
        return
    } if (response_json.sign_error == 773) {
        alert("비밀번호를 확인해주세요.")
        return
    } if (response_json.sign_error == 774) {
        alert("나이를 입력해주세요.")
        return
    } if (response_json.sign_error == 775) {
        alert("중복된 아이디입니다.")
        return
    } if (response_json.sign_error == 776) {
        alert("중복된 이메일입니다.")
        return
    } else {
        alert("가입 완료!")
        window.location.replace(`${frontend_base_url}/templates/login.html`);
    }
}

//////////////////////////////////////////////////////// 
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
// 로그인
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
////////////////////////////////////////////////////////
async function userLogin() {
    // 로그인 입력
    const loginData = {
        user_id: document.getElementById("Input-login-id").value,
        password: document.getElementById("Input-login-password").value,
    }

    // 로그인 연결
    const response = await fetch(`${backend_base_url}/login`, {
        method: 'POST',
        body: JSON.stringify(loginData)

    })

    console.log(response)

    response_json = await response.json();
    console.log(response_json)
    localStorage.setItem("token", response_json.token)

    if (response.status === 200) {
        alert("로그인 성공!")
    }
}