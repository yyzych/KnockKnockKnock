/*
* 登入模块
* Object.create() 方法创建一个拥有指定原型和若干个指定属性的对象。
*/

define(function (require,exports,module) {
	var $=require("jquery");

	//全局常量,常量设置太乱了
	var CONSTS={
		SHOW_POPUP:"show-popup",
		LOGIN_BOX:"#login-box",
		POPUP_SCREEN:"#popup",
		USERNAME:"#username",
		PASSWORD:"#password",
		LOGIN_FORM:"#login-form",
		EMAIL_INVALID_WARN:"#email_invalid_warn",
		LOGIN_LENGTH_WARN:"#login_length_warn",
		ERROR_NO_USER_INFO:"#error_no_user_info",
		ERROR_USERNAME_PASSWORD:"#error_username_password",
		LOGIN_SERVER_ERROR:"#login_server_error"
	};
	var ERRORCODE={
		USERNAME_NOT_EXIST:"username_not_exist",
		USERNAME_PASSWORD_NOT_MATCH:"username_password_not_match",
		UNKNOW_EXCEPTION:"unknown_exception"
	};
	var SIGN={
		SIGN_BOX:"#signup-box",
		SIGN_FORM:"#signup-form",
		USERNAME:"#username",
		PASSWORD:"#password"
	}

	//私有变量
	var $popup=$(CONSTS.POPUP_SCREEN);

	//主对象
	var _loginView={
		password:"",
		email:"",
		isPasswordOk:!1,
		isEmailValid:!1,
		$loginBox:$(CONSTS.LOGIN_BOX),
		find:function (selector) {
			return this.$loginBox.find(selector);
		},
		init:function () {
			var self=this;
			self.find(CONSTS.USERNAME).blur(function (e) {
				self.checkEmailFormat();
			});
			self.find(CONSTS.USERNAME).keyup(function (e) {
				self.checkingEmailFormat();
			});
			self.find(CONSTS.PASSWORD).blur(function () {
				self.checkPassword();
			});
			self.find(CONSTS.PASSWORD).keyup(function (e) {
				self.checkingPassword();
			});
			self.find(CONSTS.LOGIN_FORM).submit(function (e) {//注意如果表单控件在form里面，则按下回车键会自动回发的
				e && e.preventDefault();
				self.checkEmailFormat();
				self.checkPassword();
				self.postLogin();

				// 是不是用逗号false之后就不会执行下去了？？！
				// t && t.preventDefault(), e.checkEmailFormat(), e.checkPassword1(), e.postLogin()
			});
		},
		openLoginBox:function (loginBtn) {
			var self=this;
			$(loginBtn).click(function (e) {
				e.preventDefault();
				self.$loginBox.css("display","block");
				$popup.addClass(CONSTS.SHOW_POPUP);
				return false;
			})
		},
		closeLoginBox:function (closeBtn) {
			var self=this;
			$(closeBtn).click(function (e) {
				e.preventDefault();
				self.$loginBox.css("display","none");
				$popup.removeClass(CONSTS.SHOW_POPUP);
				return false;
			})
		},
		checkEmailFormat:function () {
			this.email=this.find(CONSTS.USERNAME).val(),
				this.find(CONSTS.ERROR_NO_USER_INFO).slideUp(),//登录之后出现这个问题就要先把他取消掉
				this.isEmailValid=!1;//恢复为默认值
			var regex=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/i,
				flag=this.email.match(regex);
			flag?(this.find(CONSTS.EMAIL_INVALID_WARN).slideUp(), this.find(CONSTS.USERNAME).removeClass("warn"),this.isEmailValid=!0)
				:(this.email.length>0 ? (this.find(CONSTS.EMAIL_INVALID_WARN).slideDown(),this.find(CONSTS.USERNAME).addClass("warn"))
				:(this.find(CONSTS.EMAIL_INVALID_WARN).slideUp(),this.find(CONSTS.USERNAME).removeClass("warn")));//没有值时是正常的
		},
		checkingEmailFormat:function () {
			this.email=this.find(CONSTS.USERNAME).val();
			var regex=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/i,
				flag=this.email.match(regex);
			return flag&&(this.find(CONSTS.EMAIL_INVALID_WARN).slideUp(),this.find(CONSTS.USERNAME).removeClass('warn'));
		},
		checkPassword:function () {
			this.password=this.find(CONSTS.PASSWORD).val(),
				this.isPasswordOk=!1;
			var flag=this.password.length>=6;
			flag?(this.find(CONSTS.LOGIN_LENGTH_WARN).slideUp(),this.find(CONSTS.PASSWORD).removeClass("warn"),this.isPasswordOk=!0)
				:(this.password.length>0 ? (this.find(CONSTS.LOGIN_LENGTH_WARN).slideDown(),this.find(CONSTS.PASSWORD).addClass("warn"))
				:(this.find(CONSTS.LOGIN_LENGTH_WARN).slideUp(),this.find(CONSTS.PASSWORD).removeClass("warn")));
		},
		checkingPassword:function () {
			this.password=this.find(CONSTS.PASSWORD).val();
			var flag=this.password.length>=6||this.password.length==0;
			return flag&&(this.find(CONSTS.LOGIN_LENGTH_WARN).slideUp(),this.find(CONSTS.PASSWORD).removeClass("warn"));
		},
		postLogin:function () {
			var self=this;
			if(this.isPasswordOk&&this.isEmailValid){
				$popup.find(".error .warn").slideUp();
				var url="../tool/login_sign.ashx?action=login";
				$.ajax({
					type:"post",
					url:url,
					contentType:"application/json", //预期服务器返回的类型,这个决定了浏览器如何处理返回的数据。如json.parse()
					data:JSON.stringify({
						username:this.email,
						password:this.password
					}),
					success:function (data) {
						window.location.reload();
					},
					error:function (e) {
						self.loginError(e);
					}
				})
			}
		},
		loginError:function (e) {
			e.responseText='{ "errorCode" :"username_not_exist" }';
			var self=this,
				responseData=JSON.parse(e.responseText);
			switch(responseData.errorCode){
				case ERRORCODE.USERNAME_NOT_EXIST:
					this.find(CONSTS.ERROR_NO_USER_INFO).slideDown();
					this.find(CONSTS.USERNAME).addClass("warn");
					break;
				case ERRORCODE.USERNAME_PASSWORD_NOT_MATCH:
					this.find(CONSTS.ERROR_USERNAME_PASSWORD).slideDown();
					this.find(CONSTS.PASSWORD).addClass("warn");
					break;
				case ERRORCODE.UNKNOW_EXCEPTION:
					this.find(CONSTS.LOGIN_SERVER_ERROR).slideDown();
					break;
			}
		}
	};

	//_signView没有改完
	var _signView={
		password:"",
		email:"",
		isPasswordOk:!1,
		isEmailValid:!1,
		$signBox:$(SIGN.SIGN_BOX),
		find:function (selector) {
			return this.$signBox.find(selector);
		},
		init:function () {
			var self=this;
			self.find(SIGN.USERNAME).blur(function (e) {
				self.checkEmailFormat();
			});
			self.find(SIGN.USERNAME).keyup(function (e) {
				self.checkingEmailFormat();
			});
			self.find(SIGN.PASSWORD).blur(function () {
				self.checkPassword();
			});
			self.find(SIGN.PASSWORD).keyup(function (e) {
				self.checkingPassword();
			});
			self.find(SIGN.LOGIN_FORM).submit(function (e) {//注意如果表单控件在form里面，则按下回车键会自动回发的
				e && e.preventDefault();
				self.checkEmailFormat();
				self.checkPassword();
				self.postLogin();

				// 是不是用逗号false之后就不会执行下去了？？！
				// t && t.preventDefault(), e.checkEmailFormat(), e.checkPassword1(), e.postLogin()
			});
		},
		openSignBox:function (signBox) {
			var self=this;
			$(signBox).click(function (e) {
				e.preventDefault();
				self.$signBox.css("display","block");
				$popup.addClass(CONSTS.SHOW_POPUP);
				return false;
			})
		},
		closeSignBox:function (closeBtn) {
			var self=this;
			$(closeBtn).click(function (e) {
				e.preventDefault();
				self.$signBox.css("display","none");
				$popup.removeClass(CONSTS.SHOW_POPUP);
				return false;
			})
		},
		checkEmailFormat:function () {
			this.email=this.find(SIGN.USERNAME).val(),
				this.find(CONSTS.ERROR_NO_USER_INFO).slideUp(),//登录之后出现这个问题就要先把他取消掉
				this.isEmailValid=!1;//恢复为默认值
			var regex=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/i,
				flag=this.email.match(regex);
			flag?(this.find(CONSTS.EMAIL_INVALID_WARN).slideUp(), this.find(CONSTS.USERNAME).removeClass("warn"),this.isEmailValid=!0)
				:(this.email.length>0 ? (this.find(CONSTS.EMAIL_INVALID_WARN).slideDown(),this.find(CONSTS.USERNAME).addClass("warn"))
				:(this.find(CONSTS.EMAIL_INVALID_WARN).slideUp(),this.find(CONSTS.USERNAME).removeClass("warn")));//没有值时是正常的
		},
		checkingEmailFormat:function () {
			this.email=this.find(CONSTS.USERNAME).val();
			var regex=/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,9}$/i,
				flag=this.email.match(regex);
			return flag&&(this.find(CONSTS.EMAIL_INVALID_WARN).slideUp(),this.find(CONSTS.USERNAME).removeClass('warn'));
		},
		checkPassword:function () {
			this.password=this.find(CONSTS.PASSWORD).val(),
				this.isPasswordOk=!1;
			var flag=this.password.length>=6;
			flag?(this.find(CONSTS.LOGIN_LENGTH_WARN).slideUp(),this.find(CONSTS.PASSWORD).removeClass("warn"),this.isPasswordOk=!0)
				:(this.password.length>0 ? (this.find(CONSTS.LOGIN_LENGTH_WARN).slideDown(),this.find(CONSTS.PASSWORD).addClass("warn"))
				:(this.find(CONSTS.LOGIN_LENGTH_WARN).slideUp(),this.find(CONSTS.PASSWORD).removeClass("warn")));
		},
		checkingPassword:function () {
			this.password=this.find(CONSTS.PASSWORD).val();
			var flag=this.password.length>=6||this.password.length==0;
			return flag&&(this.find(CONSTS.LOGIN_LENGTH_WARN).slideUp(),this.find(CONSTS.PASSWORD).removeClass("warn"));
		},
		postLogin:function () {
			var self=this;
			if(this.isPasswordOk&&this.isEmailValid){
				$popup.find(".error .warn").slideUp();
				var url="../tool/login_sign.ashx?action=login";
				$.ajax({
					type:"post",
					url:url,
					contentType:"application/json",
					data:JSON.stringify({
						username:this.email,
						password:this.password
					}),
					success:function (data) {
						window.location.reload();
					},
					error:function (e) {
						self.loginError(e);
					}
				})
			}
		},
		loginError:function (e) {
			e.responseText='{ "errorCode" :"username_not_exist" }';
			var self=this,
				responseData=JSON.parse(e.responseText);
			switch(responseData.errorCode){
				case ERRORCODE.USERNAME_NOT_EXIST:
					this.find(CONSTS.ERROR_NO_USER_INFO).slideDown();
					this.find(CONSTS.USERNAME).addClass("warn");
					break;
				case ERRORCODE.USERNAME_PASSWORD_NOT_MATCH:
					this.find(CONSTS.ERROR_USERNAME_PASSWORD).slideDown();
					this.find(CONSTS.PASSWORD).addClass("warn");
					break;
				case ERRORCODE.UNKNOW_EXCEPTION:
					this.find(CONSTS.LOGIN_SERVER_ERROR).slideDown();
					break;
			}
		}
	};

	//返回接口
	module.exports={
		loginView:_loginView,
		signView:_signView
	};
})