(function ($){
	/* develop by Mr Penh Sokra 2020 kosign */

	//animateBorder
	$.fn.animateBorder = function(options){
		/* call
		$("").animateBorder({
			wrapClass:"",
			clickClass:"",
			showInClass:".class name" //show border in class..
			speed:200
		});
		*/
		var defaults = {wrapClass:"",clickClass:".xxx",showInClass:".xxx",speed:100};
		options = $.extend(defaults,options);
		var wrapClass = options.wrapClass;
		var clickClass = options.clickClass;
		var showInClass = options.showInClass;
		var speed = options.speed;
		$(wrapClass).css("position","relative");
		try{
			var attrDiv1 = "<span class="+wrapClass.substring(1)+"_border_animate"+">"+"</span>";
			$(showInClass).append(attrDiv1);
			var borderWith=0; var parentOffset=0;var firstOffet=0;var totalOffet=0;
			if($(wrapClass+" "+clickClass).hasClass("on")){
				borderWith = $(wrapClass+" "+clickClass+".on").outerWidth();
				parentOffset = $(wrapClass+" "+clickClass+".on").parent().offset();
				firstOffet = $(wrapClass+" "+clickClass+".on").offset();
				totalOffet = firstOffet.left - parentOffset.left;
			}
			$(wrapClass+"_border_animate").css({"position":"absolute","width":borderWith,"bottom":0,"left":0,"height":3,"background-color":"red","z-index":"99999","margin-left":totalOffet,"transition":"width 0.7s"});
		}catch(err) {
			console.log(err);
		}
		//alert(borderWith);
		$(wrapClass+" "+clickClass).click(function(e) {
			var thisParentIndex = $(this).parents(wrapClass).index("body "+wrapClass);
			var thisIndex = $(this).index(wrapClass+':eq('+thisParentIndex+')'+" "+clickClass);
			var thisWidth =  $(wrapClass).eq(thisParentIndex).find(clickClass).eq(thisIndex).outerWidth();
			var parentOffset = $(wrapClass).eq(thisParentIndex).offset().left;
			var bdmargin = $(wrapClass).eq(thisParentIndex).find(clickClass).eq(thisIndex).offset().left - parentOffset;
			$(wrapClass).eq(thisParentIndex).find(clickClass).removeClass("on");
			$(this).addClass("on");
			$(clickClass+":after").css({"opacity":"0"});
			$(wrapClass).eq(thisParentIndex).find(wrapClass+"_border_animate").css({"width":thisWidth});
			$(wrapClass).eq(thisParentIndex).find(wrapClass+"_border_animate").animate({
				marginLeft:bdmargin
			},options.speed);
		});

	};
	//animateBorder

	//scrolladdClass StyleOne normorl style
	$.fn.scrolladdClassStyleOne = function(options){
		/* call
		$(window).scrolladdClassStyleOne({
			condition:0, // >... do add class
			addClassTo:".goTo_section",
			addClassName:".fixed",
			ifHasClass:".class name" //if have this not do something..
		});
		*/
		var defaults = {condition:0,addClassTo:"x",addClassName:"x",ifHasClass:"x"};
		options = $.extend(defaults,options);
		var mywindowScrollTop;
		$(window).scroll(function(){
			mywindowScrollTop = $(window).scrollTop();
			if(mywindowScrollTop > options.condition){
				$(options.addClassTo).addClass(options.addClassName.substring(1));
			}else{
				$(options.addClassTo).removeClass(options.addClassName.substring(1));
			}
		});
	};
	//scrolladdClassStyleOne normorl style

	//scrolladdClassStyleTwo
	$.fn.scrolladdClassStyleTwo = function(options){
		/* call
		$(window).scrollToAddClass({
			addClassTo:".goTo_section",
			addClassName:".fixed",
			ifHasClass:".class name" //if have this not do something..
		});
		*/
		var defaults = {checkVisibilityTopElement:["false","67"],addClassTo:"x",addClassName:"x",ifHasClass:"x"};
		options = $.extend(defaults,options);
		var mywindowScrollTop;
		var fixedArr =[];
			fixedArr = options.checkVisibilityTopElement;
		var offset = $(options.addClassTo).offset();
		var condition = offset.top;
		$(document).click(function(){
			var counter = 0;
			var looper = setInterval(function(){
				counter++;
				//console.log(counter);
				offset = $(options.addClassTo).offset();
				condition = offset.top;
				if(counter >= 30){
					clearInterval(looper);
				}
			},30);
		});

		$(window).scroll(function(){
			mywindowScrollTop = $(window).scrollTop();
			if(fixedArr[0] === 'true'){
				if($(options.addClassTo).hasClass(options.ifHasClass.substring(1))){
					//console.log("has class..."+options.ifHasClass.substring(1));
					}else{
						if($(fixedArr[1]).is(":visible")){
							if(mywindowScrollTop > condition){
								$(options.addClassTo).addClass(options.addClassName.substring(1));
								$("body").addClass("hasfixing");
							}else{
								$("body").removeClass("hasfixing");
								$(options.addClassTo).removeClass(options.addClassName.substring(1));
							}
						}else{
							if(mywindowScrollTop > fixedArr[2]){
								$("body").addClass("hasfixing");
								$(options.addClassTo).addClass(options.addClassName.substring(1));
							}else{
								$("body").removeClass("hasfixing");
								$(options.addClassTo).removeClass(options.addClassName.substring(1));
							}
						}
					}
				}else{
					if($(options.addClassTo).hasClass(options.ifHasClass.substring(1))) {
					//console.log("has class..."+options.ifHasClass.substring(1));
					}else{
						console.log(condition);
						if(mywindowScrollTop > condition){
							$("body").addClass("hasfixing");
							$(options.addClassTo).addClass(options.addClassName.substring(1));
						}else{
							$("body").removeClass("hasfixing");
							$(options.addClassTo).removeClass(options.addClassName.substring(1));
						}
					}
				}
		});
	};
	//scrolladdClassStyleTwo

	//slide toggleAccordion
	$.fn.toggleAccordion = function(options){
		/* for show hide layer
		$('.autoComplete_ly_wrap').toggleAccordion({
			wrapClass:".autoComplete_ly_wrap",
			clickClass:".js_click_autoComplete_ipt",
			showClass:".js_show_autoComplete",
			clickclassNoHide:[".mCSB_dragger_bar", ".mCSB_draggerRail"],
			layer:true,
			speed:300
		});

		// for show hide content
		$('.autoComplete_ly_wrap').toggleAccordion({
			wrapClass:".autoComplete_ly_wrap",
			clickClass:".js_click_autoComplete_ipt",
			showClass:".js_show_autoComplete",
			layer:false,
			multiShow:false,
			speed:300
		});

		var LyOuterHeight,thisLayerH;
		$(".js_show .mCustomScrollbar").each(function(index){
			LyOuterHeight = $(".js_show .mCustomScrollbar").eq(index).height()
			thisLayerH = $(this).css("max-height").substring(0,$(this).css("max-height").length-2);
			if(LyOuterHeight >= thisLayerH){
				$(this).css({"max-height":"100%","height":thisLayerH});
			}else{
				$(this).css({"max-height":"100%","height":"100%"});
			}
		});

		*/
		try{
			var defaults = {wrapClass:"x",clickClass:"x",showClass:"x",clickclassNoHide:[".x"],layer:false,menu:false,multiShow:true,speed:300};
			options = $.extend(defaults,options);
			var classWrap = options.wrapClass;
			if(options.menu){
				if($("#header_ly").length == 0) {
					 $('body').prepend($('<div/>', {
						id: 'header_ly'
					}));
				}
			}
			if(options.layer){
				var attrDiv = "<div class="+classWrap.substring(1)+"_contents"+" style='display:none;margin:0;padding:0;'>"+ "</div>";
			}else{
				var attrDiv = "<div class="+classWrap.substring(1)+"_contents"+" style='display:none;margin:0;padding:0;min-height:100%;'>"+ "</div>";
			}
			var clickClass = options.clickClass;
			var showClass = options.showClass;
			$(classWrap+" "+showClass).wrap(function() {
				return attrDiv;
			});

			/*  */
			for(var i =0;i<=$(classWrap+' '+clickClass).length;i++){
				$(classWrap+' '+clickClass).eq(i).attr('id',i);
				$(classWrap+' '+showClass).eq(i).parent().attr('id',"show_"+i);
			}

			if(options.layer){
				var subLeng = classWrap.substring(1)+"_click";
				$(classWrap+" "+clickClass).each(function(i) {
					$(clickClass).eq(i).attr('id', i+classWrap.substring(1)+"_click");
					var top = $(showClass).eq(i).css("top");
					var left = $(showClass).eq(i).css("left");
					var zindex = $(showClass).eq(i).css("z-index");
					var right = $(showClass).eq(i).css("right");
					var width = $(showClass).eq(i).css("width");
					var bottom = $(showClass).eq(i).css("bottom");
//					if(top==="auto"){
//						top="0px";
//					}
					if(right==="auto"){
						right="0px";
					}
					if(left ==="auto"){
						left = "0px";
					}
					$(showClass).eq(i).css({"position":"relative","display":"block","top":0,"left":0,"right":0,"bottom":0,"z-index":zindex-1});
					$(classWrap+"_contents").eq(i).css({"position":"absolute","top":top,"right":right,"left":left,"bottom":bottom,"z-index":zindex});
				});
				var idclickTemp = classWrap+"_click";
				var idclick = idclickTemp.substring(1);
				/* time click */
				var isClick = false;
				$(classWrap).children().click(function(e){
					var thisClass = e.target.className.split('0')[0];//split(' ')[0]
					if(clickClass !="."+thisClass){
						isClick = true;
					}else{
						isClick = false;
					}
				});
				$(document).click(function(e){
						var mygetThisClassTemp = e.target.id;
						var mygetThisClassTempClass = e.target.className.split('0')[0];//split(' ')[0]
						//
						var subIndex1 = mygetThisClassTemp.indexOf(subLeng);
						//var mygetThisClass = mygetThisClassTemp.substring(1);
						var mygetThisClass = mygetThisClassTemp.substring(idclickTemp.length+subIndex1,subIndex1);
						//subLeng
						var subIndex = mygetThisClassTemp.indexOf(subLeng);
						var mygetThisClassIndex = mygetThisClassTemp.substring(0,subIndex);
						var NoHideclassLength = options.clickclassNoHide.length;
						var NoHideclass = options.clickclassNoHide;
						if(idclick != mygetThisClass){
							$.each(NoHideclass, function(i, value) {
								if(mygetThisClassTempClass.split(' ')[0] == NoHideclass[i].substring(1)) {
									return false; // breaks
								}else{
									if(i == NoHideclassLength-1){
										if(options.menu){
											$(classWrap+"_contents").slideUp(options.speed-100);
											$("#header_ly").slideUp(options.speed);
										}else{
											if(options.clickchildrentNoHide){
												if(!isClick){
													$(classWrap+"_contents").slideUp(options.speed);
													$(clickClass).removeClass("on");
												}
											}else{
												$(classWrap+"_contents").slideUp(options.speed);
												$(clickClass).removeClass("on");
											}
										}
									}
								}
							});
							isClick = false;
						}else{
							if(options.menu){
								var thisNextHieght = $(classWrap+"_contents").eq(mygetThisClassIndex).outerHeight();
								$(clickClass).removeClass("on");
								$(classWrap+"_contents").slideUp(options.speed-100);
								//$("#header_ly").css("height",thisNextHieght).slideUp(options.speed);
								if($(classWrap+"_contents").eq(mygetThisClassIndex).is(":visible")){
									$("#header_ly").slideUp(options.speed, function() {
										$("#header_ly").css("height",thisNextHieght).slideUp(options.speed);
										$(classWrap+"_contents").eq(mygetThisClassIndex).slideUp(options.speed-300);
									});
								}else{
									$("#header_ly").slideUp(options.speed, function() {
										//do something special
										$("#header_ly").css("height",thisNextHieght).slideDown(options.speed-100,function(){
											
										});
										$("#"+mygetThisClassTemp).toggleClass("on");
										$(classWrap+"_contents").eq(mygetThisClassIndex).slideDown(options.speed);
									});
								}
							}else{
								if($(classWrap+"_contents").eq(mygetThisClassIndex).is(":visible")){
									$("body").removeClass("un_fold");
									$(classWrap+"_contents").eq(mygetThisClassIndex).slideUp(options.speed,function(){
											
										});
									$(clickClass).removeClass("on");
								}else{
									$(classWrap+"_contents").slideUp(options.speed, function(){
										//do something special
										$("body").removeClass("un_fold");
										$(clickClass).removeClass("on");
										$("#"+mygetThisClassTemp).addClass("on");
									});
									//$("#"+mygetThisClassTemp).addClass("on");
									$(classWrap+"_contents").eq(mygetThisClassIndex).slideDown(options.speed,function(){
										$(classWrap+"_contents").eq(mygetThisClassIndex).css({"overflow":"inherit"});
									});
								}
							}

						}
					});

				}else{
					$(showClass).css({"display":"block"});
					$(classWrap+" "+clickClass).click(function(e){

						var thisId = $(this).attr("id");
						var thisParentIndex = $(this).parents(classWrap).index("body "+classWrap);
						var thisIndex = $(this).index(classWrap+':eq('+thisParentIndex+')'+" "+clickClass);
						if(options.multiShow){
							if($(classWrap).eq(thisParentIndex).find(classWrap+"_contents").eq(thisIndex).is(":visible")){
								$(this).removeClass("on");
								$(this).parent().removeClass("open");
								$(classWrap).eq(thisParentIndex).find(classWrap+"_contents").eq(thisIndex).slideUp(options.speed);
							}else{
								$(this).addClass("on");
								$(this).parent().addClass("open");
								$(classWrap).eq(thisParentIndex).find(classWrap+"_contents").eq(thisIndex).slideToggle(options.speed,function(){});
							}
						}else{
							if($(classWrap).eq(thisParentIndex).find(classWrap+"_contents").eq(thisIndex).is(":visible")){
								$(classWrap+':eq('+thisParentIndex+')'+" "+clickClass).parent().removeClass("open");
								$(classWrap+':eq('+thisParentIndex+')'+" "+clickClass).removeClass("on");
								//$(classWrap).eq(thisParentIndex).find(classWrap+"_contents").slideUp(options.speed);
								$(classWrap+" "+classWrap+"_contents"+""+'#show_'+thisId).slideUp(options.speed);

							}else{
								$(classWrap+':eq('+thisParentIndex+')'+" "+clickClass).parent().removeClass("open");
								$(classWrap+':eq('+thisParentIndex+')'+" "+clickClass).removeClass("on");
								$(this).addClass("on");
								$(this).parent().addClass("open");
								//alert($(this).attr('id'))
								$(classWrap).eq(thisParentIndex).find(classWrap+"_contents").slideUp(options.speed);
								$(classWrap+" "+classWrap+"_contents"+""+'#show_'+thisId).slideDown(options.speed,function(){});
								//$(classWrap).eq(thisParentIndex).find(classWrap+"_contents").eq(thisIndex).slideDown(options.speed);
							}
						}


					});
				}
			$(classWrap+" "+clickClass+".on").each(function(i) {
				var thisParentIndexOn = $(this).parents(classWrap).index("body "+classWrap);
				$(this).next().css("display","block");
			});
			$(classWrap+" .open").children().find(showClass).eq(0).parent().css({"display":"block"});
		}catch(err) {
			console.log(err);
		}
	};
	//slide toggleAccordion

	//fixed to bottom .........fixed footer to bottom when data not full page
	$.fn.fixedToBottom = function(options){
		/*
		$('.wrap').fixedToBottom({
			wrapClass:".footer",
			addClassName:".fixed",
			alwaysFixed:false
		});
		*/

		try{
			var defaults = {wrapClass:"x",addClassName:"x",alwaysFixed:false,onCassChange:""};
			options = $.extend(defaults,options);
			var thisClass = $(this).attr("class").split(' ')[0];
			var wrapClass = options.wrapClass;
			var addClassName = options.addClassName;
			var fixedH = $(options.wrapClass).outerHeight();
			var onCassChange = options.onCassChange;//after somthing change in this class this function will run again
			if(options.alwaysFixed){
					if(window.innerWidth > document.body.clientWidth){
						$(wrapClass).removeClass(addClassName.substring(1));
					}else{
						$(wrapClass).addClass(addClassName.substring(1));
					}

					$('body').on('DOMSubtreeModified', onCassChange, function(){
						if(window.innerWidth > document.body.clientWidth){
							$(wrapClass).removeClass(addClassName.substring(1));
						}else{
							$(wrapClass).addClass(addClassName.substring(1));
						}
					});

//					alert($(window).height());
//					if($(document).height() > $(window).height()){
//						$("."+thisClass).css({"padding-bottom":0});
//						$(wrapClass).removeClass(addClassName.substring(1));
//					}else{
//						$("."+thisClass).css({"padding-bottom":fixedH});
//						$(wrapClass).addClass(addClassName.substring(1));
//					}
					$(window).resize(function(){
//					if($(document).height() > $(window).height()){
//						$("."+thisClass).css({"padding-bottom":0});
//						$(wrapClass).removeClass(addClassName.substring(1));
//					}else{
//						$("."+thisClass).css({"padding-bottom":fixedH});
//						$(wrapClass).addClass(addClassName.substring(1));
//					}
						if(window.innerWidth > document.body.clientWidth){
							$(wrapClass).removeClass(addClassName.substring(1));
						}else{
							$(wrapClass).addClass(addClassName.substring(1));
						}
					});
			}else{
				if($(document).height() > $(window).height()){
					$("."+thisClass).css({"padding-bottom":0});
					$(wrapClass).removeClass(addClassName.substring(1));
				}else{
					$("."+thisClass).css({"padding-bottom":fixedH});
					$(wrapClass).addClass(addClassName.substring(1));
				}
				$(window).resize(function(){
					if($(document).height() > $(window).height()){
						$("."+thisClass).css({"padding-bottom":0});
						$(wrapClass).removeClass(addClassName.substring(1));
					}else{
						$("."+thisClass).css({"padding-bottom":fixedH});
						$(wrapClass).addClass(addClassName.substring(1));
					}
				});
			}

			$(document).click(function() {
				var counter = 0;
				var looper = setInterval(function(){
					counter++;
					//console.log(counter);
					if(options.alwaysFixed){
							if($(document).height() > $(window).height()){}else{
								$("."+thisClass).css({"padding-bottom":fixedH});
								$(wrapClass).addClass(addClassName.substring(1));
							}
							$(window).resize(function(){
								//console.log(0);
								if($(document).height() > $(window).height()){}else{
									$("."+thisClass).css({"padding-bottom":fixedH});
									$(wrapClass).addClass(addClassName.substring(1));
								}
							});
					}else{
						 alert(0);
							if($(document).height() > $(window).height()){
								$("."+thisClass).css({"padding-bottom":0});
								$(wrapClass).removeClass(addClassName.substring(1));
							}else{
								$("."+thisClass).css({"padding-bottom":fixedH});
								$(wrapClass).addClass(addClassName.substring(1));
							}
							$(window).resize(function(){
								if($(document).height() > $(window).height()){
									$("."+thisClass).css({"padding-bottom":0});
									$(wrapClass).removeClass(addClassName.substring(1));
								}else{
									$("."+thisClass).css({"padding-bottom":fixedH});
									$(wrapClass).addClass(addClassName.substring(1));
								}
							});
						}
					if(counter >= 50){
						clearInterval(looper);
					}

				},30);
			});
		}catch(err){
			console.log(err);
		}
	}
	//fixed to bottom

	//menu have 2 function click or hover
	$.fn.menu = function(options){
		/*
			$(".gnb_wrap").menu({
				wrapClass:".gnb_wrap",
				clickClass:".js_menu",
				showClass:".gsnb_wrap",
				clickclassNoHide:[".js_nohide"],
				animateBorder:["true",".gnb_wrap","1"], //0 is start from body. 1 is start from menu
				hover:true,
				speed:300,
			});
		*/
		try{
			var defaults = {wrapClass:"x",clickClass:"x",showClass:"x",clickclassNoHide:[".x"],animateBorder:["false",".xxx"],hover:false,speed:300};
			options = $.extend(defaults,options);
			var classWrap = options.wrapClass;
			var clickClass = options.clickClass;
			var showClass = options.showClass;
			var speed = options.speed;
			$(showClass).wrapInner("<div class='gsnb_inner'></div>" );
			$(clickClass).children().addClass(clickClass.substring(1)+"_inner");
			var left=0;
			if(options.animateBorder[0] ==="true"){
				try{
					var attrDiv1 = "<span class="+classWrap.substring(1)+"_border_animate"+">"+"</span>";
					$(options.animateBorder[1]).append(attrDiv1);
					var borderWith = $(classWrap+" "+clickClass).eq(0).outerWidth();
					var parentOffset = $(classWrap+" "+clickClass).eq(0).parent().offset();
					var firstOffet = $(classWrap+" "+clickClass).eq(0).offset();
					var totalOffet = firstOffet.left - parentOffset.left;
					if(options.animateBorder[2] ==="0"){
						left = 0;
					}else{
						left = firstOffet.left;
					}
					$(classWrap+"_border_animate").css({"position":"absolute","bottom":0,"left":0,"height":5,"background-color":"red","z-index":"99999","width":0,"margin-left":left,"transition":"width 0.7s","pointer-events":"none"});
				}catch(err) {
					console.log(err);
				}
			}
			if(options.hover){
				var istrue = 0;
				$(document).click(function(e){
					//var mygetThisClassTemp = e.target.id;
					var mygetThisClassTempClass = e.target.className;
					var lastclass = mygetThisClassTempClass.substr(mygetThisClassTempClass.lastIndexOf(' ')+1);
					var NoHideclassLength = options.clickclassNoHide.length;
					var NoHideclass = options.clickclassNoHide;
					//alert(mygetThisClassTempClass+" : "+clickClass);
					if(lastclass === clickClass.substring(1)+"_inner" || mygetThisClassTempClass.split(' ')[0] === clickClass.substring(1)){
						istrue =1;
						return false;
					}else{
						$.each(NoHideclass, function(i, value) {
							if(mygetThisClassTempClass.split(' ')[0] === NoHideclass[i].substring(1)) {
								istrue =1;
								return false; // breaks
							}else{
								istrue = 0;
								if(i == NoHideclassLength-1){
									if(options.animateBorder[0] ==="true"){
										$(options.animateBorder[1]).find(classWrap+"_border_animate").animate({
											marginLeft:left
										},options.speed).css({"width":0});
									}
									$(clickClass).removeClass("on");
									$(showClass).slideUp(speed);
								}
							}
						});
					}
				});
					var counter = 0;
					var myInterval =null;
					$(classWrap+" "+clickClass).hover(function(e){
						var thisliIndex = $(this).index();
						$(classWrap+" "+clickClass).removeClass("on");
						$(this).addClass("on");
						var thisWidth =  $(classWrap+" "+clickClass).eq(thisliIndex).outerWidth();
						var thisLeft = $(this).offset().left;
						counter = 0;
						myInterval = setInterval(function () {
						if(counter == 3){
							$(classWrap+" "+showClass).eq(thisliIndex).slideDown(speed);
							if(options.animateBorder[0] ==="true"){
								$(classWrap).find(classWrap+"_border_animate").css({"width":thisWidth,"left":0}).animate({
									marginLeft:thisLeft
								},speed);
							}
						}
						++counter;
						},40);
					},function(e){
						clearInterval(myInterval);
						$(classWrap+" "+clickClass).removeClass("on");
						$(classWrap+" "+showClass).slideUp(speed);
						setTimeout(function(){
							if($(classWrap+" "+clickClass).hasClass("on")){}else{
							if(options.animateBorder[0] ==="true"){
									$(options.animateBorder[1]).find(classWrap+"_border_animate").animate({
										marginLeft:left
									},options.speed).css({"width":0});
								}
							}
						},100);
					});

			}else{
				var istrue = 0;
				$(document).click(function(e){
					//var mygetThisClassTemp = e.target.id;
					var mygetThisClassTempClass = e.target.className;
					var lastclass = mygetThisClassTempClass.substr(mygetThisClassTempClass.lastIndexOf(' ')+1);
					var NoHideclassLength = options.clickclassNoHide.length;
					var NoHideclass = options.clickclassNoHide;
					//alert(mygetThisClassTempClass+" : "+clickClass);
					if(lastclass === clickClass.substring(1)+"_inner" || mygetThisClassTempClass.split(' ')[0] === clickClass.substring(1)){
						if(istrue == 1){
							$(clickClass).removeClass("on");
							$(showClass).slideUp(speed);
						}
						istrue =1;
						return false;
					}else{
						$.each(NoHideclass, function(i, value) {
							if(mygetThisClassTempClass.split(' ')[0] === NoHideclass[i].substring(1)) {
								istrue =1;
								return false; // breaks
							}else{
								istrue = 0;
								if(i == NoHideclassLength-1){
										if(options.animateBorder[0] ==="true"){
											$(options.animateBorder[1]).find(classWrap+"_border_animate").animate({
												marginLeft:left
											},options.speed).css({"width":0});
										}
										$(clickClass).removeClass("on");
										$(showClass).slideUp(speed);
								}
							}
						});
					}
				});

				$(classWrap+" "+clickClass).click(function(e){
					var thisliIndex = $(this).index();
					$(classWrap+" "+clickClass).removeClass("on");
					$(this).addClass("on");
					if($(classWrap+" "+showClass).eq(thisliIndex).is(":visible")){
						setTimeout(function(){
							if($(classWrap+" "+clickClass).hasClass("on")){}else{
							if(options.animateBorder[0] ==="true"){
									$(options.animateBorder[1]).find(classWrap+"_border_animate").animate({
										marginLeft:left
									},options.speed).css({"width":0});
								}
							}
  						},100);
						if(!options.hover && istrue == 0){
							$(classWrap+" "+clickClass).removeClass("on");
							$(classWrap+" "+showClass).eq(thisliIndex).slideUp(speed);
							if(options.animateBorder[0] ==="true"){
							$(options.animateBorder[1]).find(classWrap+"_border_animate").animate({
									marginLeft:left
								},options.speed).css({"width":0});
							}
						}
					}else{
						if($(classWrap+" "+showClass).is(":visible")){
							$(classWrap+" "+showClass).slideUp(speed, function() {
								setTimeout(function(){
									istrue = 0;
									$(classWrap+" "+showClass).eq(thisliIndex).slideDown(speed);
								},speed);
							});
						}else{
							istrue = 0;
							$(classWrap+" "+showClass).eq(thisliIndex).slideDown(speed);
						}
						if(options.animateBorder[0] ==="true"){
							var thisWidth =  $(classWrap+" "+clickClass).eq(thisliIndex).outerWidth();
							var thisLeft = $(this).offset().left;
							$(classWrap).find(classWrap+"_border_animate").css({"width":thisWidth,"left":0}).animate({
								marginLeft:thisLeft
							},speed);
						}

					}
				});
			}
		}catch(err) {
			console.log(err);
		}
	}
	//menu

	//tabs have 3 style normorl fade and animate
	$.fn.tabs = function(options){
		/* tab has three style 1.normail 2.fade 3.animate
		if contentWidthFull:false please set width to wrap and conent...
			* tab a
			$(".tab_a").tabs({
				wrapClass:".tab_a",
				clickClass:".js_click_a",
				showClass:".tab_cnt_a",
				animate:false,
				contentWidthFull:false,//effect when animate:true
				animateBorder:["true",".tabs_header"],//show border in class .
				fade:false,
				speed:500
			});

			if have tab tab tab class tab inner must be not the same outer tab
			Ex.....
			* tab b in tab a
			$(".tab_b").tabs({
				wrapClass:".tab_b",
				clickClass:".js_click_b",
				showClass:".tab_cnt_b",
				animate:false,
				contentWidthFull:false,//effect when animate:true
				animateBorder:["true",".tabs_header"],//show border in class .
				fade:true,
				speed:500
			});

		*/
		try{
			var defaults = {wrapClass:"x",clickClass:"x",showClass:"x",clickToDefaultTab:[],animate:false,fade:false,animateBorder:["false",".x"],ontentWidth:false,speed:300};
			options = $.extend(defaults,options);
			var classWrap = options.wrapClass;
			var clickClass = options.clickClass;
			var showClass = options.showClass;
			//alert(options.animateBorder[0]);
			if(options.animateBorder[0] === "true"){
				var attrDiv = "<span class="+classWrap.substring(1)+"_border_animate"+">"+"</span>";
				$(classWrap).each(function(i){
					try{
						if($(classWrap).eq(i).find(options.animateBorder[1].substring(1)).find(classWrap+"_border_animate").length == 0){
							$(classWrap).eq(i).find(options.animateBorder[1]).append(attrDiv);
							var borderWith = $(classWrap).eq(i).find(clickClass).eq(0).children().outerWidth();
							var parentOffset = $(classWrap).eq(i).find(clickClass).eq(0).parent().offset();
							var firstOffet = $(classWrap).eq(i).find(clickClass).eq(0).children().offset();
							var totalOffet = firstOffet.left - parentOffset.left;
							$(classWrap).eq(i).find(classWrap+"_border_animate").css({"position":"absolute","bottom":0,"height":5,"background-color":"green","z-index":"99999","width":borderWith,"margin-left":totalOffet,"transition":"width 0.7s"});
						}
					}catch(err){
						//console.log(err);
					}
				});
			}
			if(options.animate){
				var attrDiv = "<div class="+classWrap.substring(1)+"_contents"+">"+"</div>";
				$(classWrap +" "+showClass).parent().wrapInner(function() {
					return attrDiv;
				});
				$(classWrap).find(showClass).css({"display":"block"});
				$(classWrap+" "+classWrap+"_contents").addClass("cboth");
				var contenlng,wrapWidth,contenWidth;
				$(classWrap).each(function(index) {
					if(options.contentWidthFull){
						$(classWrap).eq(index).find(showClass).css({"float":"left","width":"100%"});
					}else{
						$(classWrap).eq(index).find(showClass).css({"float":"left"});
					}
					contenlng = $(classWrap).eq(index).find(showClass).length;
					contenWidth = $(classWrap).eq(index).find(showClass).outerWidth();
					wrapWidth = contenlng*contenWidth;
					$(classWrap+"_contents").eq(index).css({"width":wrapWidth});
				});
				var withcnt = wrapWidth/contenlng;
				if(options.contentWidthFull){
					$(classWrap+" "+showClass).css({"width":withcnt});
				}
			}
			$(classWrap+" "+clickClass).click(function(e){
				var thisParentIndex = $(this).parents(classWrap).index("body "+classWrap);
				var thisIndex = $(this).index(classWrap+':eq('+thisParentIndex+')'+" "+clickClass);
				$(classWrap+':eq('+thisParentIndex+')'+" "+clickClass).removeClass("on");
				$(this).addClass("on");
				if(options.animateBorder){
						var thisWidth =  $(classWrap).eq(thisParentIndex).find(clickClass).eq(thisIndex).children().outerWidth();
						var parentOffset = $(classWrap).eq(thisParentIndex).find(clickClass).eq(thisIndex).parent().offset().left;
						var bdmargin = $(classWrap).eq(thisParentIndex).find(clickClass).eq(thisIndex).children().offset().left-parentOffset;
						$(classWrap).eq(thisParentIndex).find(classWrap+"_border_animate").css({"width":thisWidth});
						$(classWrap).eq(thisParentIndex).find(classWrap+"_border_animate").animate({
							marginLeft:bdmargin
						},options.speed);
					}
				if(options.fade){
					$(classWrap).eq(thisParentIndex).find(showClass).css({"display":"none"});
					$(classWrap).eq(thisParentIndex).find(showClass).eq(thisIndex).fadeIn(options.speed,"linear");
				}else if(options.animate){
					var margin = $(classWrap).eq(thisParentIndex).find(showClass).eq(thisIndex).outerWidth()*thisIndex;
					$(classWrap).eq(thisParentIndex).find(classWrap+"_contents").animate({
						marginLeft:-margin
					},options.speed);
				}else{
					//$(window).scrollTop(0);
					$(classWrap).eq(thisParentIndex).find(showClass).css("display","none");
					$(classWrap).eq(thisParentIndex).find(showClass).eq(thisIndex).css("display","block");
				}

			});
		}catch(err){
				//console.log(err);
		}
	};
	//tabs

	//fullPage
	$.fn.fullPage = function(options){
		/* tab has three style 1.normail 2.fade 3.animate
		if contentWidthFull:false please set width to wrap and conent...
			* tab a
			$(".").fullPage({
				wrapClass:".",
				fullPageClass:".",
				width:"",//"100%" is full
				height:"",//"100%" is full
				customWidth:0,
				customHeight:0
			});
		*/
		try{
			var defaults = {wrapClass:"x",fullPageClass:"x",width:"",height:"",customHeight:0,customWidth:0};
			options = $.extend(defaults,options);
			var classWrap = options.wrapClass;
			var fullPageClass = options.fullPageClass;
			var fullWidth = options.width;
			var fullHeight= options.height;
			var customHeight = options.customHeight;
			var customWidth = options.customWidth;
			var wWidth;
			var wHeight;
			$(fullPageClass).css({"padding":"0"})
			wWidth = $(window).outerWidth();
			wHeight = $(window).outerHeight();
			if(fullWidth ==="100%"){
				$(fullPageClass).css({"width":wWidth-customWidth});
			}else{
				$(fullPageClass).css({"width":fullWidth});
			}
			if(fullHeight ==="100%"){
				$(fullPageClass).css({"height":wHeight-customHeight});
			}else{
				$(fullPageClass).css({"height":fullHeight});
			}
			$(window).resize(function(){
				wWidth = $(window).outerWidth();
				wHeight = $(window).outerHeight();
				if(fullWidth ==="100%"){
					$(fullPageClass).css({"width":wWidth-customWidth});
				}
				if(fullHeight ==="100%"){
					$(fullPageClass).css({"height":wHeight-customHeight});
				}
			});
		}catch(err){
				//console.log(err);
		}
	};
	//fullPage

	//set text to select
	$.fn.selectText = function(options){
		/*
		$('.jsCardType').selectText({
			wrapClass:".jsCardType",
			clickOn:".seclect_ly ul li a",
			setTextToClass:".select_trigger",
		});
		*/
		try{
			var defaults = {wrapClass:"x",clickOn:"x",setTextToClass:""};
			options = $.extend(defaults,options);
			var thisClass = $(this).attr("class").split(' ')[0];
			var wrapClass = options.wrapClass;
			var setTextToClass = options.setTextToClass;
			var clickOn = options.clickOn;
			var checkType;
			$(clickOn).click(function(){
				checkType =  $(this).parents(wrapClass).find(setTextToClass).is('input');
				if(checkType) {
					var IdSETEXT = $(this).parents(wrapClass).find(setTextToClass).attr('id');
					$("#"+IdSETEXT).attr("value",$(this).text());
					//alert($(this).text());
					//$(this).parents(wrapClass).find(setTextToClass).attr("value",$(this).text());
					//$(this).parents(wrapClass).find(".bt_x").css({"display":"inline-block"});
				}else{
					var IdSETEXT = $(this).parents(wrapClass).find(setTextToClass).attr('id');
					$("#"+IdSETEXT).text($(this).text());
				}

			});

		}catch(err){
			console.log(err);
		}
	};
	//set text to select

	/* progressbar bar */
	$.fn.progressbar = function(options){
		/*
			$(window).progressbar({
				height:1,
				top:0,
				background:"red",
				zindex:9999
			});
		*/
		var progressbar = $(".progressbar").length;
		if(progressbar == 0){
			$("<span class='progressbar'></span>" ).prependTo("body");
		}
		$(".progressbar").css({"position":"fixed","top":0,"left":0,"height":1,"transition":"width 0.3s"});
		$(window).scroll(function(){
			var docHeight = $(document).height();
			var winHeight = $(window).height();
			var scrollTop = $(window).scrollTop();
			var scrollPercent = (scrollTop) / (docHeight - winHeight);
			var scrollPercentRounded = Math.round(scrollPercent*100);
			// This is the easiest way to have default options.
			var defaults = $.extend({width:scrollPercentRounded,height:1,top:0,background:"red",zindex:9999}, options );
			// progressbar the collection based on the settings variable.
			$(".progressbar").css({"width":defaults.width+"%","height":defaults.height,"top":defaults.top,"background-color":defaults.background,"z-index":defaults.zindex});
		});
	};
	/* //progressbar bar */

	////////////////////////////////////////////////
	$.fn.getPosition = function(a,b,c,options){
		try{
			var defaults = {wrapClass:".x",jumpOnClass:".x"};
			options = $.extend(defaults,options);
		}catch(err) {
			console.log(err.message);
		}
	};
	$.fn.windowscrollTop = function(options) {
		var defaults = {scrollTop:0,speed:5000};
		options = $.extend(defaults,options);
		var scrollTop = options.scrollTop;
		var speed = options.speed;
		return this.animate({scrollTop:0}, speed, 'swing', function() {
			//alert("Finished animating");
		});
	};
	////////////////////////////////////////

	/* goto top style ទាក់ */
	$.fn.gotoTopStyle1 = function(options){
		/* -60 is first laod positon. 40 is start scroll postion. 120 is position fixed top of the footer
		$(".btn_totop_wrap").gotoTopStyle1({
				wrapClass:".btn_totop_wrap",
				clickClass:".btn_gotoTop",
				jumpOnClass:".footer",
				bottom:["-60","50","50"],
				speed:500
		});*/
		var defaults = {wrapClass:".x",clickClass:".x",jumpOnClass:".x",bottom:["0","0","0"],speed:300};
			options = $.extend(defaults,options);
		var bottom;
		var FooterHeight = $(options.jumpOnClass).outerHeight();
		$(window).scroll(function(e){
			var scrollTop = $(window).scrollTop();
			var winHeight = $(window).outerHeight();
			var FooterHeightOfset = $(options.jumpOnClass).offset().top;

			var BottomPositonFixed = scrollTop-FooterHeightOfset+winHeight;
			var FixTopFooter = $(window).scrollTop()+winHeight-FooterHeight+FooterHeight;
			console.log(FixTopFooter+":"+FooterHeightOfset);
			if(scrollTop >= 1 && FixTopFooter < FooterHeightOfset){
				$(options.wrapClass).css({"bottom":options.bottom[1]+"px","-moz-transition":"all 0.4s","-webkit-transition":"all 0.4s","-o-transition":"color 0.4s ease-in","transition":"all 0.4s"});
			}else if(FixTopFooter >= FooterHeightOfset){
				$(options.wrapClass).css({"bottom":BottomPositonFixed+parseInt(options.bottom[2])+"px"}).on('transitionend webkitTransitionEnd', function(e){
					$(this).css({"-moz-transition":"none","-webkit-transition":"none","-o-transition":"color 0 ease-in","transition":"none"});
				});
			}else{
				$(options.wrapClass).css({"bottom":options.bottom[0]+"px","-moz-transition":"all 0.4s","-webkit-transition":"all 0.4s","-o-transition":"color 0.4s ease-in","transition":"all 0.4s"});
			}
		});

		$(options.clickClass).click(function(e) {
			$('html, body').windowscrollTop({speed:options.speed});
			$('html, body').stop(stopAll,goToEnd);
		});

	};
	/* //goto top style ទាក់ */

	/* goto top style ធម្មតា */
	$.fn.gotoTopStyle2 = function(options){
		/* call
		$(".classwrap").gotoTopStyle2({
			wrapClass:".classwrap",
			clickClass:".",
			addClassTo:".",
			addClassName:".",
			scrollCondition:0,//if scroll > ....
			speed:500
		});
		*/
		try{
			var defaults = {wrapClass:"x",clickClass:"x",addClassTo:"x",addClassName:"x",scrollCondition:0,speed:300};
			options = $.extend(defaults,options);
			var wrapClass = options.wrapClass;
			var addClassTo = options.addClassTo;
			var clickClass = options.clickClass;
			var addClassName = options.addClassName;
			var speed = options.speed;
			var scrollCondition = options.scrollCondition;
			var scrl;
			$(window).scroll(function(e){
				e.stopPropagation();
				scrl = $(window).scrollTop();
				if(scrl > options.scrollCondition){
					$(addClassTo).fadeIn();
					$(addClassTo).addClass(addClassName.substring(1));
				}else{
					$(addClassTo).fadeOut();
					$(addClassTo).removeClass(addClassName.substring(1));
				}
			});
			$(clickClass).click(function(e) {
				$('html, body').windowscrollTop({speed:speed});
				$('html, body').stop(stopAll,goToEnd);
			});
		}catch(err){
			console.log(err);
		}
	};
	/* //goto top style ធម្មតា */

	/* goto gotoSection */
	$.fn.gotoSection = function(options){
		/* call
		$(".wrap").gotoSection({
			wrapClass:".wrap",
			clickClass:".js_gnbClick2",
			addClassTo:".tab_wrap",
			addClassName:".sticky",
			gotoSectionClass:".purLst_block",
			customNumber:0,
			speed:300
		});
		*/
		try{
			var defaults = {wrapClass:"x",clickClass:"x",addClassName:".x",addClassTo:".x",gotoSectionClass:"x",customNumber:0,condition:0,speed:300};
			options = $.extend(defaults,options);
			var wrapClass = options.wrapClass;
			var condition = options.condition;
			var addClassTo = options.addClassTo;
			var addClassName = options.addClassName;
			var clickClass = options.clickClass;
			var gotoSectionClass = options.gotoSectionClass;
			var speed = options.speed;
			var totalcondition = $(addClassTo).outerHeight();
			var totalconditionHieght = $(addClassTo).offset().top;
			var scrl=0;
			var f = 0;
			var secOffset;
			var isclick = 0;
			$(window).on('touchstart touchend', function(event){
				isclick = 0;
				f=1;
			});
			$(window).bind('mousewheel DOMMouseScroll', function(event){
				isclick = 0;
				f=1;
			});
			$(document).click(function(e){
				isclick = 1;
				f=1;
			});
			setTimeout(function(){
				//do something special
				f=1;
			},100);

			/* border animate */
			var firstWidth = $(wrapClass+" "+clickClass).eq(0).outerWidth();
			if($(wrapClass+" .tab_before").length > 0){
				var borderPosition = $(wrapClass+" "+clickClass+".on").offset().left - $(wrapClass+" "+clickClass+".on").parent().offset().left;
				$(wrapClass+" .tab_before").css({"width":firstWidth,"margin-left":borderPosition});
			};
			$(window).resize(function(e) {
				var firstWidth = $(wrapClass+" "+clickClass).eq(0).outerWidth();
				if($(wrapClass+" .tab_before").length > 0){
					var borderPosition = $(wrapClass+" "+clickClass+".on").offset().left - $(wrapClass+" "+clickClass+".on").parent().offset().left;
					$(wrapClass+" .tab_before").css({"width":firstWidth,"margin-left":borderPosition});
				};
			});
			/* //border animate */

			$(wrapClass+" "+clickClass).click(function(e){
				isclick = 1;
				var thisIndex = $(this).index();
				/* border animate */
				var thisWith = $(this).outerWidth();
				var borderPosition = $(this).offset().left - $(this).parent().offset().left;
				if($(wrapClass+" .tab_before").length > 0){
					$(wrapClass+" .tab_before").animate({marginLeft:borderPosition},0, function() {
						$(wrapClass+" .tab_before").css("width",thisWith);
					});
				};
				/* //border animate */
				$(wrapClass+" "+clickClass).removeClass("on");
				$(wrapClass+" "+clickClass).eq(thisIndex).addClass("on");
				$('html,body').animate({
					scrollTop:$(gotoSectionClass).eq(thisIndex).offset().top-totalcondition+options.customNumber
				},speed,function(){
					setTimeout(function(){
					//do something special
					isclick = 0;
					},100);
				});
			});
			$(window).on('resize scroll', function() {
					scrl = $(window).scrollTop();
					//console.log(scrl);
					if(scrl > totalconditionHieght){
						if(!$("body").hasClass("fixed_header")){
							$("body").addClass("fixed_header");
							$(addClassTo).addClass(addClassName.substring(1));
						}
					}else{
						$("body").removeClass("fixed_header");
						$(addClassTo).removeClass(addClassName.substring(1));
					}
				if(f != 0){
				if(isclick != 1){
					if($(window).scrollTop() + $(window).height() == $(document).height()) {
						$(wrapClass+" "+clickClass).removeClass("on");
						$(wrapClass+" "+clickClass).eq($(wrapClass+" "+clickClass).length-1).addClass("on");
						/* border animate */
						var thisWith = $(wrapClass+" "+clickClass).eq($(wrapClass+" "+clickClass).length-1).outerWidth();
						var borderPosition = $(wrapClass+" "+clickClass).eq($(wrapClass+" "+clickClass).length-1).offset().left - $(wrapClass+" "+clickClass).eq($(wrapClass+" "+clickClass).length-1).parent().offset().left;
						if($(wrapClass+" .tab_before").length > 0){
							$(wrapClass+" .tab_before").animate({marginLeft:borderPosition},0, function() {
								$(wrapClass+" .tab_before").css("width",thisWith);
							});
						};
						/* //border animate */
					}else{
						var x;
						var cntLenth = $(wrapClass+" "+gotoSectionClass).length-1;
						$(wrapClass+" "+gotoSectionClass).each(function(i){
							if(i == cntLenth){
								x= 0;
								if(scrl >= $(gotoSectionClass).eq(i).offset().top-totalcondition){
									$(wrapClass+" "+clickClass).eq(i).addClass("on");
									/* border animate */
									var thisWith = $(wrapClass+" "+clickClass).eq(i).outerWidth();
									var borderPosition = $(wrapClass+" "+clickClass).eq(i).offset().left - $(wrapClass+" "+clickClass).eq(i).parent().offset().left;
									if($(wrapClass+" .tab_before").length > 0){
										$(wrapClass+" .tab_before").animate({marginLeft:borderPosition},0, function() {
											$(wrapClass+" .tab_before").css("width",thisWith);
										});
									};
									/* //border animate */
								}else{
									//$(wrapClass+" "+clickClass).removeClass("on");
									if(scrl < $(gotoSectionClass).eq(i).offset().top-totalcondition && scrl < $(gotoSectionClass).eq(1).offset().top-totalcondition){
										$(wrapClass+" "+clickClass).eq(0).addClass("on");
										$(wrapClass+" "+clickClass).eq(cntLenth).removeClass("on");
									}else{
										if(scrl < $(gotoSectionClass).eq(i).offset().top-totalcondition && scrl < $(gotoSectionClass).eq(1).offset().top-totalcondition){
											$(wrapClass+" "+clickClass).eq(0).removeClass("on");
											$(wrapClass+" "+clickClass).eq(i).addClass("on");
											/* border animate */
											var thisWith = $(wrapClass+" "+clickClass).eq(i).outerWidth();
											var borderPosition = $(wrapClass+" "+clickClass).eq(i).offset().left - $(wrapClass+" "+clickClass).eq(i).parent().offset().left;
											if($(wrapClass+" .tab_before").length > 0){
												$(wrapClass+" .tab_before").animate({marginLeft:borderPosition},0, function() {
													$(wrapClass+" .tab_before").css("width",thisWith);
												});
											};
											/* //border animate */
										}
									}
								}
							}else{
								x = 1;
								if(scrl >= $(gotoSectionClass).eq(i).offset().top-totalcondition && scrl < $(gotoSectionClass).eq(i+x).offset().top-totalcondition){
									$(wrapClass+" "+clickClass).removeClass("on");
									$(wrapClass+" "+clickClass).eq(i).addClass("on");
									/* border animate */
									var thisWith = $(wrapClass+" "+clickClass).eq(i).outerWidth();
									var borderPosition = $(wrapClass+" "+clickClass).eq(i).offset().left - $(wrapClass+" "+clickClass).eq(i).parent().offset().left;
									if($(wrapClass+" .tab_before").length > 0){
										$(wrapClass+" .tab_before").animate({marginLeft:borderPosition},0, function() {
											$(wrapClass+" .tab_before").css("width",thisWith);
										});
									};
									/* //border animate */
								}else{
									$(wrapClass+" "+clickClass).eq(i).removeClass("on");
								}
							}
						});
					}
					}
				}
			});

		}catch(err){
			console.log(err);
		}
	};
	/* //goto gotoSection */

	/* swipe */
	$.fn.swipe = function(options){
		/*
			$(".swiper").swipe({
				//pass your element that you want to swipe
				swipeItem:".swiper > li dl",
				endSpace:78,//(modify)20200717
			});
		*/
			try{
				var settings = $.extend({
					swipeItem:"pass your element that you want to swipe",
					endSpace:74,
				}, options );
				var swiperWidth = $(this).outerWidth()-settings.endSpace;
				$(document).resize(function(e) {
					var swiperWidth = $(this).outerWidth()-settings.endSpace;
				});
				function prevent_default(e) {
					e.preventDefault();
				}
				function disable_scroll() {
					$(document).on('touchmove', prevent_default);
				}
				function enable_scroll() {
					$(document).unbind('touchmove', prevent_default)
				}
				var x;
				$(settings.swipeItem)
				.on('touchstart', function(e) {
					console.log(e.originalEvent.pageX)
				$(settings.swipeItem+".open").css('left', '0px').removeClass('open') // close em all
					$(e.currentTarget).addClass('open')
				x = e.originalEvent.targetTouches[0].pageX // anchor point
				})
				.on('touchmove', function(e) {
					var change = e.originalEvent.targetTouches[0].pageX - x
					change = Math.min(Math.max(0, change), swiperWidth) // restrict to -100px left, 0px right
					e.currentTarget.style.left = change + 'px'
				if (change < -10) disable_scroll() // disable scroll once we hit 10px horizontal slide
				})
				.on('touchend', function(e) {
					var left = parseInt(e.currentTarget.style.left)
					var new_left;
				if(left < -35) {
					new_left = -swiperWidth
				} else if (left > 35) {
					new_left = swiperWidth
				} else {
					new_left = '0px'
				}
				// e.currentTarget.style.left = new_left
				$(e.currentTarget).animate({left: new_left}, swiperWidth)
					enable_scroll()
				});
			}catch(err){
				console.log(err);
			}
		};
		/* //swipe */

	/* animate top */
	$.fn.animationTop = function(options){
		/*
			$(".js_animated1").animationTop2({
					animationClass:".js_animated1",
					delay:"0.1s",
					duration:"1s",
					callback: function() {
						//if have next animation again copy past here...
						$(".js_animated2").animationTop2({
							animationClass:".js_animated2",
							delay:"0.1s",
							duration:"1s",
							callback: function() {
								//if have next animation again copy past here...
						}
					});

				}
			});

			//css
			@keyframes fadeInUp{
				from{transform:translate3d(0,50px,0)}
				to{transform:translate3d(0,0,0);opacity:1}
			}
			@-webkit-keyframes fadeInUp{
				from{transform:translate3d(0,50px,0)}
				to{transform:translate3d(0,0,0);opacity:1}
			}
			.animated{animation-duration:1s;animation-fill-mode:both;-webkit-animation-duration:1s;-webkit-animation-fill-mode:both}
			.animatedFadeInUp,
			.js_animated1,
			.js_animated1{opacity:0}
			.fadeInUp{opacity:0;animation-name:fadeInUp;-webkit-animation-name:fadeInUp;}

			HTML:
			<h3 class="animated animatedFadeInUp js_animated1">xx</h3>
			<h3 class="animated animatedFadeInUp js_animated2">xx</h3>
		*/
			try{
				var settings = $.extend({
					animationClass:".xxx",
					delay:"",
					duration:0,
					callback: function() {},
				},options);
				var delay = options.delay;
				var duration = options.duration;
				$(options.animationClass).css({"animation-delay":delay,"-webkit-animation-delay":delay,"-moz-animation-delay":delay,"-o-animation-delay":delay,"animation-duration":duration,"-webkit-animation-duration":duration,"-webkit-animation-fill-mode":"both","animation-fill-mode":"both"});

				$(window).scroll(function(e) {
					$(options.animationClass).each(function() {
						var bottom_of_object = $(this).offset().top;
						var bottom_of_window = $(window).scrollTop() + $(window).height();
						if (bottom_of_window > bottom_of_object) {
							$(this).animate({
								'opacity': '1'
							},delay,function() {
							 options.callback.call(this);
							});
							$(this).css({"animation-name":"fadeInUp2","-webkit-animation-name":"fadeInUp2"});
						}
					});
				});

				$(options.animationClass).each(function() {
					var bottom_of_object = $(this).offset().top;
					var bottom_of_window = $(window).scrollTop() + $(window).height();
					if (bottom_of_window > bottom_of_object) {
						$(this).animate({
							'opacity': '1'
						},delay,function() {
							 options.callback.call(this);
						  });
						$(this).css({"animation-name":"fadeInUp2","-webkit-animation-name":"fadeInUp2"});
					}
				});
				//$(".animated").removeClass("addAnimated");
			}catch(err){
				console.log(err);
			}
		};
		//case 2
		$.fn.animationTop2 = function(options){
		/*
			$(".js_animated1").animationTop({
				animationClass:".js_animated3",
				delay:"0.1s",
				duration:"1s"
			});

			$(".js_animated2").animationTop({
				animationClass:".js_animated4",
				delay:"0.8s",
				duration:"1s"
			});

			//css
			@keyframes fadeInUp2{
				from{opacity:0;-webkit-transform:translate3d(0,50px,0);transform:translate3d(0,50px,0);}
				to{opacity:1;-webkit-transform:translate3d(0,0,0);-webkit-font-smoothing:antialiased;transform:translate3d(0,0,0);}
			}
		*/
			try{
				var settings = $.extend({
					animationClass:".xxx",
					delay:"",
					duration:0,
					callback: function() {},
				},options);
				var delay = options.delay;
				var duration = options.duration;


//				$(options.animationClass).each(function() {
//
//				});
//
				$(options.animationClass).animate({
						'opacity': '1'
				},delay,function() {
					options.callback.call(this);
				});
				$(options.animationClass).addClass("fadeInUp");
			}catch(err){
				console.log(err);
			}
		};
		/* //animate top */

			/* slide */
	$.fn.extend({
		/* myslide call
		$(".slide_sect_top_inner").myslide({
			itemSlideClass:".slide_sect_top",
			widthHeight:["100%","100%"],//width/hieght
			arrowNext:".btn_next",
			arrowPrev:".prev",
			auto:true,
			loop:true,
			fade:false,// next life update
			limite:false,//next life update
			directFrom:"left",
			dots:[true,".dot"],
			speed:300,
			duration:5000,
		});
		myslide call */
		myslide: function(options){
			try{
				var defaults = {itemSlideClass:".slidex",widthHeight:["100%","100%"],speed:1000,duration:1000,limite:false,directFrom:"down",arrowNext:".classname",arrowPrev:".classname",auto:false,loop:false,dots:[false,".classname"]};
				options = $.extend(defaults, options);
				var directFrom = options.directFrom;
				var start = 1;
				var updatecurrent =0;
				var $this = $(this),slideLeng,slideHeight,slideItems,hslide,slideWidth;
				var mgparent,mgparentTop,mgl,mgt;
				slideLeng = $(this).find(options.itemSlideClass).length;
				//slideHeight = $(this).find(options.itemSlideClass).height();
				//slideWidth = $(this).find(options.itemSlideClass).outerWidth();
				slideItems = $(this).find(options.itemSlideClass);
				slideItems.eq(0).clone().appendTo($this);
				$this.css("position","relative");
				$(this).find(options.itemSlideClass).eq(0).addClass("active");
				$(options.arrowPrev).addClass("off");
				$(this).wrap("<div class='js_slide_wrap'>");
				if(options.widthHeight[0] == "100%"){
					slideWidth = $(window).outerWidth();
				}else{
					slideWidth=options.widthHeight[0];

				}
				if(options.widthHeight[1] == "100%"){
					slideHeight = $(window).outerHeight();
				}else{
					slideHeight=options.widthHeight[1];
				}
				$(".js_slide_wrap").css({"position":"relative","width":slideWidth,"height":slideHeight,"overflow":"hidden","padding":0,"margin":0});
				$(options.itemSlideClass).css({"width":slideWidth,"height":slideHeight,"padding":0,"margin":0});
				hslide = slideHeight * (slideLeng+2);

				$(window).resize(function(e) {

						//slideHeight = $this.find(options.itemSlideClass).height(),
						//slideWidth = $this.find(options.itemSlideClass).outerWidth();
						if(options.widthHeight[0] == "100%"){
							slideWidth = $(window).outerWidth();
						}else{
							slideWidth=options.widthHeight[0];
						}
						if(options.widthHeight[1] == "100%"){
							slideHeight = $(window).outerHeight();
						}else{
							slideHeight=options.widthHeight[1];
						}
						hslide = slideHeight * (slideLeng+2);
						if(options.widthHeight[0] == "100%"){
							slideWidth = $(window).outerWidth();
						}else{
							slideWidth=options.widthHeight[0];
						}
						if(options.widthHeight[1] == "100%"){
							slideHeight = $(window).outerHeight();
						}else{
							slideHeight=options.widthHeight[1];
						}
					//alert(hslide);
						$(".js_slide_wrap").css({"width":slideWidth,"height":slideHeight});
						$(options.itemSlideClass).css({"width":slideWidth,"height":slideHeight});
						setTimeout(function(){
							mgparent = $this.find(options.itemSlideClass).parent().offset().left;
							mgparentTop = $this.find(options.itemSlideClass).parent().offset().top;
							mgl = $this.find(options.itemSlideClass).eq(current).offset().left-mgparent;
							mgt = $this.find(options.itemSlideClass).eq(current).offset().top-mgparentTop;
							if(options.directFrom === "down" || options.directFrom ==="up"){
								$this.css({"height":hslide,"top":-mgt});
							}else{
								$this.css({"width":(slideLeng+2)*slideWidth,"left":-mgl});
							}
						},10);

				});


				if(directFrom === "up" || directFrom === "left"){directFrom = 1;}else{directFrom = 1;}
				if(options.directFrom === "down" || options.directFrom ==="up"){
					$(this).css({"height":hslide});
					$this.css({"top":-slideHeight});
				}else{
					$this.css({"left":-slideWidth,"width":(slideLeng+2)*slideWidth});
				}
				if(options.directFrom === "left" || options.directFrom ==="right"){
					$(options.itemSlideClass).css("float","left");
				}


				slideItems.eq(slideLeng -1).clone().prependTo($this);
				var current = 1;
				var show_slide = function(direction,slideWidth){
					if(current < slideLeng){
						$(options.itemSlideClass).removeClass("active");
						$(options.itemSlideClass).eq(current+1).addClass("active");
					}else{
						$(options.itemSlideClass).removeClass("active");
						$(options.itemSlideClass).eq(1).addClass("active");
					}
					if(current == slideLeng){
						$(options.dots[1]+" ul li").removeClass("on");
						$(options.dots[1]+" ul li").eq(0).addClass("on");
					}else{
						$(options.dots[1]+" ul li").removeClass("on");
						$(options.dots[1]+" ul li").eq(current).addClass("on");
					}
					//alert(slideLeng);
					if(current == slideLeng-1){
						$(options.arrowNext).addClass("off");
						$(options.arrowPrev).removeClass("off");
					}else if(current == slideLeng){
						$(options.arrowNext).removeClass("off");
						$(options.arrowPrev).addClass("off");
					}else{
						$(options.arrowNext).removeClass("off");
						$(options.arrowPrev).removeClass("off");
					}
					if(slideLeng != 1){
						if(options.directFrom === "down" || options.directFrom === "up"){
							$this.animate({ top: "+=" + (-slideHeight) * direction },options.speed, function() {
								current += direction;
								cycle = !!(current === 0 || current > slideLeng);
								if (cycle) {
									current = (current === 0)? slideLeng : 1;
									$this.css({top: - slideHeight * current});
								}
							});
						}else{
							$this.animate({left: "+=" + (-slideWidth) * direction },options.speed, function() {
								current += direction;
								cycle = !!(current === 0 || current > slideLeng);
								if (cycle) {
									current = (current === 0)? slideLeng : 1;
									$this.css({left: - slideWidth * current});
								}
							});
						}
						if(!options.loop){
							if(current == slideLeng-1){
								myStopFunction();
							}
						}
					}
				};

				/* dots */
				if(options.dots[0]){
					$("<ul></ul>").appendTo(options.dots[1]);
					$(options.itemSlideClass).each(function(index,element ) {
					//$("<li><a href='#none'>"+(index+1)+"</a></li>").appendTo(options.dots[1]+" ul");
						if(index > 1 && index < slideLeng+1){
							$("<li><a href='#none'>"+(index)+"</a></li>").appendTo(options.dots[1]+" ul");
						}else if(index == 1){
							$("<li class='on'><a href='#none'>"+(index)+"</a></li>").appendTo(options.dots[1]+" ul");
						}
					});
				}

				$(options.dots[1]+" ul li a").click(function(e){
					$(options.dots[1]+" ul li").removeClass("on");
					$(this).parent().addClass("on");
					var thisIndex = $(this).parent().index();

					mgparent = $this.find(options.itemSlideClass).parent().offset().left;
					mgparentTop = $this.find(options.itemSlideClass).parent().offset().top;
					mgl = $this.find(options.itemSlideClass).eq(thisIndex+1).offset().left-mgparent;
					mgt = $this.find(options.itemSlideClass).eq(thisIndex+1).offset().top-mgparentTop;


					current = thisIndex+1;
					$(options.itemSlideClass).removeClass("active");
					$(options.itemSlideClass).eq(thisIndex+1).addClass("active");
						if(!options.loop){
								if(options.directFrom === "down" || options.directFrom === "up"){
								$this.animate({top:-mgt},options.speed, function() {
									start = 1;
								});
							}else{
								$this.animate({left:-mgl},options.speed, function() {
									start = 1;
								});
							}
							if(current < slideLeng){
								if(options.auto){
									myStopFunction();
									myanimtionFunction();
								}
							}else{
								if(options.auto){
									myanimtionFunction();
								}
							}
						}else{
							myStopFunction();
							if(options.directFrom === "down" || options.directFrom === "up"){
								$this.animate({top:-mgt},options.speed, function() {
									myanimtionFunction();
									start = 1;
								});
							}else{
								$this.animate({left:-mgl},options.speed, function() {
									if(options.auto){
										myanimtionFunction();
									}
									start = 1;
								});
							}
						}
						if(thisIndex+1 == slideLeng){
							$(options.arrowNext).addClass("off");
							$(options.arrowPrev).removeClass("off");
						}else if(thisIndex+1==1){
							$(options.arrowNext).removeClass("off");
							$(options.arrowPrev).addClass("off");
						}else{
							$(options.arrowNext).removeClass("off");
							$(options.arrowPrev).removeClass("off");
						}
						start =0;
					});
				var myVar
				function myTimer() {
					show_slide(directFrom,slideWidth);
				}
				function myStopFunction() {
					clearInterval(myVar);
				}
				function myanimtionFunction() {
					myVar = setInterval(myTimer,options.duration);
				}
				var first = 0;
				if(options.auto){
					myanimtionFunction();

					$(window).resize(function(e) {
						//myStopFunction();
						//myanimtionFunction();
					});
				}
				$(options.arrowNext).click(function(e) {
					if(!options.loop){
						if(current < slideLeng){
							if(start == 1){
								if(options.directFrom === "down" || options.directFrom === "up"){

									$this.animate({ top: "+=" + (-slideHeight) * directFrom },options.speed, function() {
										current += directFrom;
										cycle = !!(current === 0 || current > slideLeng);
										if (cycle) {
											current = (current === 0)? slideLeng : 1;
											$this.css({top: - slideHeight * current});
										}
										start = 1;
									});
								}else{
									$this.animate({left:"+=" + (-slideWidth) * directFrom },options.speed, function() {
										current += directFrom;
										cycle = !!(current === 0 || current > slideLeng);
										if (cycle) {
											current = (current === 0)? slideLeng : 1;
											$this.css({left: - slideWidth * current});
										}
										start = 1;
									});
								}
							}
							if(current < slideLeng-1){
								myStopFunction();

								myanimtionFunction();
							}
							start =0;
						}
					}else{
						myStopFunction();
						if(start == 1){
								if(options.directFrom === "down" || options.directFrom === "up"){
									$this.animate({ top: "+=" + (-slideHeight) * directFrom },options.speed, function() {
										current += directFrom;
										cycle = !!(current === 0 || current > slideLeng);
										if (cycle) {
											current = (current === 0)? slideLeng : 1;
											$this.css({top: - slideHeight * current});
										}
										if(options.auto){
											myanimtionFunction();
										}
										start = 1;
									});
								}else{
									$this.animate({left:"+=" + (-slideWidth) * directFrom },options.speed, function() {
										current += directFrom;
										cycle = !!(current === 0 || current > slideLeng);
										if (cycle) {
											current = (current === 0)? slideLeng : 1;
											$this.css({left: - slideWidth * current});
										}
										if(options.auto){
											myanimtionFunction();
										}
										start = 1;
									});
								}
							}
							if(current == slideLeng){
								$(options.arrowNext).removeClass("off");
								$(options.arrowPrev).addClass("off");
							}
							start =0;

					}
					/* add class active to slide */
					if(current <= slideLeng-1){
						$(options.itemSlideClass).removeClass("active");
						$(options.itemSlideClass).eq(current+1).addClass("active");
					}else if(current == slideLeng){
						if(!options.loop){
							myStopFunction();
						}
						return false;
					}else{
						$(options.itemSlideClass).removeClass("active");
						$(options.itemSlideClass).eq(1).addClass("active");
					}
					/* //add class active to slide */

					/* add class on to arrow */
					if(current == slideLeng-1){
						$(options.arrowNext).addClass("off");
						$(options.arrowPrev).removeClass("off");
					}else if(current == slideLeng){
						return false;
					}else{
						$(options.arrowNext).removeClass("off");
						$(options.arrowPrev).removeClass("off");
					}
					/* //add class on to arrow */

					/* add class on to dot */
					if(current == slideLeng){
						$(options.dots[1]+" ul li").removeClass("on");
						$(options.dots[1]+" ul li").eq(0).addClass("on");
					}else{
						$(options.dots[1]+" ul li").removeClass("on");
						$(options.dots[1]+" ul li").eq(current).addClass("on");
					}
					/* //add class on to dot */

					//alert(slideWidth);
				});

				$(options.arrowPrev).click(function(e) {
					if(!options.loop){
						if(current !=1){
							if(start == 1){
								if(options.directFrom === "down" || options.directFrom === "up"){
									$this.animate({ top: "+=" + (-slideHeight) * -1 },options.speed, function() {
										current += -1;
										cycle = !!(current === 0 || current > slideLeng);

										if (cycle) {
											current = (current === 0)? slideLeng : 1;
											$this.css({top: - slideHeight * current});
										}
										start = 1;
									});
								}else{
									$this.animate({left:"+=" + (-slideWidth) * -1 },options.speed, function() {
										current += -1;
										cycle = !!(current === 0 || current > slideLeng);
										if (cycle) {
											current = (current === 0)? slideLeng : 1;
											$this.css({left: - slideWidth * current});
										}
										start = 1;
									});
								}
							}
							if(current < slideLeng-1){
								if(options.auto){
									myStopFunction();
									myanimtionFunction();
								}
							}
							start =0;
						}
					}else{
						myStopFunction();
						if(start == 1){
							if(options.directFrom === "down" || options.directFrom === "up"){
								$this.animate({ top: "+=" + (-slideHeight) * -1 },options.speed, function() {
									current += -1;
									cycle = !!(current === 0 || current > slideLeng);
									if (cycle) {
										current = (current === 0)? slideLeng : 1;
										$this.css({top: - slideHeight * current});
									}
									if(options.auto){
										myanimtionFunction();
									}
									start = 1;
								});
							}else{
								$this.animate({left:"+=" + (-slideWidth) * -1 },options.speed, function() {
									current += -1;
									cycle = !!(current === 0 || current > slideLeng);
									if (cycle) {
										current = (current === 0)? slideLeng : 1;
										$this.css({left: - slideWidth * current});
									}
									if(options.auto){
										myanimtionFunction();
									}
									start = 1;
								});
							}
						}
						start =0;
						if(current == 1){
							$(options.arrowNext).addClass("off");
							$(options.arrowPrev).removeClass("off");
						}
					}
					if(current == 1){
						return false;
					}else{
						if(current == 2){
							$(options.arrowNext).removeClass("off");
							$(options.arrowPrev).addClass("off");
						}else{
							$(options.arrowNext).removeClass("off");
							$(options.arrowPrev).removeClass("off");
						}
						$(options.itemSlideClass).removeClass("active");
						$(options.itemSlideClass).eq(current-1).addClass("active");
					}

					/* add class on to dot */
					if(current == 1){
						return false;
					}else{
						$(options.dots[1]+" ul li").removeClass("on");
						$(options.dots[1]+" ul li").eq(current-2).addClass("on");
					}
					/* //add class on to dot */
				});
			}catch(err){
				console.log(err);
			}
		}
	});
	/* //slide */

	/* enter add more row in text area */
	$.fn.autoResizeTextArea = function(options){
		/* call
		$(".textareaBx").autoResizeTextArea({
			wrapClass:".textareaBx",
			clickClass:".txtArea",
			maxleng:4
		});
		*/
		try{
			var defaults = {wrapClass:"x",clickClass:"x",maxleng:0};
			options = $.extend(defaults,options);
			var wrapClass = options.wrapClass;
			var clickClass = options.clickClass;
			var maxleng = options.maxleng;
			var txtAreaH=$(options.clickClass).outerHeight();
			var pdt,pdb;
			var firstMaxlg;
			pdt = $(clickClass).css("padding-top").substring(0,2);
			pdb = $(clickClass).css("padding-bottom").substring(0,2);
			$(clickClass).css("overflow","hidden");
			var totalPd = parseInt(pdt)+parseInt(pdb);
			if(totalPd=="0"){
				maxleng=maxleng+1;
			}
			$(clickClass).on("click keydown change keypress keyup cut paste drop",function() {
				var text = $(this);
				//var text = document.this;
				firstMaxlg = (text.context.scrollHeight-totalPd)*maxleng;
				var mytext = text.val();
				// will remove the blank lines from the text-area
				let lines = mytext.split(/\r|\r\n|\n/);
				let count = lines.length-1;
				if(text.context.scrollHeight > firstMaxlg){
					console.log(count);
					text.css("overflow-y","scroll");
				}else{
					count++;
					console.log(count);
					if(count == 1){
						text.css({"height":txtAreaH+"px"});
						text.css({"overflow":"hidden"});
					}else{
						if(count > maxleng-1){
							text.css("overflow-y","scroll");
						}else{
							text.css({"height":"auto","overflow":"hidden"});
							text.css({"height":text.context.scrollHeight-2+'px'});
						}
					}
				}
			});
		}catch(err){
			console.log(err);
		}
	};
	/* enter add more row in text area */

	/* enter add more row in text area */
	$.fn.autoLiveText = function(options){
		/* call
		$(".classwrap").autoLiveText({
			wrapClass:".classwrap",
			inutClass:".",
			liveToClass:""
		});
		*/
		try{
			var defaults = {wrapClass:"x",inutClass:"x",liveToClass:""};
			options = $.extend(defaults,options);
			var wrapClass = options.wrapClass;
			var inutClass = options.inutClass;
			var liveToClass = options.liveToClass;
			$(inutClass).keyup(function() {
				var stt = $(this).val();
				$(liveToClass).text(stt);
			});
		}catch(err){
			console.log(err);
		}
	};
	/* enter add more row in text area */

	/* swipe body*/
	/*$(document).on('swipedown',function(){
		console.log("down");
	} );
	$(document).on('swipeup',function(){
		console.log("up");
	});*/
	$.support.touch = true;
	var supportTouch = $.support.touch,
			scrollEvent = "touchmove scroll",
			touchStartEvent = supportTouch ? "touchstart" : "mousedown",
			touchStopEvent = supportTouch ? "touchend" : "mouseup",
			touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
	$.event.special.swipeupdown = {
		setup: function() {
			var thisObject = this;
			var $this = $(thisObject);
			$this.bind(touchStartEvent, function(event) {
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] :
						event,
						start = {
							time: (new Date).getTime(),
							coords: [ data.pageX, data.pageY ],
							origin: $(event.target)
						},
						stop;

			function moveHandler(event) {
				if (!start) {
					return;
				}
				var data = event.originalEvent.touches ?
						event.originalEvent.touches[ 0 ] :
						event;
				stop = {
					time: (new Date).getTime(),
					coords: [ data.pageX, data.pageY ]
				};

				// prevent scrolling
				if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
					event.preventDefault();
				}
			}
			$this
					.bind(touchMoveEvent, moveHandler)
					.one(touchStopEvent, function(event) {
				$this.unbind(touchMoveEvent, moveHandler);
				if (start && stop) {
					if (stop.time - start.time < 1000 &&
							Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
							Math.abs(start.coords[0] - stop.coords[0]) < 75) {
						start.origin
								.trigger("swipeupdown")
								.trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
					}
				}
				start = stop = undefined;
			});
		});}
	};

	$.each({
		swipedown: "swipeupdown",
		swipeup: "swipeupdown"
	}, function(event, sourceEvent){
		$.event.special[event] = {
			setup: function(){
				$(this).bind(sourceEvent, $.noop);
			}
		};
	});
	/* //swipe body*/


}( jQuery ));