# POST : /auth/login 

    로그인 하는 쿼리입니다

> Require

    id : 유저 아이디를 의미합니다
    password : 유저 비밀번호를 의미합니다
    
> Response Success

    status : 200
    data : {
        token : 유저 토큰
    }
    
> Response Fail

    status:401,
    message:"Fail to /auth/login",
    
# POST : /auth/login/auto

    자동 로그인을 의미합니다
    
> Require
    
    token : 유저 토큰을 의미합니다
    
> Response Success

    status : 200

> Response Fail

    status: 401
    message: Fail to /auth/login/auto
    
# POST : /auth/register

    회원가입을 의미합니다

> Require
    
    id : 유저 아이디를 의미합니다
    password : 유저 비밀번호를 의미합니다
    name : 유저 이름을 의미합니다
    age : 유저 나이를 의미합니다
    admin : 가계주인인지 아닌지 체크 (true = 가계주인 , false = 알바생)

> Response Success

    status: 200
    data : {
        token : 유저 토큰
    }
    
> Response Fail

    status:401
    message:"User Already Exist"