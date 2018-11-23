const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const { user } = requrie("../models");

module.exports = passport => {
  
// req.session 객체에 어떤 데이터를 저장할지 선택함.
  passport.serializeUser((user, done) => {
    // 첫번 째 인자는 에러 발생시 사용한다.
    // 세션에 사용자의 아이디만 저장해라!
    done(null, user.id);
  });

  // 매 요청마다 실행
  // 위의 serialize에서 세션에 저장했던 아이디를 받아서 db에서 사용자 정보를 조회함
  passport.deserializeUser((id, done) => {
    User.find({ where: { id } })
        //조회한 정보를 req.user로 가져올 수 있음.
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local(passport);
  kakao(passport);
};
