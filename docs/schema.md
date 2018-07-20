# User
> id

    type : String
    유저 아이디를 의미합니다

> password

    type : String
    유저 비밀번호를 의미합니다

> token 

    type : String
    유저 토큰을 의미합니다

> user_data

    type : Object
    유저 정보를 가지고있는 오브젝트입니다

>> name 

    type : String
    유저 이름울 의미합니다

 >> age 

    type : Number
    유저 나이를 의미합니다

>> admin

    type : Boolean
    알바생인지 고용주인지 판단합니다
    true : 고용주
    false : 알바생

>> profile_image_url

    type : String
    유저 프로필 사진 url을 의미합니다

 > user_location

    type : Object
    유저 위치를 가지고있는 오브젝트입니다

 >> user_latitude

    type : String 
    유저 위도를 의미합니다

>> user_longitude

    type : String
    유저 경도를 의미합니다

>> user_hash_tag

    type : Object
    유저 해시테그 리스트를 의미합니다

>>> EX
    user_hash_tag:{
        [
            hash_tag:편의점
        ],
        [
            hash_tag:야간
        ]
    }

> user_contract

    type : Object
    유저 근로 계약서 정보를 담고있는 오브젝트입니다

>> user_contract_image_url

    type : String
    유저 근로 계약서 이미지 url

>> user_contract_pdf_url

    type : String
    유저 근로 계약서 pdf url

> user_setting

    type : Object
    유저 세팅 정보를 담고있는 오브젝트입니다

>> notification_allow

    type : Boolean
    땜빵 알림 기능을 사용여부

# Post

> post_token

    type : String
    글 고유의 토큰입니다

> author_data

    type : Object
    글쓴이 정보를 가지고있는 오브젝트입니다

>> author_name

    type : String
    글쓴이 이름을 의미합니다

>> author_id 

    type : String
    글쓴이 아이디를 의미합니다

>> author_token

    type : String
    글쓴이 토큰을 의미합니다

>> author_admin

    type : String
    글쓴이가 주인장인지 알바인지 판단합니다
    true : 주인장
    false : 알바

>> author_call

    type : String 
    글쓴이 전화번호를 의미합니다

> post_data

    type : Object
    글에 관련된 데이터를 가지고있는 오브젝트입니다

>> post_title

    type : String 
    글 제목을 의미합니다

>> post_content

    type : String 
    글 내용을 의미합니다

>> post_hash_tag

    type : Array
    글 해쉬태그를 의미합니다

>>> Ex

    post_hash_tag:{
        [
            hash_tag:편의점
        ],
        [
            hash_tag:야간
        ]
    }

>> post_profile_image_url

    type : String
    글 미리보기 이미지 URL을 의미합니다

>> post_puff_comment

    type : Object
    댓글 데이터를 의미합니다

>>> comment_user_token

    type : String
    댓글 작성자 토큰을 의미합니다

>>> comment_user_name

    type : String
    댓글 작성자 이름을 의미합니다

>>> comment_time

    type : String
    댓글을 단 시간을 의미합니다

>>> comment_text

    type : String
    댓글 내용을 의미합니다

>>> comment_puff_amount

    type : Number
    땜빵 비용을 의미합니다

> alba_data

    type : Object
    알바 장소 데이터를 가지고있는 오브젝트입니다

>> alba_time

    type : String
    알바 시간을 의미합니다

>> alba_pay

    type : Number
    알바 시급을 의미합니다

>> alba_location

    type : Object
    알바 장소 위도 , 경도 , 주소를 가지고있는 오브젝트입니다 

>>> latitude

    type : Number
    알바장소 위도를 의미합니다

>>> longitude

    type : Number
    알바장소 경도를 의미합니다

>>> location 

    type : String
    알바장소 주소를 의미합니다