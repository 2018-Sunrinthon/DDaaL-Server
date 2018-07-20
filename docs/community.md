# GET : /community/list/:page

    커뮤니티 리스트를 받아오는 쿼리입니다

> Require

    파라미터 규격입니다

> Response Success

    status : 200
    data : Post Schema 강조

> Response Fail

    status : 404
    message : No Post Data

> Response Fail

    status : 403
    message : Overflow Post Page

# POST : /community/post/add

    커뮤니티 글을 추가하는 쿼리입니다
> Require

    post_title : 글 제목입니다
    post_content : 글 내용입니다
    post_hash_tag : 헤시태그 어레이입니다
    author_token : 글쓴이 토큰입니다
    alba_latitude : 알바장소 위도입니다
    alba_longitude : 알바장소 경도입니다
    alba_time : 알바 시간입니다
    alba_pay : 알바 시급이니다
    call : 고용주 전화번호 입니다
    post_profile_image_url : 글 미리보기 이미지입니다

> Response Success
    
    stauts : 200
    message : "Save Success"

> Response Fail

    status : 404
    message : Location Not Found

> Response Fail

    status : 401
    message : Unauthorized token

> Response Fail

    stauts : 403
    message : 존나 다양

# /community/check/admin

    주인장인지 체크하는 쿼리

> Require

    token : 유저 토큰

> Response Success

    status:200,
    message:true

    주인장이란 뜻

> Response Success

    status:200,
    message:false

    알바생이란 뜻

> Response Fail

    status:401
    message:"Unauthorized Token"

# /community/add/comment

    댓글 추가하는 쿼리

> Require

    post_token : 글 토큰
    comment_user_token : 댓글단 유저 토큰
    comment_user_name : 댓글단 유저 이름
    comment_text : 댓글내용
    comment_puff_amount : 땜빵 비

> Response Success

    status : 200
    message : Save Success

> Response Fail

    status : 401
    message : Unauthorized Token

> Response Fail

    stauts : 404
    message : Post Not Found