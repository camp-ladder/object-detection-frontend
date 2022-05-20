const upload_modal_button = document.querySelector('.upload_modal_button')

const upload_modal = document.querySelector('.upload_modal');
const um_preview_image_box = document.getElementById('um_preview_image_box')
const um_p_ib_wrapper = document.getElementById('um_p_ib_wrapper')
const um_desc = document.querySelector('.um_desc');
// const um_header_next_btn = document.querySelector('.um_header_next_btn')
const um_header_upload_btn = document.querySelector('.um_header_upload_btn');
const um_comment_page = document.querySelector('.um_comment_page');
const mh_i_square = document.querySelector('.mh_i_square')
const upload_modal_wrapper = document.querySelector('.upload_modal_wrapper')
const ul_bb_prev = document.querySelector('.ul_bb_prev')
const ul_bb_next = document.querySelector('.ul_bb_next')
const um_preview_images = document.querySelector('.um_preview_images')


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
        um_desc.style.background = "gray";
    }
});

// upload_modal.addEventListener('dragleave', function (e) {
//     e.preventDefault();
//     um_desc.style.background = "gray";
// });


const formData = new FormData(); // new: 새로운 객체를 만들어서 리턴
let file_length = 0

upload_modal.addEventListener('drop', function (e) {
    e.preventDefault();
    const data = e.dataTransfer; // 드래그 앤 드롭 동작에 관한 정보가 담김(이미지 파일 정보)

    // 이미지 파일 제한 기능
    if (!isValid(data)) return;

    // 이미지 박스 가로 길이 설정
    um_p_ib_wrapper.style.width = 400 * data.files.length + "px"
    file_length = data.files.length

    // 이미지 프리뷰
    for (let i = 0; i < data.files.length; i++) {
        formData.append(data.files[i].name, data.files[i])

        const reader = new FileReader(); // 파일 읽는 함수
        reader.onload = () => {
            um_p_ib_wrapper.innerHTML +=
                `
            <img class="um_preview_images" src="${reader.result}">
            `
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

// 이미지 캐러셀 처리
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

// 코멘트 작성 파트
// um_header_next_btn.addEventListener('click', function () {
//     um_header_next_btn.style.display = 'none'
//     // upload_modal.style.transition = 500 + "ms"
//     // upload_modal.style.width = 800 + "px"

//     setTimeout(() => {
//         um_header_upload_btn.style.display = 'flex'
//         um_comment_page.style.display = 'block'
//         um_preview_images.style.borderRadius = "0px 0px 0px 0px";
//     }, 500)
// })


// 업로드 실행
um_header_upload_btn.addEventListener('click', () => {
    // let content_give = $('#um_cp_ma_f_input').val() // 작성글
    // formData.append('content', content_give)
    $.ajax({
        type: "POST",
        url: "http://127.0.0.1:5000/posts",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            alert(response['msg'])
            window.location.reload()
        },

    })

})


// 바깥 클릭 시 모달 숨김
upload_modal_wrapper.addEventListener('click', function (e) {
    if (e.target.classList.contains('upload_modal_wrapper')) {
        upload_modal_wrapper.style.display = 'none'
    }
})