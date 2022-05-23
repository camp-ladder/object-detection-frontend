const backend_base_url_2 = "http://127.0.0.1:9999"
const frontend_base_url_2 = "http://127.0.0.1:5500"

// select값 가져오기(getElementBy로 바꿔까 고민 중)
const upload_modal_button = document.querySelector('.upload_modal_button')
const upload_modal = document.querySelector('.upload_modal');
// const um_header_exit_btn = document.querySelector('.um_header_exit_btn')
const um_header_upload_btn = document.querySelector('.um_header_upload_btn');
const um_preview_image_box = document.getElementById('um_preview_image_box')
const um_p_ib_wrapper = document.getElementById('um_p_ib_wrapper')
const um_preview_images = document.querySelector('.um_preview_images')
const um_desc = document.querySelector('.um_desc');
const um_cp_ma_form = document.querySelector('.um_cp_ma_form')
const um_cp_ma_f_input = document.getElementById('um_cp_ma_f_input');
const um_save_button_box = document.querySelector('.um_save_button_box')
const um_save_button = document.querySelector('.um_save_button')
const um_exit_button = document.querySelector('.um_exit_button')

const um_comment_ready = document.querySelector('.um_comment_ready');
const um_comment_page = document.querySelector('.um_comment_page');
const um_cp_ma_result = document.querySelector('.um_cp_ma_result');
const show_result = document.getElementById('show_result');
const opinion = document.getElementById('opinion');

const mh_i_square = document.querySelector('.mh_i_square')
const upload_modal_wrapper = document.querySelector('.upload_modal_wrapper')
const ul_bb_prev = document.querySelector('.ul_bb_prev')
const ul_bb_next = document.querySelector('.ul_bb_next')



upload_modal_button.addEventListener('click', function () {
    upload_modal_wrapper.style.display = 'flex';
})


function isValid(data) {
    if (data.types.indexOf('Files') < 0)  // indexOf: 배열에서 지정된 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고 존재하지 않으면 -1을 반환
        return false;
    for (let i = 0; i < data.files.length; i++) {
        if (data.files[i].type.indexOf('image') < 0) {
            alert('이미지 파일만 업로드 가능합니다.')
            return false;
        }
    }
    if (data.files[0].size >= 1024 * 1024 * 50) {
        alert('50MB 이상인 파일은 업로드 할 수 없습니다.')
    }
    return true;
}


upload_modal.addEventListener('dragover', function (e) {
    e.preventDefault(); // preventDefault: 기본으로 정의된 이벤트(e: )를 작동하지 못하게 하는 메서드
    // um_desc.style.color = 'rgb(65, 147, 239)'
});

upload_modal.addEventListener("dragenter", function (e) {
    if (e.target.className == "um_desc") {
        um_desc.style.background = "#cfc6c68c";
    }
});

upload_modal.addEventListener('dragleave', function (e) {
    e.preventDefault();
    um_desc.style.background = "none";
});


const formData = new FormData(); // new: 새로운 객체를 만들어서 리턴
let file_length = 0

upload_modal.addEventListener('drop', function (e) {
    e.preventDefault();
    const data = e.dataTransfer; // 드래그 앤 드롭 동작에 관한 정보가 담김(이미지 파일 정보)

    // 이미지 파일 제한 기능
    if (!isValid(data)) return;

    // 이미지 박스 가로 길이 설정
    // um_p_ib_wrapper.style.width = 400 * data.files.length + "px"
    file_length = data.files.length

    // 이미지 프리뷰
    for (let i = 0; i < data.files.length; i++) {
        formData.append(data.files[i].name, data.files[i])

        const reader = new FileReader(); // 파일 읽는 함수
        reader.onload = () => {
            um_preview_images.setAttribute("src", reader.result)
            // um_p_ib_wrapper.innerHTML +=
            //     `
            // <img class="um_preview_images" src="${reader.result}">
            // `
        }

        reader.readAsDataURL(data.files[i]) // readAsDataURL: 컨텐츠를 특정 File에서 읽어 옴
    }

    um_preview_image_box.style.display = 'block'
    um_desc.style.display = 'none'
    um_header_upload_btn.style.display = 'flex'

    if (data.files.length > 1) {
        ul_bb_next.style.visibility = 'visible'
    }
});

// // 이미지 캐러셀 처리
// ul_bb_cur_idx = 0
// ul_bb_next.addEventListener('click', function () {
//     ul_bb_prev.style.visibility = 'visible'
//     if (++ul_bb_cur_idx == file_length - 1) {
//         ul_bb_next.style.visibility = 'hidden'
//     }
//     um_p_ib_wrapper.style.transition = 500 + 'ms'
//     um_p_ib_wrapper.style.transform = "translate3d(-" + (400 * ul_bb_cur_idx) + "px,0px,0px)"
// })
// ul_bb_prev.addEventListener('click', function () {
//     if (--ul_bb_cur_idx == 0) {
//         ul_bb_prev.style.visibility = 'hidden'
//     }
//     um_p_ib_wrapper.style.transform = "translate3d(-" + (400 * ul_bb_cur_idx) + "px, 0px, 0px)"
//     ul_bb_next.style.visibility = 'visible'
//     um_p_ib_wrapper.style.transition = 500 + 'ms'
// })


// // 업로드 및 측정 실행
// um_header_upload_btn.addEventListener('click', async () => {
//     console.log(um_cp_ma_f_input)
//     let age_give = um_cp_ma_f_input.value // 입력값
//     formData.append('input_age', age_give)

//     const response = await fetch(`${backend_base_url_2}/calculator`, {
//         method: 'POST',
//         body: formData,
//         headers: {
//             'Authorization': localStorage.getItem("token")
//         },

//     })
//     console.log(response)
//     response_json = await response.json()
//     console.log(response_json)
//     getFileInfo(response_json.result)
// })


// 업로드 및 측정 실행
um_header_upload_btn.addEventListener('click', async () => {
    let age_give = um_cp_ma_f_input.value // 입력값
    formData.append('input_age', age_give)
    const response_json = await postCalculator(formData)
    getFileInfo(response_json.result)
})


// 측정 결과 보여주기
async function getFileInfo(result) {

    // const response = await fetch(`http://127.0.0.1:5000/result/${filename}`, {
    //     method: 'GET',
    // })
    // response_json = await response.json()
    // console.log(response_json)

    // 구현 데이터(임시)
    const result_id = result._id
    const result_img_name = result.result_title
    const input_age = result.input_age
    const result_age = result.age_pred
    console.log(`${backend_base_url_2}/${result_img_name}`)
    // model_result = response_json.model_result
    // img_name = model_result.img_name
    // result_age = model_result.result_age

    um_preview_images.setAttribute("src", `${backend_base_url_2}/${result_img_name}`)
    show_result.innerText = result_age
    if (input_age - result_age > 0) {
        opinion.innerText = "동안이시네요!"
    } else if (input_age - result_age == 0) {
        opinion.innerText = "정확합니다!"
    } else {
        opinion.innerText = "너무 속상해 하지 마세요"
    }

    um_save_button.setAttribute("onclick", `saveData('${result_id}')`) // 저장하기 버튼에 _id 보내줌
    um_exit_button.setAttribute("onclick", `exit('${result_id}')`)

    modalTransform()
}


// 모달 형태 변환
function modalTransform() {
    um_header_upload_btn.style.display = 'none'
    um_cp_ma_form.style.display = 'none'
    upload_modal.style.transition = 500 + "ms"
    upload_modal.style.height = 550 + "px"
    um_save_button_box.style.display = 'flex'
    um_comment_ready.style.display = 'block'

    setTimeout(() => {
        upload_modal.style.transition = 500 + "ms"
        upload_modal.style.height = 800 + "px"
        um_comment_ready.style.display = 'none'
        um_comment_page.style.display = 'block'
    }, 3000)
}


// // 저장 버튼 클릭 시 원본 데이터 저장, 모달 숨김
// async function saveData(result_id) {

//     formData.append('result_id', result_id) // result_id 함께 저장

//     const response = await fetch(`${backend_base_url_2}/post`, {
//         method: 'POST',
//         body: formData,
//         headers: {
//             'Authorization': localStorage.getItem("token")
//         },
//     })
//     response_json = await response.json()
//     console.log(response_json)
//     alert(response_json['msg'])
//     upload_modal_wrapper.style.display = 'none'
//     window.location.reload()
// }


// 저장 버튼 클릭 시 원본 데이터 저장, 모달 숨김
async function saveData(result_id) {
    formData.append('result_id', result_id) // result_id 함께 저장
    const response_json = await postFile(result_id)
    alert(response_json['msg'])
    upload_modal_wrapper.style.display = 'none'
    window.location.reload()
}


// // 확인 버튼 클릭 시 모달 숨김
// async function exit(result_id) {

//     const response = await fetch(`${backend_base_url_2}/result/${result_id}`, {
//         method: 'DELETE',
//         // headers: {
//         //     'Authorization': localStorage.getItem("user_token")
//         // }
//     })
//     response_json = await response.json()
//     console.log(response_json)
//     upload_modal_wrapper.style.display = 'none'
//     window.location.reload()
// }


// 확인 버튼 클릭 시 모달 숨김
async function exit(result_id) {
    const response_json = await deleteResult(result_id)
    console.log(response_json['msg'])
    upload_modal_wrapper.style.display = 'none'
    window.location.reload()
}


// 바깥 클릭 시 모달 숨김
upload_modal_wrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('upload_modal_wrapper')) {
        upload_modal_wrapper.style.display = 'none'
        window.location.reload()
    }
})