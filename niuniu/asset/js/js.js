var idx = getQueryString("current") ? getQueryString("current") : 0;

$(function() {
	$(".date").html(getNowFormatDate());
	imgTobg();

	$(".tx").hover(function() {
		$(this).find(".tx-menu").show();
	}, function() {
		$(this).find(".tx-menu").hide();
	});
	tab(".tab-name li", ".tab-con")
	//tab切换
	// tab(".company-tab li",".company-tab-con");
	tab(".js-tab-hd li", ".js-tab-con");
	//收藏
	$(".ico-fav").click(function() {
		$(this).toggleClass("on");
	});
	//关闭弹层
	$(".float-layer .close").click(function() {
		$(this).parent().fadeOut()
	});
	//喜欢
	$(".btn.ico-xihuan").click(function() {
		$(this).toggleClass("active")
	});
	//搜索
	$("#my-sch").bind({
		focus: function() {
			if($(this).val() == "输入要搜索的关键字") {
				$(this).val("")
			}
		},
		blur: function() {
			if($(this).val() == "") {
				$(this).val("输入要搜索的关键字")
			}
		}
	});
	//tab切换扩展
	if(idx) {
		$(".js-tab-hd li").removeClass('current').eq(idx).addClass('current');
		$(".js-tab-con>div").css("display", "none").eq(idx).css("display", "block");
		$(".btn.see-more").attr("data-con-type", idx);
	}
	$(".js-tab-hd li").click(function() {
		idx = $(this).index();
		$(".btn.see-more").attr("data-con-type", idx)
	})
	$(".btn.see-more").click(function() {
		idx = $(this).attr("data-con-type");
		console.log("向第" + idx + "中添加数据")
	});

	$(window).on("resize", function() {
		floatCenter($(".web-url"))
	})
	floatCenter($(".web-url"));
	//产品导航
	//
	var liLen = $(".product-menu li").length;
	if(liLen) {
		$(".product-menu li").hover(function() {
			var curID = $(this).index();
			var spanW = $(this).find("span").width();
			$(this).addClass("active")
			if(curID < parseInt(liLen / 3)) {};
			if(curID >= parseInt(liLen / 3) && curID <= parseInt(liLen / 3) * 2) {
				$(this).find("span").css({
					"left": "50%",
					"margin-left": -spanW / 2 + "px"
				});
			}
			if(curID > parseInt(liLen / 3) * 2) {
				$(this).find("span").css({
					"left": "auto",
					"right": 0
				});
			}
		}, function() {
			$(this).removeClass("active")
		})
		//
		$(".product-menu").smartFloat();
	}

})

//==========================================================
//获取当前日期
//==========================================================
function getNowFormatDate() {
	var date = new Date();
	var seperator1 = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var strDate = date.getDate();
	var week = date.getDay();
	switch(week) {
		case 0:
			week = "星期日"
			break;
		case 1:
			week = "星期一"
			break;
		case 2:
			week = "星期二"
			break;
		case 3:
			week = "星期三"
			break;
		case 4:
			week = "星期四"
			break;
		case 5:
			week = "星期五"
			break;
		case 6:
			week = "星期六"
			break;
	}
	if(month >= 1 && month <= 9) {
		month = "0" + month;
	}
	if(strDate >= 0 && strDate <= 9) {
		strDate = "0" + strDate;
	}
	//	var currentdate = year + "年" + month + "月" + strDate + "日      " + week;
	var currentdate = year + "年" + month + "月" + strDate + "日";
	return currentdate;
}

function imgTobg() {
	//图片换背景
	$(".js-img-bg-center").each(function() {
		var src = $(this).find("img").attr("src");
		var activeSrc = $(this).find("img").attr("active-src");
		if($(this).closest(".active").length) {
			$(this).css({
				"background": "url(" + activeSrc + ") no-repeat center center"
			}).find("img").hide();
		} else {
			$(this).css({
				"background": "url(" + src + ") no-repeat center center"
			}).find("img").hide();
		}
	});
}

function tab(name, target) {
	$(name).click(function() {
		var idx = $(this).index();
		$(this).parent().find("li").removeClass("current");
		$(this).addClass("current");
		$(this).parent().parent().next(target).children("div").hide();
		$(this).parent().parent().next(target).children("div").eq(idx).show();
	});
}

function mysearch() {
	if((document.getElementById("my-sch").value == "") || (document.getElementById("my-sch").value == "输入要搜索的关键字")) {
		alert("输入要搜索的关键字");
		document.getElementById("my-sch").focus();
		return;
	}
	window.open("/搜索页面.html?q=" + encodeURI(document.getElementById("my-sch").value));
}

function getQueryString(name) {
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = window.location.search.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
}

function floatCenter(obj) {
	$(".js-float").click(function() {
		var target = $(this).data("target")
		$("." + target).show();
		$(".mask").show();
	})
	var winW = $(window).width();
	var winH = $(window).height();
	var webUrlW = obj.outerWidth();
	var webUrlH = obj.outerHeight();
	obj.css({
		'left': (winW - webUrlW) / 2,
		'top': (winH - webUrlH) / 2
	})
	$(".float .close").click(function() {
		$(".mask").hide();
		$(this).closest("div").hide();
	})
}
$.fn.smartFloat = function() {
	var position = function(element) {
		var top = element.position().top; //当前元素对象element距离浏览器上边缘的距离 
		var pos = element.css("position"); //当前元素距离页面document顶部的距离 
		$(window).scroll(function() { //侦听滚动时 
			var scrolls = $(this).scrollTop();
			if(scrolls > top) { //如果滚动到页面超出了当前元素element的相对页面顶部的高度 
				if(window.XMLHttpRequest) { //如果不是ie6 
					element.css({ //设置css 
						position: "fixed", //固定定位,即不再跟随滚动 
						top: 0 //距离页面顶部为0 
					}).addClass("shadow"); //加上阴影样式.shadow 
				} else { //如果是ie6 
					element.css({
						top: scrolls //与页面顶部距离 
					});
				}
			} else {
				element.css({ //如果当前元素element未滚动到浏览器上边缘，则使用默认样式 
					position: pos,
					top: top
				}).removeClass("shadow"); //移除阴影样式.shadow 
			}
		});
	};
	return $(this).each(function() {
		position($(this));
	});
};
//# sourceMappingURL=../maps/js.js.map
