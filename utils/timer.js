var length = 4;

function countdown(that) {
  console.log('count down');
  var seconds = that.data.seconds;
  console.log(seconds);
  var captchaLabel = that.data.captchaLabel;
  if (seconds <= 1) {
    captchaLabel = '获取验证码';
    seconds = length;
    that.setData({
      captchaDisabled: false
    });
  } else {
    captchaLabel = --seconds + '秒后重新发送'
  }
  that.setData({
    seconds: seconds,
    captchaLabel: captchaLabel
  });
}

module.exports = {
  countdown: countdown,
  length: length
}